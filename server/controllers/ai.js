import ChatSession from "../models/ChatSession.js";
import gemini from "../config/gemini.js";

export const askAI = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user._id;

    let session = sessionId
      ? await ChatSession.findById(sessionId)
      : await ChatSession.create({ userId, messages: [] });

    session.messages.push({ role: "user", content: message });
    await session.save();

    // Placeholder AI logic (real prompt from AI service will come later)
    const reply = "AI Response placeholder for: " + message;

    session.messages.push({ role: "assistant", content: reply });
    await session.save();

    res.json({ sessionId: session._id, reply });
  } catch (err) {
    res.status(500).json({ message: "AI chat error" });
  }
};
