import { pipeline } from "@xenova/transformers";

let embedder;

// Load model
export async function loadEmbeddingModel() {
  embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );
  console.log("✅ Model loaded");
}

// Generate vector
export async function generateEmbedding(text) {
  const result = await embedder(text, {
    pooling: "mean",
    normalize: true
  });

  return Array.from(result.data);
}

