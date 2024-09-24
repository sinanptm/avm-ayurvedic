import { getMessagesOfPatientChat, getPatientChats, createChatPatient, createMessagePatient, } from "@/lib/api/chat";
import { ErrorResponse, IChat, IMessage, MessageResponse, PaginatedResult } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientChats = () => {
    return useQuery({
        queryKey: ['patient-chat-list'],
        queryFn: () => getPatientChats()
    })
}

export const useGetPatientMessages = (chatId: string, limit: number) => {
    return useQuery< { chat:IChat, data:PaginatedResult<IMessage> },AxiosError<ErrorResponse>>({
        queryKey: ['messages', chatId],
        queryFn: () => getMessagesOfPatientChat(chatId, limit),
        refetchOnMount:true,
        refetchInterval:1000
    })
}

export const useCreateChatPatient = () => {
    return useMutation<{chatId:string}, AxiosError<ErrorResponse>, { doctorId: string }>({
        mutationFn: ({ doctorId }) => createChatPatient(doctorId),
        onError: (error) => {
            console.error('Error in creating chat', error);
        }
    })
}

export const useCreateMessagePatient = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { doctorId: string, chatId: string, message: string }>({
        mutationFn: ({ doctorId, chatId, message }) => createMessagePatient(chatId, message, doctorId),
        onError: (error) => {
            console.error('Error in creating chat', error);
        }
    })
}