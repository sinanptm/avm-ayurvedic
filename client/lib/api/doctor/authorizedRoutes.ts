import apiUrls from "@/config/apiConfig";
import axios from "axios";

export const doctorAxiosInstance = axios.create({
   baseURL: `${apiUrls.DOCTOR}`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

doctorAxiosInstance.interceptors.request.use(
   (config) => {
      const token = JSON.parse(localStorage.getItem("auth") || "{}");
      if (token.doctorToken) {
         config.headers.Authorization = `Bearer ${token.doctorToken}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

doctorAxiosInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         try {
            const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
            const refreshResponse = await axios.get(`${apiUrls.DOCTOR}/auth/refresh`, {
               withCredentials: true,
            });

            const newAccessToken = refreshResponse.data.accessToken;

            localStorage.setItem(
               "auth",
               JSON.stringify({
                  ...tokens,
                  doctorToken: newAccessToken,
               })
            );

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return doctorAxiosInstance(originalRequest);
         } catch (refreshError: any) {
            if (refreshError.response.status === 401) {
               const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
               localStorage.setItem("auth", {
                  ...tokens,
                  doctorToken: "",
               });
            }
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export default doctorAxiosInstance;
