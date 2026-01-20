import { Router } from "express";
import { createCheckout } from "../controllers/billing.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.post("/checkout", authMiddleware, createCheckout);
export default router;
