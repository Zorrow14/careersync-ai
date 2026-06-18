import { Router } from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";
import {
  getMyProfile,
  createProfile,
  updateProfile,
  uploadResume,
  resumeUploadMiddleware,
} from "../controllers/profileController.js";

const router = Router();

// All profile routes require a valid Firebase ID token
router.get("/me", verifyFirebaseToken, getMyProfile);
router.post("/", verifyFirebaseToken, createProfile);
router.put("/me", verifyFirebaseToken, updateProfile);
router.post("/resume", verifyFirebaseToken, resumeUploadMiddleware, uploadResume);

export default router;
