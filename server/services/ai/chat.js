import gemini from "../../config/gemini.js";

export const aiChat = async (messages) => {
  try {
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");
    const result = await gemini.generateText(prompt);
    return result.response.text();
  } catch (err) {
    console.error("AI chat error:", err);
    return "AI is unavailable right now.";
  }
};
