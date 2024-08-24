import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, LoginResponse } from "@/types/auth";

export const authApi = createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_NODE_SERVER_URL}/api`,
   }),
   endpoints: builder => ({
      login: builder.mutation<LoginResponse, LoginCredentials>({
         query: credentials => ({
            url: "/login",
            method: "POST",
            body: credentials,
         }),
      }),
   }),
});

export const { useLoginMutation } = authApi;
