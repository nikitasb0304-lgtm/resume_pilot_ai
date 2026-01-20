import { Router } from "express";
import { createResume, getMyResumes, updateResume } from "../controllers/resume.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.post("/", authMiddleware, createResume);
router.get("/", authMiddleware, getMyResumes);
router.put("/:id", authMiddleware, updateResume);
export default router;
