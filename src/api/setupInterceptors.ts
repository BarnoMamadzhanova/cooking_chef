import axios from "axios";
import axiosInstance from "./instance";
import { refreshAccessToken } from "./auth";
import { updateAccessToken, setAuthState } from "../redux/storeUtils";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

export const setupAxiosInterceptors = (
  getAccessToken: () => string | null,
  getRefreshToken: () => string | null
) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.url?.includes("v1/auth")) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            addSubscriber((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();

        if (refreshToken) {
          try {
            const response = await refreshAccessToken({ refreshToken });
            const newAccessToken = response.data.accessToken;
            updateAccessToken(newAccessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            isRefreshing = false;
            onRefreshed(newAccessToken);
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            setAuthState(false);
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
