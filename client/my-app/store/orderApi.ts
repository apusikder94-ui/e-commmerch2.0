import { BASE_URL } from "@/baseUri/base_Uri";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orderApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1`,
        credentials: "include",
    }),

    tagTypes: ["Order"],

    endpoints: (builder) => ({

        getAllOrders: builder.query<any, void>({
            query: () => ({
                url: "/order/all",
                method: "GET",
            }),

            providesTags: ["Order"],
        }),
        getAllOrdersUser: builder.query<any, void>({
            query: () => ({
                url: "/order/userAll",
                method: "GET",
            }),

            providesTags: ["Order"],
        }),
        updateOrders: builder.mutation<any, { id: string, orderStatus: string }>({
            query: ({ id, orderStatus }) => ({
                url: `/order/update/${id}`,
                method: "PUT",
                body: { orderStatus }
            }),

            invalidatesTags: ["Order"],
        }),
        deleteOrders: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/order/delete/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Order"],
        }),

    }),
});


export const {
    useGetAllOrdersQuery,
    useDeleteOrdersMutation,
    useUpdateOrdersMutation,
    useGetAllOrdersUserQuery
} = orderApi;