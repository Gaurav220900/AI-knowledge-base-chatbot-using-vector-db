import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Upload from "../components/Upload";
import { getUser } from "../services/authApi";
import { fetchUserChats } from "../services/chatApi";
import { useNavigate } from "react-router-dom";
import { sendChat } from "../services/chatApi";
import './HomePage.css';
export default function HomePage() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [creating, setCreating] = useState(false);


  const navigate = useNavigate();

 

  useEffect(() => {
    loadUser();
    loadChats();
  }, []);

  async function loadUser() {
    const u = await getUser();
    setUser(u);
  }

  async function loadChats() {
    const res = await fetchUserChats();
    const normalized = res.map(c => ({
      ...c,
      _id: c._id.toString()
    }));

    setChats(normalized);
    setActiveChat(null);
  }

  const handleSearch = async () => {
    if (!query.trim()) return;

   

  try {
    // directly create chat
     setCreating(true);
    const res = await sendChat(query, null);

    navigate(`/chat/${res.chatId}`);
    setCreating(false);
  } catch (err) {
    console.error(err);
  }
  
  };

  return (
    <div style={styles.app}>
      <Sidebar
        chats={chats}
        activeChat={activeChat?._id}
        setActiveChat={setActiveChat}
        createChat={() => navigate("/chat")}
        setChats={setChats}
      />

      <div style={styles.main}>
        <div style={styles.contentWrapper}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <div style={styles.greeting}>
              <h1 style={styles.greetingTitle}>
                Hello, {user?.name || "there"} 
                <span style={styles.wave}>👋</span>
              </h1>
              <p style={styles.greetingSubtitle}>
                What would you like to explore today?
              </p>
            </div>

            {/* Search Input */}
            <div 
              style={{
                ...styles.searchContainer,
                ...(isFocused ? styles.searchContainerFocused : {})
              }}
            >
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !creating && handleSearch()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask me anything..."
                style={styles.searchInput}
                disabled={creating}
              />
              <button
                onClick={handleSearch}
                style={{
                  ...styles.sendButton,
                  backgroundColor: creating ? '#a8a29e' : '#292524',
                  cursor: creating ? 'not-allowed' : 'pointer'
                }}
                disabled={!query.trim() || creating}
              >
                {creating ? (
                  <div style={styles.spinner}></div>
                ) : (
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
                )}
              </button>
            </div>

            {/* Suggestion Pills */}
            <div style={styles.suggestions}>
              <SuggestionPill 
                text="Summarize this document" 
                onClick={() => setQuery("Summarize this document")}
              />
              <SuggestionPill 
                text="Help me write an email" 
                onClick={() => setQuery("Help me write an email")}
              />
              <SuggestionPill 
                text="Explain a concept" 
                onClick={() => setQuery("Explain a concept")}
              />
            </div>
          </div>

          {/* Upload Section */}
          <div style={styles.uploadSection}>
            <div style={styles.uploadCard}>
              <div style={styles.uploadIcon}>
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <h3 style={styles.uploadTitle}>
                Query Your Personal Data
              </h3>
              <p style={styles.uploadDescription}>
                Upload your documents and get personalized, context-aware answers based on your own information
              </p>
              <Upload />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function SuggestionPill({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={styles.suggestionPill}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      }}
    >
      {text}
    </button>
  );
}

const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fafaf9',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
  },
  contentWrapper: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '80px',
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    animation: 'fadeInUp 0.6s ease-out',
  },
  greeting: {
    textAlign: 'center',
    marginBottom: '8px',
  },
  greetingTitle: {
    fontSize: '48px',
    fontFamily: "'Crimson Pro', serif",
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 12px 0',
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  wave: {
    display: 'inline-block',
    fontSize: '44px',
    animation: 'wave 2s ease-in-out infinite',
    transformOrigin: '70% 70%',
  },
  greetingSubtitle: {
    fontSize: '18px',
    color: '#78716c',
    fontWeight: '400',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 6px 6px 24px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '2px solid #e7e5e4',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
  },
  searchContainerFocused: {
    borderColor: '#a8a29e',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), 0 0 0 4px rgba(168, 162, 158, 0.1)',
    transform: 'translateY(-2px)',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: '#1a1a1a',
    backgroundColor: 'transparent',
    padding: '14px 8px',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: '400',
  },
  sendButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#292524',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  suggestions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '8px',
  },
  suggestionPill: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    border: '1.5px solid #e7e5e4',
    borderRadius: '24px',
    fontSize: '14px',
    color: '#57534e',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  },
  uploadSection: {
    animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
  },
  uploadCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '48px',
    textAlign: 'center',
    border: '2px solid #e7e5e4',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  uploadIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    backgroundColor: '#fafaf9',
    borderRadius: '20px',
    marginBottom: '24px',
    color: '#57534e',
    border: '2px solid #e7e5e4',
    animation: 'float 3s ease-in-out infinite',
  },
  uploadTitle: {
    fontSize: '28px',
    fontFamily: "'Crimson Pro', serif",
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 16px 0',
    letterSpacing: '-0.02em',
  },
  uploadDescription: {
    fontSize: '16px',
    color: '#78716c',
    lineHeight: '1.6',
    margin: '0 0 32px 0',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff40',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};