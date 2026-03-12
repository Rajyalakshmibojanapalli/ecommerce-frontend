// features/banners/bannerApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: (params) => ({ url: "/banners", params }),
      providesTags: ["Banners"],
    }),
    getAllBanners: builder.query({
      query: () => "/banners/all",
      providesTags: ["Banners"],
    }),
    createBanner: builder.mutation({
      query: (data) => ({ url: "/banners", method: "POST", body: data }),
      invalidatesTags: ["Banners"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/banners/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({ url: `/banners/${id}`, method: "DELETE" }),
      invalidatesTags: ["Banners"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice;