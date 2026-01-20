import express from 'express';
import { upload, analyzeResume } from '../controllers/ats.js';

const router = express.Router();

// Route: POST /api/ats/analyze
router.post('/analyze', upload.single('file'), analyzeResume);

export default router;
