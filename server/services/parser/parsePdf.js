import pdf from "pdf-parse";

export const parsePDFBuffer = async (fileBuffer) => {
  try {
    const data = await pdf(fileBuffer);
    return data.text;
  } catch (err) {
    console.error("PDF parse error:", err);
    return "";
  }
};
