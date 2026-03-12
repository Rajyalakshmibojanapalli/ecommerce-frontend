import { apiSlice } from "../api/apiSlice";

export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRazorpayKey: builder.query({
      query: () => "/payments/key",
    }),

    createRazorpayOrder: builder.mutation({
      query: (data) => ({
        url: "/payments/create-order",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetRazorpayKeyQuery,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} = paymentsApiSlice;