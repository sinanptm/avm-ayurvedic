import IAppointment, { IPatient } from "@/types";
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
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
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

export const getDoctorsList = async () => {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
   return response.data;
};

export const createAppointment = async (appointment: IAppointment) => {
   const response = await axiosInstance.post('/', { appointment });
   return response.data;
}

export const verifyPayment = async ({ appointmentId, paymentData }: verifyPaymentProps) => {
   const response = await axiosInstance.post('/verify-payment', { paymentData, appointmentId });
   return response.data;
}

export type verifyPaymentProps = {
   paymentData: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
   appointmentId: string
}