import { BASE_URL } from "@/baseUri/base_Uri";
import {
  IGetAllUserResposne,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
  IUser,
} from "@/type/type";

import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth`,
    credentials: "include",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"]
    }),

    signIn: builder.mutation<ISignInResponse, ISignUpRequest>({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"]
    }),

    allUser: builder.query<IGetAllUserResposne, void>({
      query: () => "/all",

      providesTags: ["User"],
    }),
    profile: builder.query<any, void>({
      query: () => "/profile",

      providesTags: ["User"],
    }),

    createUser: builder.mutation<IUser, FormData>({
      query: (data) => ({
        url: "/createUser",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      invalidatesTags: ["User"],
    }),


    updateUser: builder.mutation<IUser, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { role },
      }),

      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),
  }),
});


export const {
  useSignUpMutation,
  useSignInMutation,
  useAllUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useProfileQuery,
  useLogoutMutation
} = authApi;