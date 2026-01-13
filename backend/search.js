import Embedding from "./models/embedding.model.js";
import { generateEmbedding } from "./services/embedding.service.js";

export async function semanticSearch(query) {
  const queryVector = await generateEmbedding(query);

  const result = await Embedding.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector,
        numCandidates: 100,
        limit: 1
      }
    }
  ]);

  return result;
}
