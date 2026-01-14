import axios from "axios";

export const sendChat = async (text) => {
  const res = await axios.post(
    "http://localhost:5000/api/chat",
    { question: text }
  );
  return res.data;
};
