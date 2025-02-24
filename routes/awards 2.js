import express from "express";
import Award from "../models/Award.js";

const router = express.Router();

// Get all awards
router.get("/", async (req, res) => {
    try {
        const awards = await Award.find();
        res.render("awards",{ awards });
    } catch (err) {
        res.status(500).json({ error: "Server error while fetching awards." });
    }
});

// Add a new award (Admin only)
router.post("/", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newAward = new Award({ title, description });
        await newAward.save();
        res.status(201).redirect("/admin/awards");
    } catch (err) {
        res.status(500).json({ error: "Error adding award." });
    }
});

// Delete an award (Admin only)
router.post("/delete/:id", async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ error: "Award not found." });
        }

        await award.deleteOne();
        res.redirect("/admin/awards");
    } catch (err) {
        res.status(500).json({ error: "Error deleting award." });
    }
});

export default router;
