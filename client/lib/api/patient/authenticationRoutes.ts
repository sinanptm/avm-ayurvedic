import axios from "axios";
import IPatient  from "@/types";

const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/patient/auth`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

axiosInstance.interceptors.response.use((response: any) => {
   if (response.data.accessToken) {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      auth.patientToken = response.data.accessToken;
      localStorage.setItem("auth", JSON.stringify(auth));
   }
   return response;
});

export const signUpPatient = async (patient: IPatient) => {
   const response = await axiosInstance.post("/", patient);
   return response.data;
};
export const oAuthSignin = async (email: string, name: string, profile?: string) => {
   const response = await axiosInstance.post("/oauth-signin", { email, name, profile });
   return response.data;
};

export const signInPatient = async (email: string, password: string) => {
   const response = await axiosInstance.post("/login", { email, password });
   return response.data;
};

export const validateOtpPatient = async (email: string, otp: number) => {
   const response = await axiosInstance.post("/otp-verification", { email, otp });
   return response.data;
};

export const resendOtpPatient = async (email: string) => {
   const response = await axiosInstance.post("/resend-otp", { email });
   return response.data;
};

export const forgetPassword = async (email: string) => {
   const response = await axiosInstance.post("/forget-password", { email });
   return response.data;
};

export const updatePassword = async (email: string, newPassword: string) => {
   const response = await axiosInstance.patch("/update-password", { email, newPassword });
   return response.data;
};

export const logoutPatient = async () => {
   const response = await axiosInstance.post("/logout");
   return response.data;
};
