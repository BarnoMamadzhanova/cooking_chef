import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cookscorner.fun/api",
});

export default axiosInstance;
