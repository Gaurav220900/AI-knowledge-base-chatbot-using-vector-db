import styles from "./Sidebar.module.css";

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  createChat
}) {
  return (
    <div className={styles.sidebar}>
      <button
        onClick={createChat}
        className={styles.newChatBtn}
      >
        + New Chat
      </button>

      <div className={styles.chatList}>
        {chats.map(chat => (
          <div
            key={chat.id}
            className={
              chat.id === activeChat
                ? styles.activeChat
                : styles.chatItem
            }
            onClick={() =>
              setActiveChat(chat.id)
            }
          >
            💬 {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
