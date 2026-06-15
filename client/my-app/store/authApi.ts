import { ISignInResponse, ISignUpRequest, ISignUpResponse } from "@/type/type";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation<ISignInResponse,ISignUpRequest>({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
