// import { upload } from "../middleware/upload.js";
// import {
//   extractText
// } from "../services/pdf.service.js";
// import {
//   chunkText
// } from "../utils/chunker.js";
// import {
//   generateEmbedding
// } from "../services/embedding.service.js";
// import Embedding from "../models/embedding.model.js";
// import { protect } from "../middleware/auth.js";
// import express from "express";
// const router = express.Router();

// router.post(
//   "/upload",
//   protect,
//   upload.single("file"),
//   async (req, res) => {
//     const text = await extractText(
//       req.file.buffer
//     );

//     const chunks = chunkText(text);

//     for (const chunk of chunks) {
//       const vector =
//         await generateEmbedding(chunk);

//       await Embedding.create({
//         content: chunk,
//         embedding: vector,
//         userId: req.user.id
//       });
//     }

//     res.json({
//       success: true,
//       chunks: chunks.length
//     });
//   }
// );


// export default router;