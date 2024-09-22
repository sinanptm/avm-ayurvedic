import axios from "axios";
import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import IAppointment, { AppointmentStatus } from "@/types";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

const patientBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments/patient`;
const doctorBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor`;

export const getDoctorsList = async () => {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
   return response.data;
};

export const createAppointment = async (appointment: IAppointment) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "POST",
      url: "/",
      data: {
         appointment,
      },
   });
   return response.data;
};

export const getAppointmentsDoctor = async (offset: number, limit: number, status?: AppointmentStatus) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/?status=${status}&offset=${offset}&limit=${limit}`,
   });
   return response.data;
};

export const getAppointmentDetailsDoctor = async (appointmentId: string) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/details/${appointmentId}`,
   });
   return response.data;
};

export const updateAppointmentStatusDoctor = async (status: AppointmentStatus, appointmentId: string) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "PUT",
      url: "/",
      data: { status, appointmentId },
   });
   return response.data;
};

export const getAppointmentsPatient = async (offset: number, limit: number, status?: AppointmentStatus) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "GET",
      url: `/?status=${status}&offset=${offset}&limit=${limit}`,
   });
   return response.data;
};

export const getAppointmentDetailsPatient = async (appointmentId: string) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "GET",
      url: `/details/${appointmentId}`,
   });
   return response.data;
};

export const getAppointmentSuccessPageDetails = async (paymentId: string) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "GET",
      url: `/succuss/${paymentId}`,
   });
   return response.data;
};

export const updateStatusAndNotesPatient = async (appointmentId: string, status: AppointmentStatus, notes: string) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "PUT",
      url: "/",
      data: { status, appointmentId, notes },
   });
   return response.data;
};
