import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const StructuredDataSchema = new mongoose.Schema(
  {
    items: [ItemSchema],
    budget: Number,
    delivery_days: Number,
    warranty: String,
    payment_terms: String,
  },
  { _id: false }
);

const RfpSchema = new mongoose.Schema(
  {
    originalText: { type: String, required: true },
    structuredData: StructuredDataSchema,
  },
  { timestamps: true }
);

const Rfp = mongoose.model("Rfp", RfpSchema);

export default Rfp;
