import Rfp from "../models/Rfp.js";
import { generateRfpFromText } from "./ai.service.js";

export async function createRfpFromText(originalText) {
  const structuredData = await generateRfpFromText(originalText);
  const rfp = await Rfp.create({ originalText, structuredData });
  return rfp;
}

export async function listRfps() {
  return Rfp.find().sort({ createdAt: -1 });
}

export async function getRfpById(id) {
  return Rfp.findById(id);
}
