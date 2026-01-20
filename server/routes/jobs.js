import { Router } from "express";
import { getJobs, matchJobs } from "../controllers/jobs.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.get("/", authMiddleware, getJobs);
router.post("/match", authMiddleware, matchJobs);
export default router;
