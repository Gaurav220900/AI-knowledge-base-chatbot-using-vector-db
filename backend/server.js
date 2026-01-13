import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./db.js";
import { loadEmbeddingModel } from "./services/embedding.service.js";
import { chatHandler } from "./controller/chat.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();
await loadEmbeddingModel();

app.post("/chat", chatHandler);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
