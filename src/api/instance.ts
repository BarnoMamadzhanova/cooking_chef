import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cookscorner.fun/api",
  headers: {
    "Content-Type": "application/json",
  },
});
