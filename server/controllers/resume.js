import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = req.body;
    const resume = await Resume.create({ userId, ...data });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Create resume error" });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Get resumes error" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const id = req.params.id;
    const resume = await Resume.findByIdAndUpdate(id, req.body, { new: true });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Update resume error" });
  }
};
