export const cosineSimilarity = (vecA = [], vecB = []) => {
    const dot = vecA.reduce((acc, val, i) => acc + val * (vecB[i] || 0), 0);
    const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return magA && magB ? dot / (magA * magB) : 0;
  };