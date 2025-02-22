import express from "express";
import Event from "../models/Events.js";
import { upload } from "../config/cloudinary.js";

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
        const image = req.file?.path; // Get Cloudinary URL

        const newEvent = new Event({ title, date, description, courseId, image, link });
        await newEvent.save();

        res.status(201).redirect("/admin/Events");
    } catch (error) {
        res.status(500).json({ message: "Failed to add event", error });
    }
});

// 🔹 Delete Event
router.delete("/delete/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
});

export default router;
