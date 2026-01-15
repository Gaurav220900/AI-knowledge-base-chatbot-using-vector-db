import axios from "axios";

export const sendChat = async (text) => {

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }
  const res = await axios.post(
    "http://localhost:5000/api/chat",
    { question: text },
    {
    headers: {
      Authorization:
        "Bearer " + token
      }
    }
  );
  return res.data;
};
