import { ErrorResponse, IPatient } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signInPatient, signUpPatient, validateOtpPatient } from "../../services/api/auth/patientAuth";
import { AxiosError } from "axios";


export const useSignUpPatient = () => {
    return useMutation<{ message: string }, AxiosError<ErrorResponse>, IPatient>({
        mutationFn: (patient) => signUpPatient(patient),
        onError: (error:AxiosError) => {
            console.log('Error in creating patient:', error);
        },
    });
};

export const useSignInPatient = () => {
    return useMutation<{ message: string, email: string }, AxiosError<ErrorResponse>, { email: string, password: string }>({
        mutationFn: ({ email, password }) => signInPatient(email, password),
        onError: (error) => {
            console.log('Error in signing in:', error);
        },
    });
};

export const useValidateOtpPatient = () => {
    return useMutation<IPatient, AxiosError<ErrorResponse>, { email: string, otp: number }>({
        mutationFn: ({ email, otp }) => validateOtpPatient(email, otp),
        onError: (error) => {
            console.log('Error in OTP validation:', error);
        },
    });
};
