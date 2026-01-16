import axios from "axios";

const API = "http://localhost:5000/api";
const headers = {
  Authorization:
    "Bearer " +
    localStorage.getItem("token"),
};
export const sendChat = async (text, chatId) => {

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }
  const res = await axios.post(
    API + "/chat",
    { question: text, chatId },
    {
    headers: {
      Authorization:
        "Bearer " + token
      }
    }
  );
  return res.data;
};

export const fetchUserChats = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }
  const res = await axios.get(
    API + "/chats",
    {
      headers: {
        Authorization:
          "Bearer " + token
      }
    }
  );
  return res.data;
};


export const deleteChat = (id) =>
 axios.delete(API+"/chat/"+id,{headers});

export const renameChat = (id,title)=>
 axios.put(API+"/chat/"+id+"/rename",{title},{headers});

export const pinChat = (id)=>
 axios.put(API+"/chat/"+id+"/pin",{},{headers});