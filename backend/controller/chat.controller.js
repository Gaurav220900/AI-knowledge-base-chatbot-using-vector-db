import Conversation from "../models/conversation.model.js";
import { generateAnswer } from '../services/llm.service.js';
import { semanticSearch } from '../search.js'
export const chatHandler = async (req, res) => {
  const { question, chatId } = req.body;
  const userId = req.user.id;

  let convo;

  if (chatId) {
    convo = await Conversation.findById(chatId);
  } else {
    convo = await Conversation.create({
      userId,
      title: "New Chat",
      messages: []
    });
  }

  convo.messages.push({
    role: "user",
    text: question
  });

  // 2. Get last 5 messages
  const history = await Conversation.find({
    userId
  })
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

  convo.messages.push({
    role: "bot",
    text: answer
  });

  // auto title
  if (convo.title === "New Chat") {
    convo.title = question
      .split(" ")
      .slice(0, 5)
      .join(" ");
  }

  await convo.save();

  res.json({
    answer,
    chatId: convo._id
  });
};


export const getChats = async (req, res) => {
  const user = req.user;
  if( !user ) {
    return res.status(401).json({ message: "Unauthorized" });
  } 

  const chats = await Conversation.find({
    userId: req.user.id
  });

  res.json(chats);
}


export const deleteChat = async (req, res) => {
  const user = req.user;
  if( !user ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(!req.params.id) {
    return res.status(400).json({ message: "Chat ID is required" });
  }
   await Conversation.deleteOne({
    _id: req.params.id,
    userId: req.user.id
  });
  res.json({ success:true });

}

export const renameChat = async (req, res) => {
  const user = req.user;
  if( !user ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title } = req.body;
  if(!title) {
    return res.status(400).json({ message: "Title is required" });
  } 
  if(!req.params.id) {
    return res.status(400).json({ message: "Chat ID is required" });
  }

  await Conversation.updateOne(
    { _id:req.params.id, userId:req.user.id },
    { title }
  );

  res.json({ success:true });
}


export const togglePinChat = async (req, res) => {
  const user = req.user;
  if( !user ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if(!req.params.id) {
    return res.status(400).json({ message: "Chat ID is required" });
  }
   const chat = await Conversation.findById(req.params.id);

  chat.pinned = !chat.pinned;
  await chat.save();

  res.json({ pinned: chat.pinned });
}