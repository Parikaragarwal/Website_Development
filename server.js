import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 
import researchRoutes from "./routes/research.js";
import adminRoutes from "./routes/admin.js";
import awardRoutes from "./routes/awards.js"
import { authMiddleware } from "./middlewares/auth.js";
import Research from "./models/research.js";
import Event from "./models/Events.js";
import Award from "./models/Award.js"
import eventsRouter from "./routes/Events.js";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // For handling cookies

// Set up EJS
app.set("view engine", "ejs");

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/college_website"; // Replace with actual MongoDB URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB", MONGO_URI))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/admin", adminRoutes);
app.use("/admin/research", authMiddleware, researchRoutes);
app.use("/admin/Events", authMiddleware ,eventsRouter);
app.use("/admin/awards", authMiddleware ,awardRoutes);

// Home Page Route
app.get("/", async (req, res) => {
    try {
        const events= await Event.find({});
        const awards = await Award.find({});
        const researchItems = await Research.find({}); // Fetch Research data
        res.render("index", { researchItems,events,awards }); // Pass data to index.ejs
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/calendar", (req,res)=>{
  res.render("foot/calendar.ejs")
})

app.get("/fees", (req,res)=>{
  res.render("foot/fees.ejs")
})

app.get("/reach", (req,res)=>{
  res.render("foot/reach.ejs")
})

app.get("/recruitment", (req,res)=>{
  res.render("foot/recruitment.ejs")
})

app.get("/complaints/internal",(req,res)=>{
  res.render("foot/complaints/internal.ejs")
})

app.get("/complaints/scst",(req,res)=>{
  res.render("foot/complaints/scst.ejs")
})

app.get("/complaints/anti-ragging",(req,res)=>{
  res.render("foot/complaints/anti-ragging.ejs")
});

app.get("/aboutUs",(req,res)=>{
  res.render("aboutUs");
});

app.get("/complaints/networking",(req,res)=>{
  res.render("foot/complaints/networking.ejs")
})



app.get("/academic/affairs", (req,res) => { res.render("academics/academic/affairs.ejs") })
app.get("/academic/calendar", (req,res) => { res.render("academics/academic/calendar.ejs") })
app.get("/academic/program", (req,res) => { res.render("academics/academic/program.ejs") })
app.get("/academic/admissions", (req,res) => { res.render("academics/academic/admissions.ejs") })
app.get("/academic/rules", (req,res) => { res.render("academics/academic/rules.ejs") })
app.get("/academic/convocation", (req,res) => { res.render("academics/academic/convocation.ejs") })
app.get("/academic/pmrf", (req,res) => { res.render("academics/academic/pmrf.ejs") })

app.get("/departments/cse", (req,res) => { res.render("academics/departments/cse.ejs") })
app.get("/departments/design", (req,res) => { res.render("academics/departments/design.ejs") })
app.get("/departments/ece", (req,res) => { res.render("academics/departments/ece.ejs") })
app.get("/departments/humanities", (req,res) => { res.render("academics/departments/humanities.ejs") })
app.get("/departments/math", (req,res) => { res.render("academics/departments/math.ejs") })
app.get("/departments/physics", (req,res) => { res.render("academics/departments/physics.ejs") })

app.get("/centres/dmr", (req,res) => { res.render("academics/centres/dmr.ejs") })
app.get("/centres/drone", (req,res) => { res.render("academics/centres/drone.ejs") })
app.get("/centres/environment", (req,res) => { res.render("academics/centres/environment.ejs") })
app.get("/centres/iks", (req,res) => { res.render("academics/centres/iks.ejs") })
app.get("/centres/icps", (req,res) => { res.render("academics/centres/icps.ejs") })
app.get("/centres/linguistic", (req,res) => { res.render("academics/centres/linguistic.ejs") })
app.get("/centres/nano", (req,res) => { res.render("academics/centres/nano.ejs") })
app.get("/centres/polymer", (req,res) => { res.render("academics/centres/polymer.ejs") })
app.get("/centres/water", (req,res) => { res.render("academics/centres/water.ejs") })


// For Faculty
app.get("/faculty/all", (req, res) => { res.render("faculty&staff/faculty/all.ejs") });
app.get("/faculty/forum", (req, res) => { res.render("faculty&staff/faculty/forum.ejs") });
app.get("/faculty/retired", (req, res) => { res.render("faculty&staff/faculty/retired.ejs") });
app.get("/faculty/current-openings", (req, res) => { res.render("faculty&staff/faculty/current-openings.ejs") });
app.get("/faculty/awards", (req, res) => { res.render("faculty&staff/faculty/awards.ejs") });

// For Staff
app.get("/staff/all", (req, res) => { res.render("faculty&staff/staff/all.ejs") });
app.get("/staff/retired", (req, res) => { res.render("faculty&staff/staff/retired.ejs") });
app.get("/staff/current-openings", (req, res) => { res.render("faculty&staff/staff/current-openings.ejs") });

// Facilities
app.get("/facilities/housing", (req, res) => { res.render("faculty&staff/facilities/housing.ejs") });
app.get("/facilities/healthcare", (req, res) => { res.render("faculty&staff/facilities/healthcare.ejs") });

// Others
app.get("/others/equal-opportunity", (req, res) => { res.render("faculty&staff/others/equal-opportunity.ejs") });
app.get("/others/internal-committee", (req, res) => { res.render("faculty&staff/others/internal-committee.ejs") });
app.get("/others/mental-wellbeing", (req, res) => { res.render("faculty&staff/others/mental-wellbeing.ejs") });



app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
