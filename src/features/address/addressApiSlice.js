// features/address/addressApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => "/addresses",
      providesTags: ["Addresses"],
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
    setDefaultAddress: builder.mutation({
      query: (id) => ({
        url: `/addresses/${id}/default`,
        method: "PUT",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApiSlice;