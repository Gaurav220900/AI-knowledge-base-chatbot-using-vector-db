import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import Embedding from "./backend/models/embedding.model.js";

await connectDB();

console.time("FIND");
const all = await Embedding.find();
console.timeEnd("FIND");

console.log(all.map(d => d.content));
process.exit();
