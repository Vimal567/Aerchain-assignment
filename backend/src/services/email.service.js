import { createTransporter } from "../config/email.js";
import Rfp from "../models/Rfp.js";
import Proposal from "../models/Proposal.js";
import { parseVendorEmail } from "./ai.service.js";
import { getVendorsByIds } from "./vendor.service.js";

function buildMockVendorEmailBody(rfp, vendor) {
  const structured = rfp.structuredData || {};
  const budget = structured.budget || 50000;
  const targetDelivery = structured.delivery_days || 30;
  const baseWarranty = structured.warranty || "1 year";
  const paymentTerms = structured.payment_terms || "net 30";

  const priceFactor = 0.8 + Math.random() * 0.4;
  const price = Math.round(budget * priceFactor);

  const deliveryVariation = Math.floor(Math.random() * 11) - 5;
  const deliveryDays = Math.max(5, targetDelivery + deliveryVariation);

  const warrantyOptions = [
    baseWarranty,
    "18 months",
    "2 years",
    "3 years limited warranty",
  ];
  const warranty =
    warrantyOptions[Math.floor(Math.random() * warrantyOptions.length)];

  const body = `
Hello,

Thank you for inviting ${vendor.name} to bid for this RFP.

We can offer a total price of ${price} USD for the requested items.
Our estimated delivery time is ${deliveryDays} days from the date of order.
We provide a warranty of ${warranty}.
Payment terms: ${paymentTerms}.

This quote assumes standard shipping and includes basic support.

Best regards,
${vendor.name} Sales Team
`;

  return { body, price, deliveryDays, warranty, paymentTerms };
}

export async function sendRfpEmails(rfpId, vendorIds) {
  const transporter = createTransporter();
  const rfp = await Rfp.findById(rfpId);

  if (!rfp) {
    throw new Error("RFP not found");
  }

  const vendors = await getVendorsByIds(vendorIds);
  if (!vendors.length) {
    throw new Error("No vendors found for provided IDs");
  }

  const frontendBase = process.env.FRONTEND_BASE_URL || "";

  const emailPromises = vendors.map(async (vendor) => {
    // 1) Send actual RFP email to vendor (SMTP)
    const subject = `RFP Invitation - ${rfp._id}`;
    const text = `
Dear ${vendor.name},

You are invited to submit a proposal for the following RFP:

${rfp.originalText}

Structured details:
${JSON.stringify(rfp.structuredData, null, 2)}

Please reply to this email with your proposal including:
- Total price
- Delivery days
- Warranty
- Payment terms

RFP ID: ${rfp._id}

You may also review this RFP here (if UI is available):
${frontendBase ? frontendBase + "/rfp/" + rfp._id : "(frontend not configured)"}

Best regards,
Procurement Manager
`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: vendor.email,
      subject,
      text,
    });

    // 2) Build a mock vendor reply email "body"
    const mock = buildMockVendorEmailBody(rfp, vendor);

    // 3) Use AI to parse this reply into structured proposal data
    const parsedData = await parseVendorEmail(mock.body);

    // 4) Save Proposal in MongoDB
    await Proposal.create({
      rfpId: rfp._id,
      vendorId: vendor._id,
      rawEmail: mock.body,
      parsedData,
      emailMeta: {
        messageId: null,
        subject: `Simulated reply for RFP ${rfp._id}`,
        from: vendor.email,
        receivedAt: new Date(),
      },
    });
  });

  await Promise.all(emailPromises);
}
