import express from "express";
import { validateLogin, validateUser } from "../middlewares/validators.js";
import { followUser, getUser, handleAvatarUpload, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.get("/:username", getUser)
router.post("/auth/register", validateUser, registerUser)
router.post("/auth/login", validateLogin, loginUser)
router.post("/auth/logout", verifyToken, logoutUser)
router.post("/follow/:username", verifyToken, followUser)
router.patch("/profile",verifyToken,updateProfile)
router.patch(
  "/profile/avatar",
  verifyToken,
  (req, res, next) => { // Middleware de validação de arquivo
    if (!req.files?.avatar) {
      return res.status(400).json({
        success: false,
        error: "Avatar file is required"
      });
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(req.files.avatar.mimetype)) {
      return res.status(400).json({
        success: false,
        error: "Only JPEG, PNG and WebP are allowed"
      });
    }
    next();
  },
  handleAvatarUpload
);
export default router