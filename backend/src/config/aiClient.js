import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("OPENAI_API_KEY not set. AI features will fail until configured.");
}

const openai = new OpenAI({ apiKey });

export default openai;
