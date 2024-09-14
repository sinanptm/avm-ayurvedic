import { createAppointment, getDoctorsList } from "@/lib/api/appointment"
import IAppointment, { ErrorResponse, IDoctor, MessageResponse, PaginatedResult } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetDoctorsList = () => {
    return useQuery<PaginatedResult<IDoctor>, AxiosError<ErrorResponse>>({
        queryFn: () => getDoctorsList(),
        queryKey: ["doctors"],
        retry: false
    });
};

export const useCreateAppointment = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{appointment:IAppointment}>({
        mutationFn:({appointment})=>createAppointment(appointment),
        onError:(error)=>{
            console.log("Error in creating appointment",error);   
        }
    })
}