import express from "express";
import Headline from "../models/Headline.js";
import { upload,deleteFromCloudinary } from "../config/cloudinary.js"; // Import multer with Cloudinary storage

const router = express.Router();

router.get("/", async (req, res) => {
    try 
    {
        const headlines = await Headline.find().sort({ createdAt: -1 });
        res.render("headlines",{headlines});
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { text, link } = req.body;

        // ✅ Ensure an image was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        // ✅ Extract Cloudinary details
        const imageUrl = req.file.path;    // Cloudinary URL
        const publicId = req.file.filename; // Cloudinary Public ID

        // ✅ Store both in MongoDB
        const newHeadline = new Headline({ text, link, imageUrl, publicId });
        await newHeadline.save();

        res.status(201).redirect("/admin/headlines");
    } catch (error) {
        console.error("Error adding headline:", error);
        res.status(500).json({ error: "Failed to add headline" });
    }
});



router.delete("/:id", async (req, res) => {
    try 
    {
        const headline = await Headline.findById(req.params.id);
        if (!headline) 
        {
            return res.status(404).json({ error: "Headline not found" });
        }

        // Delete the image from Cloudinary
        if(headline.publicId)
        {
        await deleteFromCloudinary(headline.publicId);
        }

        // Delete the headline from MongoDB
        await headline.deleteOne();
        res.redirect("/admin/headlines");
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to delete headline", details: error.message });
    }
});


export default router;
