import {
   signUpDoctor,
   logoutDoctor,
   signInDoctor,
   updateProfileImageDoctor,
   validateOtpDoctor,
   resendOtpDoctor,
   forgotPasswordDoctor,
} from "@/lib/api/doctor/authenticationRoutes";
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
         console.log("Error in Doctor Signup:", error);
      },
   });
};

export const useSignInDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string; password: string }>({
      mutationFn: ({ email, password }) => signInDoctor(email, password),
      onError: (error) => {
         console.log("Error in Doctor Signin:", error);
      },
   });
};

export const useValidateOtpDoctor = () => {
   return useMutation<{ accessToken: string }, AxiosError<ErrorResponse>, { email: string; otp: number }>({
      mutationFn: ({ email, otp }) => validateOtpDoctor(email, otp),
      onError: (error) => {
         console.log("Error in OTP Validation:", error);
      },
   });
};

export const useLogoutDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, {}>({
      mutationFn: () => logoutDoctor(),
      onError: (error) => {
         console.log("Error in Doctor Logout:", error);
      },
   });
};

export const useUpdateProfileImageDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { key: string; id: string }>({
      mutationFn: ({ key, id }) => updateProfileImageDoctor(key, id),
      onError: (error) => {
         console.log("Error in updating profile image:", error);
      },
   });
};

export const useResendOtpDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string }>({
      mutationFn: ({ email }) => resendOtpDoctor(email),
      onError: (error) => {
         console.log("Error in resending otp:", error);
      },
   });
};

export const useForgotPassword = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string }>({
      mutationFn: ({ email }) => forgotPasswordDoctor(email),
      onError: (error) => {
         console.log("Error in sending forgot password mail:", error);
      },
   });
};
