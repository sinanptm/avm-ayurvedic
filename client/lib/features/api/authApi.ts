import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPatient } from "@/types";

export const authApi = createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patient`,
   }),
   endpoints: (builder) => ({
      signIn: builder.mutation<{ patient: IPatient; token: string }, IPatient>({
         query: (credentials) => ({
            url: "/login",
            method: "POST",
            body: credentials,
         }),
      }),
      signUp: builder.mutation<{ message: string }, IPatient>({
         query: (credentials) => ({
            url: "/",
            method: "POST",
            body: credentials,
         }),
      }),
   }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
