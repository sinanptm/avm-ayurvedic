import { signinAdmin, resendOptAdmin, validateOtpAdmin } from "@/lib/utils/api/admin/Authentication";
import { ErrorResponse, MessageResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useSigninAdmin =()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{email:string,password:string}>({
        mutationFn:({email,password})=>signinAdmin(email,password),
        onError:(error)=>{
            console.log('error in signin',error);
        }
    })
}

export const useValidateOtp = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{email:string,otp:number}>({
        mutationFn:({email,otp})=>validateOtpAdmin(email,otp),
        onError:(error)=>{
            console.log("error in otp verification",error);
        }
    })
}

export const useResendOtp = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,{email:string}>({
        mutationFn:({email})=>resendOptAdmin(email),
        onError:(error)=>{
            console.log('error in resending otp', error);
        }
    })
}