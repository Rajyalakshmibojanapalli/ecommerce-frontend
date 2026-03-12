import { apiSlice } from "../api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),

    getAllUsers: builder.query({
      query: (params) => ({
        url: "/dashboard/users",
        params,
      }),
      providesTags: ["Users"],
    }),

    toggleUserStatus: builder.mutation({
      query: (id) => ({
        url: `/dashboard/users/${id}/toggle-status`,
        method: "PUT",
      }),
      invalidatesTags: ["Users", "Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} = dashboardApiSlice;