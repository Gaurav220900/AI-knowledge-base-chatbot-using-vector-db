import { chatHandler } from "../controller/chat.controller.js";
import express from "express";

const router = express.Router();

router.post("/chat", chatHandler);

export default router;