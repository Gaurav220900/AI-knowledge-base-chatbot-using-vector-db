import { signup, login, getUser } from "../controller/auth.controller.js";
import express from "express";
const router = express.Router();
import {protect} from "../middleware/auth.js"
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect,getUser);
export default router;
