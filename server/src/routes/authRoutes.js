import { Router } from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";
import { registerRole, getMe } from "../controllers/authController.js";

const router = Router();

router.post("/register-role", verifyFirebaseToken, registerRole);
router.get("/me", verifyFirebaseToken, getMe);

export default router;
