import { chatHandler, getChats, deleteChat, renameChat, togglePinChat } from "../controller/chat.controller.js";
import express from "express";
import {protect} from "../middleware/auth.js"
import Conversation from "../models/conversation.model.js";
const router = express.Router();

router.post("/chat", protect, chatHandler);
router.get(
  "/chats",
  protect,
  getChats
);
router.delete(
  "/chat/:id",
  protect,
  deleteChat
);
router.put(
  "/chat/:id/rename",
  protect,
  renameChat
);
router.put(
  "/chat/:id/pin",
  protect,
  togglePinChat
);


export default router;