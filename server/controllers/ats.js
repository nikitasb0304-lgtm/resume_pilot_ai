import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

// Storage: memory (no disk persistence needed)
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  }
});

const detectSections = (text) => {
  const lowered = text.toLowerCase();
  const sections = {
    contact: /(email|phone|tel|address)/.test(lowered),
    skills: /(skills|technical skills|key skills)/.test(lowered),
    experience: /(experience|work history|employment)/.test(lowered),
    education: /(education|degree|b\.? ?sc|m\.? ?sc|bachelor|master|university|college)/.test(lowered),
    projects: /(projects|publications)/.test(lowered),
    summary: /(summary|profile|objective)/.test(lowered)
  };
  return sections;
};

const estimateBullets = (text) => {
  const lines = text.split(/\r?\n/);
  let bullets = 0;
  for (const l of lines) {
    if (/^(\s*[-•*])\s+/.test(l)) bullets++;
  }
  return bullets;
};

const computeScore = (text) => {
  const wordCount = (text.match(/\b\w+\b/g) || []).length;
  const sections = detectSections(text);
  const bullets = estimateBullets(text);

  // Handle empty or near-empty input
  if (wordCount < 20) {
    return {
      score: Math.max(5, wordCount), // near-zero score
      details: {
        wordCount,
        sections,
        bullets,
        issues: ['Resume content is too short. Add substantive details.']
      }
    };
  }

  // Scoring weights
  let score = 0;
  let issues = [];

  // Word count scoring
  if (wordCount < 150) { score += 20; issues.push('Content is light. Consider more detail.'); }
  else if (wordCount <= 800) { score += 35; }
  else { score += 25; issues.push('Content is long. Consider concise bullets.'); }

  // Sections scoring
  const sectionWeights = { contact: 10, skills: 15, experience: 20, education: 10, projects: 5, summary: 5 };
  for (const [name, present] of Object.entries(sections)) {
    if (present) score += sectionWeights[name];
    else issues.push(`Missing section: ${name}`);
  }

  // Bullets scoring
  if (bullets === 0) { issues.push('Use bullet points for readability.'); }
  score += Math.min(15, bullets * 2); // up to +15

  // Formatting heuristics (basic)
  if (/table|grid/.test(text.toLowerCase())) {
    issues.push('Avoid tables; many ATS struggle to parse them.');
  }

  // Clamp and round
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    details: {
      wordCount,
      sections,
      bullets,
      issues
    }
  };
};

const extractText = async (file) => {
  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(file.buffer);
    return data.text || '';
  }
  // DOCX/DOC
  const result = await mammoth.extractRawText({ buffer: file.buffer });
  return result.value || '';
};

export const analyzeResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const text = await extractText(file);
    const analysis = computeScore(text);

    res.json({
      fileName: file.originalname,
      mimeType: file.mimetype,
      ...analysis
    });
  } catch (err) {
    res.status(500).json({ message: 'ATS analysis error', error: err.message });
  }
};

