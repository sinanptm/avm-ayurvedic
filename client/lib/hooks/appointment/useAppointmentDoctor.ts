import {
   createAppointment,
   getDoctorsList,
   getAppointmentsDoctor,
   getAppointmentDetailsDoctor,
   updateAppointmentStatusDoctor,
} from "@/lib/api/appointment";
import IAppointment, {
   AppointmentStatus,
   ErrorResponse,
   IDoctor,
   IExtendedAppointment,
   IPatient,
   MessageResponse,
   PaginatedResult,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetDoctorsList = () => {
   return useQuery<PaginatedResult<IDoctor>, AxiosError<ErrorResponse>>({
      queryFn: () => getDoctorsList(),
      queryKey: ["doctors"],
      retry: false,
   });
};

export const useCreateAppointment = () => {
   return useMutation<
      { sessionId: string; checkoutUrl: string },
      AxiosError<ErrorResponse>,
      { appointment: IAppointment }
   >({
      mutationFn: ({ appointment }) => createAppointment(appointment),
      onError: (error) => {
         console.log("Error in creating appointment", error);
      },
   });
};

export const useGetAppointmentsDoctor = (offset: number, limit: number, status?: AppointmentStatus) => {
   return useQuery<PaginatedResult<IAppointment>, AxiosError<ErrorResponse>>({
      queryKey: ["appointments", status, offset, limit],
      queryFn: () => getAppointmentsDoctor(offset, limit, status),
   });
};

export const useGetAppointmentDetailsDoctor = (appointmentId: string) => {
   return useQuery<IExtendedAppointment, AxiosError<ErrorResponse>>({
      queryFn: () => getAppointmentDetailsDoctor(appointmentId),
      queryKey: ["appointmentDetails", appointmentId],
      retry: 1,
      retryOnMount: false,
      retryDelay: 1000 * 40,
   });
};

export const useUpdateAppointmentStatusDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { appointmentId: string; status: AppointmentStatus }>(
      {
         mutationFn: ({ appointmentId, status }) => updateAppointmentStatusDoctor(status, appointmentId),
         onError: (error) => {
            console.log("Error in Updating status ", error);
         },
      }
   );
};
