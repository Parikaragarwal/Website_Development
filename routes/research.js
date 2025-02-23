import express from "express";
import  Research  from "../models/research.js";
import { upload,deleteFromCloudinary } from "../config/cloudinary.js"; // ✅ Use ES module import

const router = express.Router();

// ✅ 1️⃣ GET all research items (Render in EJS)
router.get("/", async (req, res) => {
    try {
        const researchItems = await Research.find({});
        res.render("research", { researchItems }); // Pass data to EJS
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ 2️⃣ POST a new research item (Admin Only) with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!req.file) {
            return res.status(400).send("Image is required");
        }

        // ✅ Extract Cloudinary details
        const imageUrl = req.file.path;     // Cloudinary image URL
        const publicId = req.file.filename; // Cloudinary Public ID

        // ✅ Store both in MongoDB
        const newResearch = new Research({ title, description, imageUrl, publicId, category });
        await newResearch.save();

        res.redirect("/admin/research"); // Redirect to admin research page
    } catch (err) {
        console.error("Error adding research item:", err);
        res.status(500).send("Failed to add research item.");
    }
});


// ✅ 3️⃣ DELETE a research item (Admin Only)
router.delete("/:id", async (req, res) => {
    try {
        const researchItem = await Research.findById(req.params.id);
        if (!researchItem) {
            return res.status(404).json({ success: false, error: "Research item not found" });
        }

        // Delete the image from Cloudinary
        if(researchItem.publicId)
        {
        await deleteFromCloudinary(researchItem.publicId);
        }

        // Delete the research item from MongoDB
        await researchItem.deleteOne();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to delete item" });
    }
});


export default router;
