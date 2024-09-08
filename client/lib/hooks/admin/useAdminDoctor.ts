import { addDoctor, getDoctors } from "@/lib/api/admin/authorizedRoutes"
import IDoctor, { ErrorResponse, MessageResponse, PaginatedResult } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"


export const useAddDoctorAdmin = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{email:string}>({
        mutationFn:({email})=> addDoctor(email),
        onError:error=>{
            console.log('Error in Adding Doctor', error);
        }
    })
}

export const  useGetDoctorsAdmin = (offset:number,limit:number)=>{
    return useQuery<PaginatedResult<IDoctor>,AxiosError<ErrorResponse>>({
        queryFn:()=>getDoctors(offset,limit),
        queryKey:["doctors",{limit,offset}]
    })
}