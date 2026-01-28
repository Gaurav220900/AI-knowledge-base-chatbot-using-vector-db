import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatInput from "./ChatInput";
import styles from "./ChatWindow.module.css";

export default function ChatWindow({
  chat,
  sendMessage,
  loading
}) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  /* auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [chat?.messages, loading]);

  /* EMPTY STATE */
  if (!chat) {
    return (
      <div className={styles.empty}>
        👈 Create or select a chat to start
      </div>
    );
  }

  const handleSend = () => {
    if (!text.trim() || loading) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className={styles.window}>
      
      {/* MESSAGES */}
      <div className={styles.messages}>
        {chat.messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? styles.userMsg
                : styles.botMsg
            }
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {m.text}
            </ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className={styles.botMsg}>
            <span className={styles.thinking}>
              Thinking…
            </span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <ChatInput
        value={text}
        setValue={setText}
        send={handleSend}
        loading={loading}
      />
    </div>
  );
}
