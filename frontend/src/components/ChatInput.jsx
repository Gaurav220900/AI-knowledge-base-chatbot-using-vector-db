import styles from "./ChatInput.module.css";

export default function ChatInput({
  value,
  setValue,
  send
}) {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={e =>
          setValue(e.target.value)
        }
        placeholder="Ask something..."
        onKeyDown={e => {
          if (e.key === "Enter") send();
        }}
      />

      <button
        className={styles.sendBtn}
        onClick={send}
      >
        ➤
      </button>
    </div>
  );
}
