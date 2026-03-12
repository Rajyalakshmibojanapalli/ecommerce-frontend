// features/blog/blogApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params) => ({ url: "/blogs", params }),
      providesTags: ["Blogs"],
    }),
    getBlog: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (_r, _e, slug) => [{ type: "Blogs", id: slug }],
    }),
    createBlog: builder.mutation({
      query: (data) => ({ url: "/blogs", method: "POST", body: data }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({ url: `/blogs/${id}`, method: "DELETE" }),
      invalidatesTags: ["Blogs"],
    }),
    likeBlog: builder.mutation({
      query: (id) => ({ url: `/blogs/${id}/like`, method: "POST" }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLikeBlogMutation,
} = blogApiSlice;