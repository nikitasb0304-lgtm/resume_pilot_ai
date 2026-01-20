import gemini from "../../config/gemini.js";

export const rewriteWithAI = async (text, style = "professional") => {
  try {
    const prompt = `Rewrite the following text in a ${style} tone:\n\n${text}`;
    const result = await gemini.generateText(prompt);
    return result.response.text();
  } catch (err) {
    console.error("AI rewrite error:", err);
    return text;
  }
};
