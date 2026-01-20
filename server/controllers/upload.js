import Upload from "../models/Upload.js";

export const uploadResume = async (req, res) => {
  try {
    const { parsedText, parsedJson, fileType, originalFileName } = req.body;
    const userId = req.user._id;

    const saved = await Upload.create({
      userId,
      fileType,
      originalFileName,
      parsedText,
      parsedJson
    });

    return res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload error" });
  }
};
