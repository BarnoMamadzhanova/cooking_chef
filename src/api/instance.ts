import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cookscorner.fun/api",
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url?.includes("v1/auth")) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
