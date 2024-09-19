import IAppointment, { AppointmentStatus, ErrorResponse, IExtendedAppointment, MessageResponse, PaginatedResult } from "@/types"
import { getAppointmentDetailsPatient, getAppointmentsPatient, updateStatusAndNotesPatient } from "@/lib/api/appointment"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetAppointmentsPatient = (offset: number, limit: number, status?: AppointmentStatus) => {
    return useQuery<PaginatedResult<IAppointment>, AxiosError<ErrorResponse>>({
        queryKey: ["appointments", status, offset, limit],
        queryFn: () => getAppointmentsPatient(offset, limit, status)
    })
}

export const useGetAppointmentDetailsPatient = (appointmentId: string) => {
    return useQuery<IExtendedAppointment, AxiosError<ErrorResponse>>({
        queryFn: () => getAppointmentDetailsPatient(appointmentId),
        queryKey: ['appointmentDetails', appointmentId],
        retry: 1,
        retryOnMount: false,
        retryDelay: 1000 * 40
    })
}

export const useUpdateAppointmentStatusAndNotesPatient = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { appointmentId: string, status: AppointmentStatus, notes: string }>({
        mutationFn: ({ appointmentId, status, notes }) => updateStatusAndNotesPatient(appointmentId, status, notes),
        onError: (error) => {
            console.log("Error in Updating Appointment", error);
        }
    })
}