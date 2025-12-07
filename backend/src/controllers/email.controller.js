import { ok, badRequest } from "../utils/apiResponse.js";
import { sendRfpEmails } from "../services/email.service.js";

export async function sendRfpToVendors(req, res, next) {
  try {
    const { vendorIds } = req.body;
    if (!Array.isArray(vendorIds) || vendorIds.length === 0) {
      throw badRequest("vendorIds array is required");
    }
    await sendRfpEmails(req.params.id, vendorIds);
    return ok(res, { status: "sent" });
  } catch (err) {
    next(err);
  }
}