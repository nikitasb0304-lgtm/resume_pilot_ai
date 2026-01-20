import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  duration: String,
  bullets: [String]
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "Untitled Resume" },
  summary: String,
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [String],
  projects: [String],
  certifications: [String],
  rawText: String,
  atsScore: Object,
  jobMatches: Array,
  template: String
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
