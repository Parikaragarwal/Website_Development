import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    altText: { type: String, default: "Carousel Image" },
    caption: { type: String, default: "" },
    isActive: { type: Boolean, default: false }, // Only one should be active
    createdAt: { type: Date, default: Date.now }
});

// Export the model
const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;
