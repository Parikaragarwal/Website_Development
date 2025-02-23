import mongoose from "mongoose";

const headlineSchema = new mongoose.Schema(
{
    text: 
    {
        type: String,
        required: true
    },
    link: 
    {
        type: String,
        required: true
    },
    imageUrl: 
    {
        type: String, // Cloudinary URL
        required: true
    }
},
{ timestamps: true });

const Headline = mongoose.model("Headline", headlineSchema);
export default Headline;
