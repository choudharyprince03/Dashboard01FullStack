import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizePermission from "../middleware/authorizePermission.middleware.js";
import { getAIInsight } from "../controller/aiInsight.controller.js";

const router = Router(); 

router.get(
    "/insights",
    authMiddleware,
    authorizePermission("view_ai_insights"),
    getAIInsight
)

export default router; 