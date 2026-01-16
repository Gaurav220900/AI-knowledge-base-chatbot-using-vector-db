import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);

export const registerUser = (data) =>
  axios.post(`${API}/signup`, data);

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null; // User not authenticated
  }
  try {
    const res = await axios.get(
      `${API}/me`,
      {
        headers: {
          Authorization:
            "Bearer " +
            token,
        },
      }
    );

    return res.data;   // ✅ return user
  } catch (err) {
    console.error(
      "Error fetching user data:",
      err
    );
    return null;
  }
};