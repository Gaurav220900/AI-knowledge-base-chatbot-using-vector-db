import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { sendChat, fetchUserChats } from "../services/chatApi";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD CHATS ---------------- */
  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const res = await fetchUserChats();

    // 🔥 normalize id to string
    const normalized = res.map(c => ({
      ...c,
      _id: c._id.toString()
    }));

    setChats(normalized);

    if (normalized.length > 0) {
      setActiveChat(normalized[0]._id);
    }
  };

  /* ---------------- CREATE CHAT ---------------- */
  const createChat = () => {
    const tempId = "temp-" + Date.now();

    const newChat = {
      _id: tempId,
      title: "New Chat",
      messages: []
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(tempId);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setLoading(true);

    const isTemp = activeChat.startsWith("temp-");

    /* optimistic update */
    setChats(prev =>
      prev.map(chat =>
        chat._id === activeChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role: "user", text }
              ],
              title:
                chat.title === "New Chat"
                  ? text
                      .split(" ")
                      .slice(0, 5)
                      .join(" ") + "..."
                  : chat.title
            }
          : chat
      )
    );

    /* API call */
    const res = await sendChat(
      text,
      isTemp ? null : activeChat
    );

    /* sync db */
    setChats(prev =>
      prev.map(chat =>
        chat._id === activeChat
          ? {
              ...chat,
              _id: res.chatId.toString(), // 🔥 normalize
              messages: [
                ...chat.messages,
                {
                  role: "bot",
                  text: res.answer
                }
              ]
            }
          : chat
      )
    );

    setActiveChat(res.chatId.toString());
    setLoading(false);
  };

  return (
    <div style={styles.app}>
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createChat={createChat}
        setChats={setChats}
      />

      <ChatWindow
        chat={chats.find(
          c => c._id === activeChat
        )}
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
