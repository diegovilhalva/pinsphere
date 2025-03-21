import express from "express";
import { getPostComments } from "../controllers/comment.controller.js";


const router = express.Router()

router.get("/:postId",getPostComments)


export default router