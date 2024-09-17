import axios from "axios";
import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import IAppointment, { AppointmentStatus } from "@/types";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

export type verifyPaymentProps = {
   paymentData: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
   appointmentId: string
}


 const  baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments`


export const getDoctorsList = async () => {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
   return response.data;
};

export const createAppointment = async (appointment: IAppointment) => {
   const response = await withTempBaseUrl(patientAxiosInstance, baseUrl, {
      method: 'POST',
      url: '/',
      data: {
         appointment
      }
   });
   return response.data;
};

export const verifyPayment = async ({ appointmentId, paymentData }: verifyPaymentProps) => {
   const response = await withTempBaseUrl(patientAxiosInstance, baseUrl, {
      method: 'POST',
      url: '/verify-payment',
      data: {
         paymentData, appointmentId
      }
   });
   return response.data;
};


export const getAppointmentsDoctor = async (status: AppointmentStatus,offset: number, limit: number,) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
      method: 'GET',
      url: `/doctor?status=${status}&offset=${offset}&limit=${limit}`,
   })
   return response.data;
}