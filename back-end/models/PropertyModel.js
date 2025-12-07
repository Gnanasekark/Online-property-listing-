import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    squareFeet: { type: Number, default: 0 },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    location: { 
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
      address: { type: String, default: "N/A" },
      city: { type: String, default: "N/A" },
      state: { type: String, default: "N/A" },
    },
    images: [{ type: String }], // local image file paths
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
