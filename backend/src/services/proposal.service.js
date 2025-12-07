import Proposal from "../models/Proposal.js";

export async function listProposalsForRfp(rfpId) {
  return Proposal.find({ rfpId }).populate("vendorId").sort({ createdAt: -1 });
}
