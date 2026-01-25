export const computeATSScore = (resumeText, jobText) => {
    if (!resumeText || !jobText) return { score: 0, matched: [], missing: [] };
  
    const jobKeywords = jobText.toLowerCase().split(/\W+/).filter(Boolean);
    const resumeWords = resumeText.toLowerCase().split(/\W+/).filter(Boolean);
  
    const matched = jobKeywords.filter(k => resumeWords.includes(k));
    const missing = jobKeywords.filter(k => !resumeWords.includes(k));
  
    const score = Math.round((matched.length / jobKeywords.length) * 100);
  
    return { score, matched, missing };
  };