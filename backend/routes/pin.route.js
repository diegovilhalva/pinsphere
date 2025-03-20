import express from "express";
import { getPin, getPins } from "../controllers/pin.controller.js";


const router = express.Router()

router.get("/",getPins)
router.get("/:id",getPin)


export default router