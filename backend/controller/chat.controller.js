import Chat from "../models/chat.model.js";
import { semanticSearch } from "../search.js";
import { generateAnswer } from "../services/llm.service.js";

export async function chatHandler(req, res) {
  const { question } = req.body;

  // 1. Store user msg
  await Chat.create({
    role: "user",
    text: question
  });

  // 2. Get last 5 messages
  const history = await Chat.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const historyText = history
    .reverse()
    .map(m => `${m.role}: ${m.text}`)
    .join("\n");

  // 3. Vector search
  const docs = await semanticSearch(question);
  const context = docs
    .map(d => d.content)
    .join("\n");

  // 4. Prompt
  const prompt = `
You are a helpful assistant.

Chat history:
${historyText}

Context:
${context}

User question:
${question}
`;

  // 5. LLM answer
  const answer = await generateAnswer(prompt);

  // 6. Save bot msg
  await Chat.create({
    role: "bot",
    text: answer
  });

  res.json({ answer });
}
