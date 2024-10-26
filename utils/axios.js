import axios from "axios";
import getToken from "./getToken";

const instance = axios.create({
  baseURL: "https://inventory-server-26op.onrender.com/",
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default instance;
