import { useEffect, useState, useRef } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authApi";
import {
  deleteChat,
  renameChat,
  pinChat
} from "../services/chatApi";

export default function Sidebar({
  chats,
  activeChat,
  createChat,
  setChats
}) {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();

  const nav = useNavigate();

  /* CLOSE profile dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /* ---------------- LOAD USER ---------------- */
  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }
    fetchUser();
  }, []);

  const firstLetter =
    user?.name?.charAt(0).toUpperCase();

  /* ---------------- HANDLERS ---------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete chat?")) return;

    await deleteChat(id);

    setChats(prev =>
      prev.filter(c => c._id !== id)
    );

    setOpenMenu(null);
  };

  const handlePin = async (id) => {
    const res = await pinChat(id);

    setChats(prev =>
      prev.map(c =>
        c._id === id
          ? {
              ...c,
              pinned: res.data.pinned
            }
          : c
      )
    );

    setOpenMenu(null);
  };

  const saveRename = async (chat) => {
    if (!editText.trim()) return;

    await renameChat(chat._id, editText);

    setChats(prev =>
      prev.map(c =>
        c._id === chat._id
          ? { ...c, title: editText }
          : c
      )
    );

    setEditingId(null);
    setOpenMenu(null);
  };

  /* ---------------- SORT PINNED ---------------- */
  const sortedChats = [...chats].sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;

  return new Date(b.createdAt) - new Date(a.createdAt);
});

  return (
    <div className={styles.sidebar}>
      {/* NEW CHAT */}
      <button
        onClick={() => {
          
          nav(`/`);
        }}
        className={styles.newChatBtn}
      >
        + New Chat
      </button>

      {/* CHAT LIST */}
      <div className={styles.chatList}>
        {sortedChats.map(chat => (
          <div
            key={chat._id}
            className={
              chat._id === activeChat
                ? styles.activeChat
                : styles.chatItem
            }
          >
            {/* TITLE / INPUT */}
            {editingId === chat._id ? (
              <input
                className={styles.renameInput}
                value={editText}
                autoFocus
                onChange={e =>
                  setEditText(e.target.value)
                }
                onKeyDown={e => {
                  if (e.key === "Enter")
                    saveRename(chat);
                  if (e.key === "Escape") {
                    setEditingId(null);
                    setOpenMenu(null);
                  }
                }}
                onBlur={() => {
                  setEditingId(null);
                  setOpenMenu(null);
                }}
              />
            ) : (
              <span
                onClick={() =>
                  nav(`/chat/${chat._id}`)
                }
              >
                {chat.pinned && "📌 "}
                {chat.title}
              </span>
            )}

            {/* 3 DOT */}
            <div
              className={styles.menuBtn}
              onClick={() =>
                setOpenMenu(
                  openMenu === chat._id
                    ? null
                    : chat._id
                )
              }
            >
              ⋮
            </div>

            {/* DROPDOWN */}
            {openMenu === chat._id && (
              <div className={styles.menu}>
                <button
                  onClick={() =>
                    handlePin(chat._id)
                  }
                >
                  {chat.pinned
                    ? "Unpin"
                    : "Pin"}
                </button>

                <button
                  onClick={() => {
                    setEditingId(chat._id);
                    setEditText(chat.title);
                  }}
                >
                  Rename
                </button>

                <button
                  onClick={() =>
                    handleDelete(chat._id)
                  }
                  className={
                    styles.deleteBtn
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PROFILE */}
      {/* PROFILE */}
<div
  className={styles.profileBox}
  ref={profileRef}
>
  {/* CLICKABLE PROFILE */}
  <div
    className={styles.profile}
    onClick={() =>
      setShowProfileMenu(
        !showProfileMenu
      )
    }
  >
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

  {/* DROPDOWN */}
  {showProfileMenu && (
    <div className={styles.profileMenu}>
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
)}
</div>
    </div>
  );
}
