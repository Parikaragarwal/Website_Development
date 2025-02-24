import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    courseId: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    link: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
