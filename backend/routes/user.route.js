import express from "express";
import { validateUser } from "../middlewares/validators.js";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/auth/register",validateUser,registerUser)


export default router