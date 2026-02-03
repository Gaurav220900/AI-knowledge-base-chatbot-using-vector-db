import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatInput from "./ChatInput";
import styles from "./ChatWindow.module.css";

function TypingMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(prev => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text, onDone]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {displayed}
    </ReactMarkdown>
  );
}

export default function ChatWindow({
  chat,
  sendMessage,
  loading,
  streamingMessageId
}) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, loading]);

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
    <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
      <div className={styles.window}>
        <div className={styles.messages}>
          {chat.messages.map(m => (
            <div
              key={m._id}
              className={
                m.role === "user"
                  ? styles.userMsg
                  : styles.botMsg
              }
            >
              {m._id === streamingMessageId ? (
                <TypingMessage
                  text={m.text}
                  onDone={() => { }}
                />
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.text}
                </ReactMarkdown>
              )}
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

        <ChatInput
          value={text}
          setValue={setText}
          send={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}
