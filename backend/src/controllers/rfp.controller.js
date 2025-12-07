import { ok, created, badRequest } from "../utils/apiResponse.js";
import { createRfpFromText, listRfps, getRfpById } from "../services/rfp.service.js";
import { compareProposalsWithAI } from "../services/ai.service.js";
import Proposal from "../models/Proposal.js";
import Vendor from "../models/Vendor.js";

export async function generateRfp(req, res, next) {
  try {
    const { text } = req.body;
    if (!text) {
      throw badRequest("text is required");
    }
    const rfp = await createRfpFromText(text);
    return created(res, { rfp });
  } catch (err) {
    next(err);
  }
}

export async function getRfps(req, res, next) {
  try {
    const rfps = await listRfps();
    return ok(res, { rfps });
  } catch (err) {
    next(err);
  }
}

export async function getRfp(req, res, next) {
  try {
    const rfp = await getRfpById(req.params.id);
    if (!rfp) {
      return res.status(404).json({ message: "RFP not found" });
    }
    return ok(res, { rfp });
  } catch (err) {
    next(err);
  }
}

export async function compareRfpProposals(req, res, next) {
  try {
    const rfp = await getRfpById(req.params.id);
    if (!rfp) {
      return res.status(404).json({ message: "RFP not found" });
    }

    const proposals = await Proposal.find({ rfpId: rfp._id }).populate("vendorId");
    if (!proposals.length) {
      return ok(res, {
        comparison: {
          summary: "No proposals found for this RFP yet.",
          scores: [],
          recommendation: null,
        },
      });
    }

    const proposalsWithVendors = proposals.map((proposal) => ({
      vendor: proposal.vendorId,
      parsedData: proposal.parsedData,
    }));

    const comparison = await compareProposalsWithAI(rfp.structuredData, proposalsWithVendors);
    return ok(res, { comparison });
  } catch (err) {
    next(err);
  }
}
