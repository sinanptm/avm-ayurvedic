import {
   getPatientGenderStatistics,
   getUsersStatisticsByMonth,
   getAppointmentsStatisticsByStatus,
   getAppointmentsByMonth,
   getSlotStatistics,
} from "@/lib/api/admin/dashboardRoutes";
import { ErrorResponse } from "@/types";
import {
   AppointmentsPerMonthStatistics,
   AppointmentsByStatusStatistics,
   PatientGenderStatistics,
   UserStatistics,
   SlotStatistics,
} from "@/types/statistics";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientGenderStatics = () => {
   return useQuery<{ statistics: PatientGenderStatistics }, AxiosError<ErrorResponse>>({
      queryKey: ["patient-gender"],
      queryFn: () => getPatientGenderStatistics(),
      staleTime: 2 * 30 * 1000,
      refetchOnWindowFocus: true,
   });
};

export const useGetUsersStatics = () => {
   return useQuery<{ statistics: UserStatistics[] }, AxiosError<ErrorResponse>>({
      queryKey: ["users-months"],
      queryFn: () => getUsersStatisticsByMonth(),
      staleTime: 2 * 10 * 1000,
      refetchOnWindowFocus: true,
   });
};

export const useGetAppointmentsStatisticsByStatus = () => {
   return useQuery<{ statistics: AppointmentsByStatusStatistics[] }, AxiosError<ErrorResponse>>({
      queryKey: ["appointment-status"],
      queryFn: () => getAppointmentsStatisticsByStatus(),
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: true,
   });
};

export const useGetAppointmentsByMonth = () => {
   return useQuery<{ statistics: AppointmentsPerMonthStatistics[] }, AxiosError<ErrorResponse>>({
      queryKey: ["appointment-month"],
      queryFn: () => getAppointmentsByMonth(),
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: true,
   });
};

export const useGetSlotStatistics = () => {
   return useQuery<{ statistics: SlotStatistics[] }, AxiosError<ErrorResponse>>({
      queryKey: ["slot-usage"],
      queryFn: () => getSlotStatistics(),
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: true,
   });
};
