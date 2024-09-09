import { signUpDoctor, getPresignedUrlDoctor, logoutDoctor, signInDoctor, updateProfileImage, validateOtpDoctor } from "@/lib/api/doctor/authenticationRoutes"; 
import { IDoctor, ErrorResponse, MessageResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface SignUpResponse extends MessageResponse {
    id: string;
}

export const useSignUpDoctor = () => {
    return useMutation<SignUpResponse, AxiosError<ErrorResponse>, { doctor: IDoctor }>({
        mutationFn: ({ doctor }) => signUpDoctor(doctor),
        onError: (error) => {
            console.log('Error in Doctor Signup:', error);
        },
    });
};


export const useSignInDoctor = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string, password: string }>({
        mutationFn: ({ email, password }) => signInDoctor(email, password),
        onError: (error) => {
            console.log('Error in Doctor Signin:', error);
        },
    });
};

export const useValidateOtpDoctor = () => {
    return useMutation<{accessToken:string}, AxiosError<ErrorResponse>, { email: string, otp: number }>({
        mutationFn: ({ email, otp }) => validateOtpDoctor(email, otp),
        onError: (error) => {
            console.log('Error in OTP Validation:', error);
        },
    });
};

export const useLogoutDoctor = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>>({
        mutationFn: () => logoutDoctor(),
        onError: (error) => {
            console.log('Error in Doctor Logout:', error);
        },
    });
};

export const useGetPresignedUrlDoctor = () => {
    return useMutation<{ url: string }, AxiosError<ErrorResponse>, { id: string }>({
        mutationFn: ({ id }) => getPresignedUrlDoctor(id),
        onError: (error) => {
            console.log('Error in getting presigned URL:', error);
        },
    });
};

export const useUpdateProfileImage = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { key: string, id: string }>({
        mutationFn: ({ key, id }) => updateProfileImage(key, id),
        onError: (error) => {
            console.log('Error in updating profile image:', error);
        },
    });
};
