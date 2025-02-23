import express from "express";
import Carousel from "../models/carousel.js";
import { upload,deleteFromCloudinary } from "../config/cloudinary.js";

const router = express.Router();

/**
 * 🔹 GET: Fetch all carousel images
 */
router.get("/", async (req, res) => {
    try {
        const carouselImages = await Carousel.find();
        res.render("carousel", { carouselImages });
    } catch (error) {
        console.error("Error fetching carousel images:", error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * 🔹 POST: Add a new carousel image
 */
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No image uploaded");
        }

        // ✅ Extract Cloudinary details
        const imageUrl = req.file.path;     // Cloudinary Image URL
        const publicId = req.file.filename; // Cloudinary Public ID

        // ✅ Store both in MongoDB
        const newCarouselImage = new Carousel({
            imageUrl, 
            publicId,  // Store publicId for future deletion
            altText: req.body.altText || "Carousel Image",
            caption: req.body.caption || "",
            isActive: req.body.isActive === "on"
        });

        await newCarouselImage.save();
        res.redirect("/admin/carousel");
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).send("Internal Server Error");
    }
});


/**
 * 🔹 DELETE: Remove a carousel image
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const imageToDelete = await Carousel.findById(id);

        if (!imageToDelete) {
            return res.status(404).send("Image not found");
        }

        // Delete the image from Cloudinary
         if (imageToDelete.publicId) {
            await deleteFromCloudinary(imageToDelete.publicId);
        }


        // Remove the image from MongoDB
        await imageToDelete.deleteOne();

        res.redirect("/admin/carousel");
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
