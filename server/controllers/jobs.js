import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().limit(50);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Fetch jobs error" });
  }
};

export const matchJobs = async (req, res) => {
  try {
    const { skills } = req.body;
    // Mock match logic
    const jobs = await Job.find();
    const matches = jobs.map((j) => ({
      ...j._doc,
      matchScore: Math.floor(Math.random() * 40) + 60
    }));
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Job match error" });
  }
};
