import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createMessage, getOwnerMessages, markAsRead } from "../controllers/messageController.js";

const router = express.Router();

// Create message (no auth)
router.post("/", createMessage);

// Get owner messages (auth required)
router.get("/", authMiddleware, getOwnerMessages);

// Mark as read (auth required)
router.patch("/:id/read", authMiddleware, markAsRead);

export default router;
