import express from "express";
import SNotice from "../models/studentnotice.js";

const router = express.Router();

// GET all notices (for rendering in frontend)
router.get("/", async (req, res) => {
  try {
    const notices = await SNotice.find().sort({ date: -1 }); // Latest first
    res.render("studentnotices",{notices}); // Send as JSON (can be modified to render in EJS)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// POST a new notice (Admin only)
router.post("/", async (req, res) => {
    try {
      const { title, date, link } = req.body;
  
      const newNotice = new SNotice({
        title,
        date: new Date(date), // Ensure date format
        link,
        isNew: req.body.isNew === "on", // Convert checkbox value to boolean
      });
  
      await newNotice.save();
      res.status(201).redirect("/admin/studentnotice");
    } catch (error) {
      res.status(500).json({ message: "Failed to add notice", error });
    }
  });
  

// DELETE a notice (Admin only)
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SNotice.findByIdAndDelete(id);
    res.redirect("/admin/studentnotice");
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notice", error });
  }
});

export default router;
