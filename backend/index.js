import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes.js";  // 👈 import routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Mount routes
app.use("/api/leads", leadRoutes);  // 👈 this is important

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
