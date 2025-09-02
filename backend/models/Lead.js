// backend/models/Lead.js
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  source: { type: String },
}, { timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
