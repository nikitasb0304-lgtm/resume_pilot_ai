import mammoth from "mammoth";

export const parseDocxBuffer = async (fileBuffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } catch (err) {
    console.error("DOCX parse error:", err);
    return "";
  }
};
