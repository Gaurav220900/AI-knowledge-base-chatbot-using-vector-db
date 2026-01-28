import styles from "./ChatInput.module.css";

export default function ChatInput({
  value,
  setValue,
  send,
  loading
}) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={e => {
            if (e.key === "Enter") send();
          }}
        />
        <button
          className={styles.sendBtn}
          onClick={send}
          disabled={loading}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}
