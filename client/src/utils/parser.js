export const extractTextFromPDF = async (file) => {
    // This is for client-side fallback only
    // Main PDF parsing will happen in backend
    const text = await readFileAsText(file)
    return text
  }
  
  export const cleanText = (text) => {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\x00-\x7F]/g, '')
      .trim()
  }
  