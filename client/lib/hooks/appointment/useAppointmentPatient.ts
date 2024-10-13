import { ErrorResponse, MessageResponse, PaginatedResult } from "@/types";
import { IExtendedAppointment, IAppointment } from "@/types/entities";
import { AppointmentStatus } from "@/types/enum";
import {
   getAppointmentDetailsPatient,
   getAppointmentsPatient,
   getAppointmentSuccessPageDetails,
   updateStatusAndNotesPatient,
} from "@/lib/api/appointment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAppointmentsPatient = (offset: number, limit: number, status?: AppointmentStatus) => {
   return useQuery<PaginatedResult<IAppointment>, AxiosError<ErrorResponse>>({
      queryKey: ["appointments", status, offset, limit],
      queryFn: () => getAppointmentsPatient(offset, limit, status),
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: true,
   });
};

export const useGetAppointmentDetailsPatient = (appointmentId: string) => {
   return useQuery<IExtendedAppointment, AxiosError<ErrorResponse>>({
      queryFn: () => getAppointmentDetailsPatient(appointmentId),
      queryKey: ["appointmentDetails", appointmentId],
      retry: 1,
      retryOnMount: false,
      retryDelay: 1000 * 40,
   });
};

export const useGetAppointmentSuccessPageDetails = (paymentId: string) => {
   return useQuery<IExtendedAppointment, AxiosError<ErrorResponse>>({
      queryFn: () => getAppointmentSuccessPageDetails(paymentId),
      queryKey: ["appointmentDetails", paymentId],
      retry: 1,
      retryOnMount: false,
   });
};

export const useUpdateAppointmentStatusAndNotesPatient = () => {
   return useMutation<
      MessageResponse,
      AxiosError<ErrorResponse>,
      { appointmentId: string; status: AppointmentStatus; notes: string }
   >({
      mutationFn: ({ appointmentId, status, notes }) => updateStatusAndNotesPatient(appointmentId, status, notes),
      onError: (error) => {
         console.log("Error in Updating Appointment", error);
      },
   });
};
