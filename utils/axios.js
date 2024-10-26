import axios from "axios";
import getToken from "./getToken";
import URL from "./config";

const instance = axios.create({
  baseURL: URL,
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
