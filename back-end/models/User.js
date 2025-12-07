import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["owner", "buyer"], default: "buyer" },
  },
  { timestamps: true }
);

// Use existing model if it exists, otherwise create
export default mongoose.models.User || mongoose.model("User", userSchema);
