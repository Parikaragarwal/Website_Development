import express from "express";
import Headline from "../models/Headline.js";
import { upload } from "../config/cloudinary.js"; // Import multer with Cloudinary storage

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
    try 
    {
        const { text, link } = req.body;
        if (!req.file) 
        {
            return res.status(400).json({ error: "Image is required" });
        }

        const imageUrl = req.file.path; // Cloudinary image URL

        const newHeadline = new Headline({ text, link, imageUrl });
        await newHeadline.save();

        res.status(201).redirect("/admin/headlines");
    } 
    catch (error) 
    {
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
        await headline.deleteOne();
        res.redirect("/admin/headlines");
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to delete headline" });
    }
});

export default router;
