import gemini from "../../config/gemini.js";

export const extractResumeJSON = async (rawText) => {
  try {
    const prompt = `
Extract structured resume details in JSON from this text:
${rawText}
Expected JSON format:
{
  "summary": "",
  "experience": [],
  "education": [],
  "skills": [],
  "projects": []
}
    `;
    const result = await gemini.generateText(prompt);
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("AI extract error:", err);
    return null;
  }
};