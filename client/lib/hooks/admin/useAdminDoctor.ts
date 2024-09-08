import { addDoctor } from "@/lib/api/admin/authorizedRoutes"
import { ErrorResponse, MessageResponse } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"


export const useAddDoctorAdmin = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{email:string}>({
        mutationFn:({email})=> addDoctor(email),
        onError:error=>{
            console.log('Error in Adding Doctor', error);
        }
    })
}