import { ok, created, badRequest } from "../utils/apiResponse.js";
import { createVendor, listVendors } from "../services/vendor.service.js";

export async function createVendorHandler(req, res, next) {
  try {
    const { name, email, phone, category } = req.body;
    if (!name || !email) {
      throw badRequest("name and email are required");
    }
    const vendor = await createVendor({ name, email, phone, category });
    return created(res, { vendor });
  } catch (err) {
    next(err);
  }
}

export async function listVendorsHandler(req, res, next) {
  try {
    const vendors = await listVendors();
    return ok(res, { vendors });
  } catch (err) {
    next(err);
  }
}
