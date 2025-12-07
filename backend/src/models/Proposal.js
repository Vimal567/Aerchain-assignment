import mongoose from "mongoose";

const ParsedDataSchema = new mongoose.Schema(
  {
    price: Number,
    currency: String,
    delivery_days: Number,
    warranty: String,
    payment_terms: String,
    notes: String,
  },
  { _id: false }
);

const ProposalSchema = new mongoose.Schema(
  {
    rfpId: { type: mongoose.Schema.Types.ObjectId, ref: "Rfp", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    rawEmail: String,
    parsedData: ParsedDataSchema,
    emailMeta: {
      messageId: String,
      subject: String,
      from: String,
      receivedAt: Date,
    },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", ProposalSchema);

export default Proposal;
