export const extractKeywords = (text) => {
    const stopwords = ["the", "a", "an", "in", "and", "or", "for", "with"];
    return text
      .toLowerCase()
      .match(/\b[a-z]{2,}\b/g)
      ?.filter((word) => !stopwords.includes(word)) || [];
  };
  