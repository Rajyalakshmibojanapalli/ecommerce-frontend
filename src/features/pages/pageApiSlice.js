// features/pages/pageApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPage: builder.query({
      query: (slug) => `/pages/${slug}`,
      providesTags: (_r, _e, slug) => [{ type: "Pages", id: slug }],
    }),
    getAllPages: builder.query({
      query: () => "/pages",
      providesTags: ["Pages"],
    }),
    createPage: builder.mutation({
      query: (data) => ({ url: "/pages", method: "POST", body: data }),
      invalidatesTags: ["Pages"],
    }),
    updatePage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/pages/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pages"],
    }),
    deletePage: builder.mutation({
      query: (id) => ({ url: `/pages/admin/${id}`, method: "DELETE" }),
      invalidatesTags: ["Pages"],
    }),
  }),
});

export const {
  useGetPageQuery,
  useGetAllPagesQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
} = pageApiSlice;