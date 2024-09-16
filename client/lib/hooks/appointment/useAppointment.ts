import { verifyPayment, createAppointment, getDoctorsList, verifyPaymentProps } from "@/lib/api/appointment"
import IAppointment, { ErrorResponse, IDoctor, IPatient, MessageResponse, PaginatedResult } from "@/types"
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
    return useMutation<{ orderId: string, appointmentId: string, patient:IPatient }, AxiosError<ErrorResponse>, { appointment: IAppointment }>({
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