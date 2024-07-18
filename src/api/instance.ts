import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cookscorner.fun/api",
});

// axiosInstance.interceptors.request.use((config) => {
//   const { accessToken } = useAppSelector(selectAuthState);

//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   if (config.url?.includes("v1/auth")) {
//     config.headers["Content-Type"] = "application/json";
//   }
//   return config;
// });

// export default axiosInstance;

export const setupAxiosInterceptors = (accessToken?: string) => {
  axiosInstance.interceptors.request.use((config) => {
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
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - please login");
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
