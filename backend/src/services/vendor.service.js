import Vendor from "../models/Vendor.js";

export async function createVendor(data) {
  return Vendor.create(data);
}

export async function listVendors() {
  return Vendor.find().sort({ createdAt: -1 });
}

export async function getVendorsByIds(ids) {
  return Vendor.find({ _id: { $in: ids } });
}

export async function findVendorByEmail(email) {
  return Vendor.findOne({ email: new RegExp(`^${email}$`, "i") });
}
