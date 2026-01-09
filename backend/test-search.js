import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import { semanticSearch } from "./search.js";
import { loadEmbeddingModel } from "./services/embedding.service.js"; 
await connectDB();
await loadEmbeddingModel();


const res = await semanticSearch(
 "sql or mongo database as used in backend applications"
);

console.log(res);
