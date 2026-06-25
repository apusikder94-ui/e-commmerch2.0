import { BASE_URL } from "@/baseUri/base_Uri";
import { ICreateCategoryResponse, IDeleteCategoryResponse, IGetCategoryResponse, IUpdateCategoryResponse } from "@/type/type";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/category`,
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<ICreateCategoryResponse, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategory: builder.query<IGetCategoryResponse, void>({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      IUpdateCategoryResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<
      IDeleteCategoryResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
