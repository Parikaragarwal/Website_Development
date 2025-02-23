import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

// 🔹 Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔹 Create Storage Engine for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "research_images", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png", "webp"] // Allowed image formats
    }
});

// Function to delete an image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return false; // Ensure there's a valid publicId
        await cloudinary.uploader.destroy(publicId);
        console.log(`✅ Deleted image: ${publicId}`);
        return true;
    } catch (error) {
        console.error(`❌ Error deleting image: ${error.message}`);
        return false;
    }
};

const upload = multer({ storage });

export { cloudinary, upload ,  deleteFromCloudinary}; // ✅ Use ES module export
