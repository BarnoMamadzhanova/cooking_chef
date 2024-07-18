import axios from "axios";
// import { useAppSelector } from "../redux/hook";
// import { selectAuthState } from "../redux/auth/authSlice";

export const axiosInstance = axios.create({
  baseURL: "https://cookscorner.fun/api",
});

axiosInstance.interceptors.request.use((config) => {
  // const { accessToken } = useAppSelector(selectAuthState);

  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  if (config.url?.includes("v1/auth")) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
