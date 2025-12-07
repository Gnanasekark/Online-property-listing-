import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // ✅ For __dirname in ES modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();

// ✅ Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Database connection
connectDB();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Root route (quick check)
app.get("/", (req, res) => {
  res.send("Real Estate API is running...");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
