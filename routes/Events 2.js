import express from "express";
import Event from "../models/Events.js";
import { upload ,deleteFromCloudinary } from "../config/cloudinary.js";

const router = express.Router();

// 🔹 Get All Events (Homepage)
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.render("events",{ events });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// 🔹 Add New Event (Admin Panel)
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, date, description, courseId, link } = req.body;

        // Ensure file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        // ✅ Extract Cloudinary details from `req.file`
        const image = req.file.path;  // Cloudinary URL
        const publicId = req.file.filename;  // Cloudinary Public ID

        // ✅ Store both image URL & Public ID
        const newEvent = new Event({ title, date, description, courseId, image, publicId, link });
        await newEvent.save();
        res.status(201).redirect("/admin/Events");
    } catch (error) {
        console.log("Error adding event:", error);
        res.status(500).json({ message: "Failed to add event", error });
    }
});

// 🔹 Delete Event
router.post("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Delete the image from Cloudinary
        if(event.publicId)
        {
        await deleteFromCloudinary(event.publicId);
        }

        // Delete the event from MongoDB
        await Event.findByIdAndDelete(req.params.id);
        res.redirect("/admin/Events");
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
});


export default router;
