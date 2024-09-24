import { getDoctorChats, getMessagesOfDoctorChat, createChatDoctor, createMessageDoctor } from "@/lib/api/chat";
import { ErrorResponse, MessageResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetDoctorChats = () => {
    return useQuery({
        queryKey: ['doctor-chat-list'],
        queryFn: () => getDoctorChats()
    });
}

export const useGetDoctorMessages = (chatId: string, limit: number) => {
    return useQuery({
        queryKey: ['doctor-messages', chatId],
        queryFn: () => getMessagesOfDoctorChat(chatId, limit)
    });
}

export const useCreateChatDoctor = () => {
    return useMutation<{chatId:string}, AxiosError<ErrorResponse>, { patientId: string }>({
        mutationFn: ({ patientId }) => createChatDoctor(patientId),
        onError: (error) => {
            console.error('Error in creating doctor chat,', error);
        }
    });
}

export const useCreateMessageDoctor = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { patientId: string, chatId: string, message: string }>({
        mutationFn: ({ patientId, chatId, message }) => createMessageDoctor(chatId, message, patientId),
        onError: (error) => {
            console.error('Error in creating doctor message,', error);
        }
    });
}
