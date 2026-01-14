import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./db.js";
import { loadEmbeddingModel } from "./services/embedding.service.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();
await loadEmbeddingModel();

app.use("/api", chatRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
