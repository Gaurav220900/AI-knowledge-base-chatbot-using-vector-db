import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { sendChat } from "../services/chatApi";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const createChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  const sendMessage = async (text) => {
    if (!activeChat) return;

    const updated = [...chats];
    const index = updated.findIndex(
      c => c.id === activeChat
    );

    

    updated[index].messages.push({
      role: "user",
      text
    });

    const chat = updated[index];
    if (chat.title === "New Chat") {
    const words = text
      .split(" ")
      .slice(0, 5)
      .join(" ");

    chat.title =
      words +
      (text.split(" ").length > 5
        ? "..."
        : "");
    }

    setChats(updated);
    setLoading(true);

    const res = await sendChat(text);

    updated[index].messages.push({
      role: "bot",
      text: res.answer,
      //sources: res.sources
    });


    setChats([...updated]);
    setLoading(false);
  };

  return (
    <div style={styles.app}>
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createChat={createChat}
      />

      <ChatWindow
        chat={chats.find(
          c => c.id === activeChat
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
    height: "100vh",
    fontFamily: "sans-serif"
  }
}
