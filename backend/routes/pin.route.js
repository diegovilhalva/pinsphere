import express from "express";
import { createPin, getPin, getPins, interact, interactionCheck } from "../controllers/pin.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";



const router = express.Router()

router.get("/", getPins)
router.get("/:id", getPin)
router.post("/", verifyToken, createPin)
router.get("/interaction-check/:id",verifyToken,interactionCheck)
router.post("/interact/:id",verifyToken,interact)

export default router