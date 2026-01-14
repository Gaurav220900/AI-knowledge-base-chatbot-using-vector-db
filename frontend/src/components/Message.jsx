import styles from "./Message.module.css";

export default function Message({ data }) {
  return (
    <div
      className={
        data.role === "user"
          ? styles.user
          : styles.bot
      }
    >
      {data.text}

      {data.sources && (
        <div className={styles.src}>
          Sources:
          {data.sources.map(
            (s, i) => (
              <div key={i}>
                {s.source}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
