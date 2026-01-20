import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true }
});

const chatSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  messages: [messageSchema],
  resumeDraftJson: Object,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);
export default ChatSession;
