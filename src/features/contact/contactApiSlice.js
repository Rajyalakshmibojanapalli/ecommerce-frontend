// features/contact/contactApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
    getContacts: builder.query({
      query: (params) => ({ url: "/contact", params }),
      providesTags: ["Contacts"],
    }),
    getContact: builder.query({
      query: (id) => `/contact/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Contacts", id }],
    }),
    updateContact: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({ url: `/contact/${id}`, method: "DELETE" }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useSubmitContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;