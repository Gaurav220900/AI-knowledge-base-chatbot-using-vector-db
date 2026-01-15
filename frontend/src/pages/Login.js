import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({
        email,
        password
      });

      if(res?.data?.token){
        localStorage.setItem(
          "token",
          res.data.token
        );
      }
      nav("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.box}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        No account?
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
    </div>
  );
}
