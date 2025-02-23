import express from "express";
import validator from "validator";
import { Admin } from "../models/admin.js";
import { createHmac } from "crypto";
import { createTokenForUser } from "../services/authentication.js";

const router = express.Router();


router.get("/login",(req,res)=>{
    res.render("signIn.ejs");
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Sanitize email and password
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedPassword = validator.escape(password);

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email: sanitizedEmail });

        if (!admin) {
            return res.render("signIn", { error: "Incorrect Email or Password" });
        }

        // Hash input password and compare
        const hashedPassword = createHmac("sha256", admin.salt).update(sanitizedPassword).digest("hex");

        if (hashedPassword !== admin.password) {
            return res.render("signIn", { error: "Incorrect Email or Password" });
        }

        // Generate token
        const token = createTokenForUser(admin);

        // Set cookies and redirect
        res.cookie("email", admin.email);
        res.cookie("fullName", admin.fullname);
        res.cookie("token", token).redirect("/admin/dashboard");
    } catch (error) {
        console.log(error);
        return res.render("signIn", { error: "Something went wrong. Please try again." });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("email");
    res.clearCookie("fullName");
    res.clearCookie("token");

    res.redirect("/admin/login"); // Redirect to login page after logout
});
export default router;
