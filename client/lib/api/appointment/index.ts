import axios from "axios";
import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import IAppointment, { AppointmentStatus } from "@/types";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

export type verifyPaymentProps = {
   paymentData: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
   appointmentId: string
}


const patientBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments/patient`
const doctorBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor`


export const getDoctorsList = async () => {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
   return response.data;
};

export const createAppointment = async (appointment: IAppointment) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: 'POST',
      url: '/',
      data: {
         appointment
      }
   });
   return response.data;
};

export const verifyPayment = async ({ appointmentId, paymentData }: verifyPaymentProps) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: 'POST',
      url: '/verify-payment',
      data: {
         paymentData, appointmentId
      }
   });
   return response.data;
};


export const getAppointmentsDoctor = async (offset: number, limit: number, status?: AppointmentStatus) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: 'GET',
      url: `/?status=${status}&offset=${offset}&limit=${limit}`,
   })
   return response.data;
}

export const getAppointmentDetailsDoctor = async (appointmentId: string) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/details/${appointmentId}`
   });
   return response.data
};

export const updateAppointmentStatusDoctor = async (status: AppointmentStatus, appointmentId: string) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "PUT",
      url: "/",
      data: { status, appointmentId }
   });
   return response.data;
}