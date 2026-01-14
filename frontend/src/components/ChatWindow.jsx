import { useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import styles from "./ChatWindow.module.css";

export default function ChatWindow({
  chat,
  sendMessage,
  loading
}) {
  const [text, setText] = useState("");

  if (!chat)
  return (
    <div style={{ padding: "20px" }}>
      👈 Create or select a chat to start
    </div>
  );

  const handleSend = () => {
    sendMessage(text);
    setText("");
  };

  return (
    <div className={styles.window}>
      <div className={styles.messages}>
        {chat.messages.map(
          (m, i) => (
            <Message
              key={i}
              data={m}
            />
          )
        )}
        {loading && <p>Thinking...</p>}
      </div>

      <ChatInput
        value={text}
        setValue={setText}
        send={handleSend}
      />
    </div>
  );
}
