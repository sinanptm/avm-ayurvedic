import axios from "axios";

const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/admin/auth`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

export const signinAdmin = async (email: string, password: string) => {
   const response = await axiosInstance.post("/", { email, password });
   return response.data;
};

export const validateOtpAdmin = async (email: string, otp: number) => {
   const response = await axiosInstance.post("/otp-verification", { email, otp });
   return response.data;
};

export const resendOptAdmin = async (email: string) => {
   const response = await axiosInstance.post("/resend-otp", { email });
   return response.data;
};

export const logoutAdmin = async () => {
   const response = await axiosInstance.post("/logout");
   return response.data;
};
