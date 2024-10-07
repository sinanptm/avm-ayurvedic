import { getPatientGenderStatics, getUsersStatisticsByMonth, getAppointmentsStatisticsByStatus, getAppointmentsByMonth } from "@/lib/api/admin/dashboardRoutes";
import { ErrorResponse } from "@/types";
import { PatientGenderStatics, AppointmentsByStatusStatistics, AppointmentsPerMonthStatics, UserStatistics } from "@/types/statistics";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientGenderStatics = () => {
    return useQuery<{ statistics: PatientGenderStatics }, AxiosError<ErrorResponse>>({
        queryKey: ["patient-gender"],
        queryFn: getPatientGenderStatics,
        staleTime: 2 * 60 * 1000, 
        refetchOnWindowFocus: true,
    });
}

export const useGetUsersStatics = () => {
    return useQuery<{ statistics: UserStatistics[] }, AxiosError<ErrorResponse>>({
        queryKey: ["users-months"],
        queryFn: getUsersStatisticsByMonth,
        staleTime: 2 * 60 * 1000, 
        refetchOnWindowFocus: true,
    });
}

export const useGetAppointmentsStatisticsByStatus = () => {
    return useQuery<{ statistics: AppointmentsByStatusStatistics[] }, AxiosError<ErrorResponse>>({
        queryKey: ["appointment-status"],
        queryFn: getAppointmentsStatisticsByStatus,
        staleTime: 2 * 60 * 1000, 
        refetchOnWindowFocus: true,
    });
}

export const useGetAppointmentsByMonth = () => {
    return useQuery<{ statistics: AppointmentsPerMonthStatics[] }, AxiosError<ErrorResponse>>({
        queryKey: ["appointment-month"],
        queryFn: getAppointmentsByMonth,
        staleTime: 2 * 60 * 1000, 
        refetchOnWindowFocus: true,
    });
}
