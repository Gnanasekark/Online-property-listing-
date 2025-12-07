import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderPhone: String,
  message: { type: String, required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  propertyTitle: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "unread" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
