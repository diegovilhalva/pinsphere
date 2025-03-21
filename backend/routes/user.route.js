import express from "express";
import { validateLogin, validateUser } from "../middlewares/validators.js";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/:username",getUser)
router.post("/auth/register",validateUser,registerUser)
router.post("/auth/login",validateLogin,loginUser)
router.post("/auth/logout",logoutUser)
export default router