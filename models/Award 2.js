import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now } // Optional: To track when the award was added
});

const Award = mongoose.model("Award", awardSchema);

export default Award;
