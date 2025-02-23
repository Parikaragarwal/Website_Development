import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  isNew: {
    type: Boolean,
    default: true,
  },
});

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
