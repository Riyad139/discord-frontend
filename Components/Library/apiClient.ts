import axios from "axios";

const api = axios.create({
  baseURL: "/base",
  withCredentials: true,
});

export default api;
