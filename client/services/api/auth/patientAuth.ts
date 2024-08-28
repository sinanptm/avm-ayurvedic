import { IPatient } from "@/types";
import axiosInstance from "./patientInstance";


export const signUpPatient = async (patient: IPatient) => {
   const response = await axiosInstance.post(`/`, patient);
   return response.data;
};

export const signInPatient = async (email: string, password: string) => {
   const response = await axiosInstance.post(`/login`, { email, password });
   return response.data;
};

export const validateOtpPatient = async (email: string, otp: number) => {
   const response = await axiosInstance.post(`/otp-verification`, { email, otp });
   return response.data;
};
