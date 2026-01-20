import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  fileType: String,
  originalFileName: String,
  parsedText: String,
  parsedJson: Object
}, { timestamps: true });

const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;
