import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question) return;

    const userMsg = { role: "user", text: question };
    setMessages(prev => [...prev, userMsg]);

    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/chat",
      { question }
    );

    const botMsg = {
      role: "bot",
      text: res.data.answer
    };

    setMessages(prev => [...prev, botMsg]);
    setQuestion("");
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>AI Knowledge Chat</h2>

      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={
              m.role === "user"
                ? styles.userMsg
                : styles.botMsg
            }
          >
            {m.text}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <div style={styles.inputBox}>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask something..."
          style={styles.input}
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    fontFamily: "sans-serif"
  },
  chatBox: {
    height: "400px",
    border: "1px solid #ddd",
    padding: "10px",
    overflowY: "scroll"
  },
  userMsg: {
    textAlign: "right",
    margin: "8px",
    color: "blue"
  },
  botMsg: {
    textAlign: "left",
    margin: "8px",
    color: "green"
  },
  inputBox: {
    display: "flex",
    gap: "5px",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "8px"
  }
};

export default App;
