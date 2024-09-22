import { clearMultiplePatientNotifications, getPatientNotifications, clearPatientNotification } from "@/lib/api/notification"
import { ErrorResponse, INotification, MessageResponse } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"



export const useGetAllPatientNotifications = ()=>{
    return useQuery<INotification[],AxiosError<ErrorResponse>>({
        queryKey:["notifications"],
        queryFn:getPatientNotifications
    })
}

export const useClearMultiplePatientNotifications = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{notificationIds:string[]}>({
        mutationFn:({notificationIds})=>clearMultiplePatientNotifications(notificationIds),
        onError:(error)=>{
            console.log('error in clearing notifications  ,', error);
        }
    })
}

export const useClearPatientNotification = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{notificationId:string}>({
        mutationFn:({notificationId})=>clearPatientNotification(notificationId),
        onError:(error)=>{
            console.log('error in clearing notification  ,', error);
        }
    })
}
