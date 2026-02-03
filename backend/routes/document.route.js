import express from "express";
import {
    getUserDocuments,
    deleteDocument
} from "../controller/document.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getUserDocuments);
router.delete("/:id", protect, deleteDocument);

export default router;
