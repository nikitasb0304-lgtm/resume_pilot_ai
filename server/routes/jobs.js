import { Router } from "express";
import { getJobs, matchJobs, searchJobs } from "../controllers/jobs.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.get("/", authMiddleware, getJobs);
router.get("/search", authMiddleware, searchJobs);
router.post("/match", authMiddleware, matchJobs);
export default router;
