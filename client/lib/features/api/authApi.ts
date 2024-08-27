import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPatient } from "@/types";

interface SignInResponse {
   message: string;
   email: string;
}

interface SignUpResponse {
   message: string;
}

export const authApi = createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patient`,
   }),
   endpoints: (builder) => ({
      signIn: builder.mutation<SignInResponse, {email:string,password:string}>({
         query: (credentials) => ({
            url: "/login",
            method: "POST",
            body: credentials,
         }),
      }),
      signUp: builder.mutation<SignUpResponse, IPatient>({
         query: (credentials) => ({
            url: "/",
            method: "POST",
            body: credentials,
         }),
      }),
      verifyOtp: builder.mutation<IPatient, { otp: number; email: string }>({
         query: (credentials) => ({
            url: "/otp-verification",
            method: "POST",
            body: credentials,
         }),
      }),
   }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyOtpMutation } = authApi;
