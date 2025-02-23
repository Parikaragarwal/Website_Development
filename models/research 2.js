import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Cloudinary URL or local path
    category: { type: String, default: "General" },
    createdAt: { type: Date, default: Date.now }
});

const Research = mongoose.model("Research", ResearchSchema);

export default Research; // Use only default export
