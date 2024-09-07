import { IPatient } from "@/types";
import axios from "axios";

const getAuthTokens = () => {
   try {
      return JSON.parse(localStorage.getItem("auth") || "{}");
   } catch (e) {
      console.error("Failed to parse auth tokens", e);
      return {};
   }
};

const setAuthTokens = (tokens: Record<string, string>) => {
   localStorage.setItem("auth", JSON.stringify(tokens));
};

const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/patient`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

axiosInstance.interceptors.request.use(
   (config) => {
      const tokens = getAuthTokens();
      if (tokens.patientToken) {
         config.headers.Authorization = `Bearer ${tokens.patientToken}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error: any) => {
      const originalRequest = error.config;
      const tokens = getAuthTokens();

      if (error.response?.status === 403) {
         setAuthTokens({ ...tokens, patientToken: "" });
         return Promise.reject(error);
      }
      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const refreshResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patient/auth/refresh`, {
               withCredentials: true,
            });

            const newAccessToken = refreshResponse.data.accessToken;
            setAuthTokens({ ...tokens, patientToken: newAccessToken });

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
         } catch (refreshError: any) {
            if (refreshError.response?.status === 401 || 403) {
               setAuthTokens({ ...tokens, patientToken: "" });
            }
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export const getPatientProfile = async () => {
   const response = await axiosInstance.get(`/profile`);
   return response.data;
};

export const updatePatientProfile = async (patient: IPatient) => {
   const response = await axiosInstance.put("/profile", { patient });
   return response.data;
};

export const getUpdateProfileUrl = async () => {
   const response = await axiosInstance.get("/profile/upload-url");
   return response.data;
};

export const updateProfileImage = async (key: string) => {
   const response = await axiosInstance.put("/profile/upload-url", { key });
   return response.data;
};
