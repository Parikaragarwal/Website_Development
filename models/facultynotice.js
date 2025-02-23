import mongoose from "mongoose";

const facultyNoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
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

const FacultyNotice = mongoose.model("FacultyNotice", facultyNoticeSchema);

export default FacultyNotice;
