import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
