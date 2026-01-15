import { chatHandler } from "../controller/chat.controller.js";
import express from "express";
import {protect} from "../middleware/auth.js"
const router = express.Router();

router.post("/chat", protect, chatHandler);

export default router;