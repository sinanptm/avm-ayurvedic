import { ErrorResponse, IPatient, MessageResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import {
   forgetPassword,
   oAuthSignin,
   resendOtpPatient,
   signInPatient,
   signUpPatient,
   updatePassword,
   validateOtpPatient,
   logoutPatient,
} from "@/lib/api/patient/authenticationRoutes";
import { AxiosError } from "axios";

export const useSignUpPatient = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, IPatient>({
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
         if (error.response?.status === 403) {
            return "Patient is Blocked";
         }
      },
   });
};

export const useOAuthSigninPatient = () => {
   return useMutation<
      { accessToken: string },
      AxiosError<ErrorResponse>,
      { email: string; name: string; profile?: string }
   >({
      mutationFn: ({ email, name, profile }) => oAuthSignin(email, name, profile),
      onError: (error) => {
         console.log("Error in OAuthSign :", error);
         if (error.response?.status === 403) {
            return "Patient is Blocked";
         }
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

export const useLogoutMutation = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, null>({
      mutationFn: logoutPatient,
      onError: (error) => {
         console.log("Error in Logout", error);
      },
   });
};

export const useResendOtp = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string }>({
      mutationFn: ({ email }) => resendOtpPatient(email),
      onError: (error) => {
         console.log("Error in resending otp", error);
      },
   });
};

export const useForgetPassword = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string }>({
      mutationFn: ({ email }) => forgetPassword(email),
      onError: (error) => {
         console.log("Error in Sending Reset Mail", error);
      },
   });
};

export const useUpdatePassword = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string; newPassword: string }>({
      mutationFn: ({ email, newPassword }) => updatePassword(email, newPassword),
      onError: (error) => {
         console.log("Error in Updating Password", error);
      },
   });
};
