import { clearMultiplePatientNotifications, getDoctorNotifications, clearDoctorNotification } from "@/lib/api/notification"
import { ErrorResponse, INotification, MessageResponse } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"



export const useGetAllDoctorNotifications = ()=>{
    return useQuery<INotification[],AxiosError<ErrorResponse>>({
        queryKey:["notifications"],
        queryFn:getDoctorNotifications,
        retry:1,
        retryOnMount:false,
        refetchInterval:1000*60
    })
}

export const useClearMultipleDoctorNotifications = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{notificationIds:string[]}>({
        mutationFn:({notificationIds})=>clearMultiplePatientNotifications(notificationIds),
        onError:(error)=>{
            console.log('error in clearing notifications  ,', error);
        }
    })
}

export const useClearDoctorNotification = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{notificationId:string}>({
        mutationFn:({notificationId})=>clearDoctorNotification(notificationId),
        onError:(error)=>{
            console.log('error in clearing notification  ,', error);
        }
    })
}
