// features/newsletter/newsletterApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const newsletterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
    }),
    unsubscribe: builder.mutation({
      query: (data) => ({
        url: "/newsletter/unsubscribe",
        method: "POST",
        body: data,
      }),
    }),
    getSubscribers: builder.query({
      query: (params) => ({ url: "/newsletter", params }),
      providesTags: ["Newsletter"],
    }),
    deleteSubscriber: builder.mutation({
      query: (id) => ({ url: `/newsletter/${id}`, method: "DELETE" }),
      invalidatesTags: ["Newsletter"],
    }),
  }),
});

export const {
  useSubscribeMutation,
  useUnsubscribeMutation,
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
} = newsletterApiSlice;