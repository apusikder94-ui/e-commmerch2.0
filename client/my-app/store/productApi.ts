import { BASE_URL } from "@/baseUri/base_Uri";
import { ICreateProductResponse, IGetProductResponse } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/product`,
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // ================= CREATE PRODUCT =================
    createProduct: builder.mutation<ICreateProductResponse, FormData>({
      query: (formData: FormData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // ================= GET ALL PRODUCTS =================
    getAllProducts: builder.query<IGetProductResponse, void>({
      query: () => "/all",
      providesTags: ["Product"],
    }),
    // ================= GET ALL PRODUCTS BY CATEGORY =================
    getAllProductsBYCategory: builder.query<IGetProductResponse, { slug: string }>({
      query: ({ slug }) => `/category/${slug}`,
      providesTags: ["Product"],
    }),

    // ================= GET SINGLE PRODUCT =================
    getSingleProduct: builder.query<any, { slug: string }>({
      query: ({ slug }) => `/single/${slug}`,
      providesTags: ["Product"],
    }),
    // ================= GET SEARCH PRODUCT =================
    searchProduct: builder.query<any, { query: string }>({
      query: ({ query }) => ({
        url: `/search?q=${query}`,
        method: "GET",
      }),
    }),

    // ================= UPDATE PRODUCT =================
    updateProduct: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // ================= DELETE PRODUCT =================
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
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
  useGetAllProductsBYCategoryQuery,
  useSearchProductQuery
} = productApi;
