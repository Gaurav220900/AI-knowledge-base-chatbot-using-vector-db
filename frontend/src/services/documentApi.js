import axios from "axios";

const API = "http://localhost:5000/api";

const authHeader = () => ({
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
});

export const getDocuments = async () => {
    const res = await axios.get(
        `${API}/documents`,
        authHeader()
    );
    return res.data;
};

export const deleteDocument = async (id) => {
    await axios.delete(
        `${API}/documents/${id}`,
        authHeader()
    );
};


