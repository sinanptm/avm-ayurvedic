import { verifyPayment, createAppointment, getDoctorsList, verifyPaymentProps, getAppointmentsDoctor, getAppointmentDetailsDoctor } from "@/lib/api/appointment"
import IAppointment, { AppointmentStatus, ErrorResponse, IDoctor, IExtendedAppointment, IPatient, MessageResponse, PaginatedResult } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetDoctorsList = () => {
    return useQuery<PaginatedResult<IDoctor>, AxiosError<ErrorResponse>>({
        queryFn: () => getDoctorsList(),
        queryKey: ["doctors"],
        retry: false
    });
};

export const useCreateAppointment = () => {
    return useMutation<{ orderId: string, appointmentId: string, patient: IPatient }, AxiosError<ErrorResponse>, { appointment: IAppointment }>({
        mutationFn: ({ appointment }) => createAppointment(appointment),
        onError: (error) => {
            console.log("Error in creating appointment", error);
        }
    })
}

export const useVerifyPaymentAppointment = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { data: verifyPaymentProps }>({
        mutationFn: ({ data }) => verifyPayment(data),
        onError: (error) => {
            console.log("Error in Verifying payment ", error);
        }
    })
}

export const useGetAppointmentsDoctor = ( offset: number, limit: number,status?: AppointmentStatus) => {
    return useQuery<PaginatedResult<IAppointment>, AxiosError<ErrorResponse>>({
        queryKey: ["appointments", status, offset, limit],
        queryFn: () => getAppointmentsDoctor(offset, limit,status)
    })
}

export const useGetAppointmentDetailsDoctor = (appointmentId: string) => {
    return useQuery<IExtendedAppointment,AxiosError<ErrorResponse>>({
        queryFn: () => getAppointmentDetailsDoctor(appointmentId),
        queryKey: ['appointmentDetails', appointmentId],
        retry:1,
        retryOnMount:false,
        retryDelay:1000*40
    })
}