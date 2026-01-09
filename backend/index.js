import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import Embedding from "./backend/models/embedding.model.js";
import {
  loadEmbeddingModel,
  generateEmbedding
} from "./services/embedding.service.js";

async function run() {
  await connectDB();
  await loadEmbeddingModel();

 await Embedding.deleteMany({});

  await Embedding.insertMany([
    {
      content: "React is used for frontend development",
      embedding: await generateEmbedding(
        "React is used for frontend development"
      )
    },
    {
      content: "Node.js is great for backend",
      embedding: await generateEmbedding(
        "Node.js is great for backend"
      )
    },
    {
      content: "MongoDB is a NoSQL database",
      embedding: await generateEmbedding(
        "MongoDB is a NoSQL database"
      )
    }
  ]);

  console.log("✅ Data inserted");

  // verify
  const all = await Embedding.find();
  console.log(all.map(d => d.content));
}
//const all = await Embedding.find();
//console.log(all.map(d => d.content));
run();
