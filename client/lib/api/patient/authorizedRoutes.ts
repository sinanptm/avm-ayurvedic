import { IPatient } from "@/types/entities";
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

const patientAxiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/patient`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

patientAxiosInstance.interceptors.request.use(
   (config) => {
      const tokens = getAuthTokens();
      if (tokens.patientToken) {
         config.headers.Authorization = `Bearer ${tokens.patientToken}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

patientAxiosInstance.interceptors.response.use(
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
            return patientAxiosInstance(originalRequest);
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
   const response = await patientAxiosInstance.get("/profile");
   return response.data;
};

export const updatePatientProfile = async (patient: IPatient) => {
   const response = await patientAxiosInstance.put("/profile", { patient });
   return response.data;
};

export const getUpdateProfileUrl = async () => {
   const response = await patientAxiosInstance.get("/profile/upload-url");
   return response.data;
};

export const updateProfileImage = async (key: string) => {
   const response = await patientAxiosInstance.put("/profile/upload-url", { key });
   return response.data;
};

export default patientAxiosInstance;
