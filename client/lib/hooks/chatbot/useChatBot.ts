import { createChatMessage, getChatHistory } from "@/lib/api/chatbot"
import { ErrorResponse } from "@/types"
import { IChatBotMessage } from "@/types/entities"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useCreateMessage = () => {
    return useMutation<IChatBotMessage[], AxiosError<ErrorResponse>, { message: string }>({
        mutationFn: ({ message }) => createChatMessage(message)
    })
};

export const useGetMessage = ()=>{
    return useQuery<IChatBotMessage[], AxiosError<ErrorResponse>>({
        queryKey:['chat-bot'],
        queryFn:()=>getChatHistory()
    });
};