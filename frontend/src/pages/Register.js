import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const nav = useNavigate();

  const handleRegister = async () => {
    await registerUser({
      name,
      email,
      password
    });

    alert("Registered successfully");
    nav("/login");
  };

  return (
    <div className={styles.container}>
    <div className={styles.box}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={e =>
          setName(e.target.value)
        }
      />

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

      <button onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account?
        <a
          href="/login"
          style={{textDecoration: "none"}}
        >
          Login
        </a>
      </p>
    </div>
    </div>
  );
}
