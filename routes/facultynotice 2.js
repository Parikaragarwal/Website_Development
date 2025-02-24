import express from "express";
import FacultyNotice from "../models/facultynotice.js";

const router = express.Router();

// GET route to fetch and display faculty notices
router.get("/", async (req, res) => {
  try {
    const facultyNotices = await FacultyNotice.find().sort({ date: -1 });
    res.render("facultynotices", { facultyNotices });
  } catch (err) {
    console.error("Error fetching faculty notices:", err);
    res.redirect("/admin/facultynotice");
  }
});

// POST route to add a new faculty notice
router.post('/', async (req, res) => 
    {
        try 
        {
            const { title, date, department, link } = req.body;
    
            // Convert isNew to Boolean
            const isNew = req.body.isNew === "on";  
    
            const newNotice = new FacultyNotice({ title, date, department, link, isNew });
            await newNotice.save();
    
            res.redirect('/admin/facultynotice');
        } 
        catch (err) 
        {
            console.error('Error adding faculty notice:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    

// DELETE route to remove a faculty notice
router.post("/:id", async (req, res) => {
  try {
    await FacultyNotice.findByIdAndDelete(req.params.id);
    res.redirect("/admin/facultynotice");
  } catch (err) {
    console.error("Error deleting faculty notice:", err);
    res.redirect("/admin/facultynotice");
  }
});

export default router;
