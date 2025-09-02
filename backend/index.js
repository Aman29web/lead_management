// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection helper
let isConnected = false; // to prevent multiple connections in serverless
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    isConnected = true;
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
};

// Example route
app.get("/", async (req, res) => {
  await connectDB();
  res.send("Backend is running!");
});

// ✅ Mount routes
app.use("/api/leads", async (req, res, next) => {
  await connectDB();
  leadRoutes(req, res, next);
});

// ✅ Export app instead of listening
export default app;
