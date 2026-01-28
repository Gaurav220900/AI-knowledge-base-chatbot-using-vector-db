import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { sendChat, fetchUserChats } from "../services/chatApi";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  /* LOAD ALL CHATS */
  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const res = await fetchUserChats();
    const normalized = res.map(c => ({
      ...c,
      _id: c._id.toString()
    }));
    setChats(normalized);
  };

  /* SEND MESSAGE */
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setLoading(true);

    const res = await sendChat(text, chatId);

    // Reload chat from DB (single source of truth)
    await loadChats();

    setLoading(false);
  };

  const activeChat = chats.find(
    c => c._id === chatId
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        chats={chats}
        activeChat={chatId}
        createChat={() => navigate("/chat")}
        setChats={setChats}
      />

      <ChatWindow
        chat={activeChat}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}


const styles = {
  app: {
    display: "flex",
    height: "100vh"
  }
};
