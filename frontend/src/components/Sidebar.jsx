import {useEffect, useState} from "react";
import styles from "./Sidebar.module.css";
import {getUser} from '../services/authApi.js'
export default  function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  createChat
}) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }

    fetchUser();
  }, []);

  const firstLetter =
    user?.name?.charAt(0).toUpperCase();
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
              {firstLetter}
           </div>

        <div>
          <p className={styles.name}>
            {user?.name}
          </p>
          <p className={styles.email}>
            {user?.email}
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
