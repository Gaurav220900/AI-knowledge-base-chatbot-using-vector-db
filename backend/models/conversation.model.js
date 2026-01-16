import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: {
    type: String,
    default: "New Chat"
  },

  messages: [
    {
      role: String, // user / bot
      text: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  pinned: {
  type: Boolean,
  default: false
  }
});

export default mongoose.model(
  "Conversation",
  conversationSchema
);
