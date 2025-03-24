import express from "express";
import { validateLogin, validateUser } from "../middlewares/validators.js";
import { followUser, getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.get("/:username", getUser)
router.post("/auth/register", validateUser, registerUser)
router.post("/auth/login", validateLogin, loginUser)
router.post("/auth/logout", verifyToken, logoutUser)
router.post("/follow/:username", verifyToken, followUser)
export default router