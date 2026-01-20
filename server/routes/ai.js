import { Router } from "express";
import { askAI } from "../controllers/ai.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.post("/chat", authMiddleware, askAI);
export default router;
