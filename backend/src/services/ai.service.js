import openai from "../config/aiClient.js";

const MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

/**
 * Convert natural language RFP description to structured JSON.
 */
export async function generateRfpFromText(text) {
  if (!openai.apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const prompt = `
You are an assistant that converts procurement requirements into a strict JSON schema.

User text:
${text}

Return ONLY valid JSON with this shape:
{
  "items": [
    { "product": "string", "quantity": number }
  ],
  "budget": number | null,
  "delivery_days": number | null,
  "warranty": "string | null",
  "payment_terms": "string | null"
}
If something is not specified, use null.
`;

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: "You output only JSON with no explanation." },
      { role: "user", content: prompt },
    ]
  });

  const content = response.choices[0].message.content.trim();
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse JSON from LLM:", content);
    throw new Error("AI returned invalid JSON for RFP");
  }

  return parsed;
}

/**
 * Parse vendor email into structured proposal data.
 */
export async function parseVendorEmail(emailBody) {
  if (!openai.apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const prompt = `
You parse vendor proposal emails into structured JSON.

Email:
${emailBody}

Return JSON in this exact shape:
{
  "price": number | null,
  "currency": "string | null",
  "delivery_days": number | null,
  "warranty": "string | null",
  "payment_terms": "string | null",
  "notes": "string"
}
If a field is not specified, use null. Price should be numeric only.
`;

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: "You output only JSON with no explanation." },
      { role: "user", content: prompt },
    ]
  });

  const content = response.choices[0].message.content.trim();
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse JSON from LLM:", content);
    throw new Error("AI returned invalid JSON for proposal");
  }

  return parsed;
}

/**
 * Compare proposals and recommend best vendor.
 */
export async function compareProposalsWithAI(rfp, proposalsWithVendors) {
  if (!openai.apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const payload = {
    rfp,
    proposals: proposalsWithVendors.map((p) => ({
      vendorName: p.vendor.name,
      parsedData: p.parsedData,
    })),
  };

  const prompt = `
You are helping a procurement manager compare vendor proposals.

RFP:
${JSON.stringify(payload.rfp, null, 2)}

Proposals:
${JSON.stringify(payload.proposals, null, 2)}

Task:
1. Briefly summarize the proposals.
2. Assign a score from 0-10 for each vendor based on:
   - Total price (lower is better)
   - Delivery days (shorter is better)
   - Warranty and payment terms (better coverage is better)
3. Recommend one vendor and explain why.

Return JSON in this shape:
{
  "summary": "string",
  "scores": [
    { "vendor": "Vendor Name", "score": number, "reason": "string" }
  ],
  "recommendation": {
    "vendor": "Vendor Name",
    "reason": "string"
  }
}
`;

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: "You output only JSON with no extra narration.",
      },
      { role: "user", content: prompt },
    ]
  });

  const content = response.choices[0].message.content.trim();
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse JSON from LLM for comparison:", content);
    throw new Error("AI returned invalid JSON for comparison");
  }

  return parsed;
}
