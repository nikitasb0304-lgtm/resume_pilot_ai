import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  skills: [String],
  description: String,
  source: { type: String, default: "internal" },
  applyLink: String
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
