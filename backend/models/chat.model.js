import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  role: String, // user / bot
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chat", chatSchema);
