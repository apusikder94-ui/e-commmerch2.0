import { ICreateProductResponse, IGetProductResponse } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // ================= CREATE PRODUCT =================
    createProduct: builder.mutation<ICreateProductResponse, FormData>({
      query: (formData: FormData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // ================= GET ALL PRODUCTS =================
    getAllProducts: builder.query<IGetProductResponse, void>({
      query: () => "/product/all",
      providesTags: ["Product"],
    }),

    // ================= GET SINGLE PRODUCT =================
    getSingleProduct: builder.query({
      query: (id: string) => `/product/single/${id}`,
      providesTags: ["Product"],
    }),

    // ================= UPDATE PRODUCT =================
    updateProduct: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // ================= DELETE PRODUCT =================
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// hooks export
export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
