import mongoose from "mongoose";

const embeddingSchema = new mongoose.Schema({
  content: String,
  embedding: [Number],
});

export default mongoose.model("Embedding", embeddingSchema);