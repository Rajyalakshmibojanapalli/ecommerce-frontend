// features/customDesign/customDesignApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const customDesignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDesignPrices: builder.query({
      query: () => "/custom-designs/prices",
    }),
    getMyDesigns: builder.query({
      query: (params) => ({ url: "/custom-designs", params }),
      providesTags: ["CustomDesigns"],
    }),
    getDesign: builder.query({
      query: (id) => `/custom-designs/${id}`,
      providesTags: (_r, _e, id) => [{ type: "CustomDesigns", id }],
    }),
    createDesign: builder.mutation({
      query: (data) => ({
        url: "/custom-designs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomDesigns"],
    }),
    updateDesign: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/custom-designs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomDesigns"],
    }),
    submitDesign: builder.mutation({
      query: (id) => ({
        url: `/custom-designs/${id}/submit`,
        method: "POST",
      }),
      invalidatesTags: ["CustomDesigns"],
    }),
    deleteDesign: builder.mutation({
      query: (id) => ({
        url: `/custom-designs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomDesigns"],
    }),
    // admin
    getAllDesigns: builder.query({
      query: (params) => ({ url: "/custom-designs/admin/all", params }),
      providesTags: ["CustomDesigns"],
    }),
    updateDesignStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/custom-designs/admin/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomDesigns"],
    }),
  }),
});

export const {
  useGetDesignPricesQuery,
  useGetMyDesignsQuery,
  useGetDesignQuery,
  useCreateDesignMutation,
  useUpdateDesignMutation,
  useSubmitDesignMutation,
  useDeleteDesignMutation,
  useGetAllDesignsQuery,
  useUpdateDesignStatusMutation,
} = customDesignApiSlice;