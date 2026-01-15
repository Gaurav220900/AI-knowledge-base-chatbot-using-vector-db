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

      {/* BOTTOM PROFILE */}
      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            G
          </div>
          <div>
            <p className={styles.name}>
              Gaurav
            </p>
            <p className={styles.email}>
              gaurav@mail.com
            </p>
          </div>
        </div>

        <button
          className={styles.profileBtn}
        >
          ⚙ Settings
        </button>

        <button
          className={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            window.location.href =
              "/login";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
