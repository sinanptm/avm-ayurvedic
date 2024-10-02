import axios from "axios";
import { IDoctor } from "@/types/entities";
import apiUrls from "@/config/apiConfig";

const axiosInstance = axios.create({
   baseURL: `${apiUrls.DOCTOR}/auth`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

export const signUpDoctor = async (doctor: IDoctor) => {
   const response = await axiosInstance.post("/", doctor);
   return response.data;
};

export const signInDoctor = async (email: string, password: string) => {
   const response = await axiosInstance.post("/signin", { email, password });
   return response.data;
};

export const validateOtpDoctor = async (email: string, otp: number) => {
   const response = await axiosInstance.post("/otp-verification", { email, otp });
   return response.data;
};

export const logoutDoctor = async () => {
   const response = await axiosInstance.post("/logout");
   return response.data;
};

export const getPresignedUrlDoctor = async (id: string) => {
   const response = await axiosInstance.get(`/upload-url?id=${id}`);
   return response.data;
};

export const updateProfileImageDoctor = async (key: string, id: string) => {
   const response = await axiosInstance.post("/upload-url", { key, id });
   return response.data;
};

export const resendOtpDoctor = async (email: string) => {
   const response = await axiosInstance.post("/resend-otp", { email });
   return response.data;
};

export const forgotPasswordDoctor = async (email: string) => {
   const response = await axiosInstance.post("/forgot-password", { email });
   return response.data;
};

export const updatePasswordDoctor = async (email: string, password: string) => {
   const response = await axiosInstance.patch("/update-password", { email, password });
   return response.data;
};
