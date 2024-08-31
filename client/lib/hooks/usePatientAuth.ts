import { ErrorResponse, IPatient } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signInPatient, signUpPatient, validateOtpPatient } from "@/services/api/patientAuthApis";
import { AxiosError } from "axios";
import { logoutPatient } from "@/services/api/patientProtectedApis";

export const useSignUpPatient = () => {
   return useMutation<{ message: string }, AxiosError<ErrorResponse>, IPatient>({
      mutationFn: (patient) => signUpPatient(patient),
      onError: (error: AxiosError) => {
         console.log("Error in creating patient:", error);
      },
   });
};

export const useSignInPatient = () => {
   return useMutation<
      { message: string; email: string },
      AxiosError<ErrorResponse>,
      { email: string; password: string }
   >({
      mutationFn: ({ email, password }) => signInPatient(email, password),
      onError: (error) => {
         console.log("Error in signing in:", error);
      },
   });
};

export const useValidateOtpPatient = () => {
   return useMutation<{ accessToken: string }, AxiosError<ErrorResponse>, { email: string; otp: number }>({
      mutationFn: ({ email, otp }) => validateOtpPatient(email, otp),
      onError: (error) => {
         console.log("Error in OTP validation:", error);
      },
   });
};

export const useLogoutMutation = ()=>{
   return useMutation<{message:string},AxiosError<ErrorResponse>,null>({
      mutationFn:logoutPatient,
      onError:(error)=>{
         console.log('Error in Logout',error);
      }
   })
}