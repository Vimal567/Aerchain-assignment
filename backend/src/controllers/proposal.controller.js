import { ok } from "../utils/apiResponse.js";
import { listProposalsForRfp } from "../services/proposal.service.js";

export async function listProposalsForRfpHandler(req, res, next) {
  try {
    const { rfpId } = req.params;
    const proposals = await listProposalsForRfp(rfpId);
    return ok(res, { proposals });
  } catch (err) {
    next(err);
  }
}
