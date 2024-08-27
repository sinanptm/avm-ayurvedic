import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInCredentials, SignInResponse, SignUpResponse } from "@/types/auth";
import { IPatient } from "@/types";

export const authApi = createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patient`,
   }),
   endpoints: (builder) => ({
      signIn: builder.mutation<SignInResponse, SignInCredentials>({
         query: (credentials) => ({
            url: "/signin",
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
   }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
