import axios from "axios";

const api = axios.create({
  baseURL: "https://aerchain-assignment.onrender.com",
});

export default api;
