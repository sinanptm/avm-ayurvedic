import { getDoctorChats, getMessagesOfDoctorChat, createChatDoctor, createMessageDoctor, getPatientsDoctor } from "@/lib/api/chat";
import { ErrorResponse, IChat, IMessage, MessageResponse, PaginatedResult, IPatient } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useGetDoctorChats = () => {
    return useQuery<IChat[],AxiosError<ErrorResponse>>({
        queryKey: ['doctor-chat-list'],
        queryFn: () => getDoctorChats()
    });
}

export const useGetDoctorMessages = (chatId: string, limit: number) => {
    return useQuery<{ chat: IChat, data: PaginatedResult<IMessage> }, AxiosError<ErrorResponse>>({
        queryKey: ['messages', chatId],
        queryFn: () => getMessagesOfDoctorChat(chatId, limit)
    });
}

export const useGetPatientsDoctor = () => {
    return useQuery<IPatient[], AxiosError<ErrorResponse>>({
        queryKey: ['patients-doctor'],
        queryFn: () => getPatientsDoctor()
    });
}

export const useCreateChatDoctor = () => {
    const router = useRouter()
    return useMutation<{chatId:string}, AxiosError<ErrorResponse>, { patientId: string }>({
        mutationFn: ({ patientId }) => createChatDoctor(patientId),
        onSuccess:({chatId})=>{
            router.push(`/doctor/chats/${chatId}`)
        },
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
