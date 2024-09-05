import { signinAdmin, resendOptAdmin, validateOtpAdmin, logoutAdmin } from "@/lib/api/admin/authenticationRoutes";
import { ErrorResponse, MessageResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSigninAdmin = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string; password: string }>({
      mutationFn: ({ email, password }) => signinAdmin(email, password),
      onError: (error) => {
         console.log("error in signin", error);
      },
   });
};

export const useVerifyOtpAdmin = () => {
   return useMutation<{ accessToken: string }, AxiosError<ErrorResponse>, { email: string; otp: number }>({
      mutationFn: ({ email, otp }) => validateOtpAdmin(email, otp),
      onError: (error) => {
         console.log("error in otp verification", error);
      },
   });
};

export const useResendOtpAdmin = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { email: string }>({
      mutationFn: ({ email }) => resendOptAdmin(email),
      onError: (error) => {
         console.log("error in resending otp", error);
      },
   });
};

export const useLogoutAdmin = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>,null>({
      mutationFn: logoutAdmin,
      onError: (error) => {
         console.log("Error in Logout Admin ", error);
      },
   });
};
