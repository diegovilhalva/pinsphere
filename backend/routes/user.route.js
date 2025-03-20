import express from "express";
import { validateLogin, validateUser } from "../middlewares/validators.js";
import { getUser, loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/:username",getUser)
router.post("/auth/register",validateUser,registerUser)
router.post("/auth/login",validateLogin,loginUser)

export default router