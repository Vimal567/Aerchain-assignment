import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    category: String,
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

export default Vendor;
