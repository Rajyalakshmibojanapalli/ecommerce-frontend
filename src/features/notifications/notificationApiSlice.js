// features/notifications/notificationApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({ url: "/notifications", params }),
      providesTags: ["Notifications"],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notifications/read-all",
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
    clearAllNotifications: builder.mutation({
      query: () => ({ url: "/notifications", method: "DELETE" }),
      invalidatesTags: ["Notifications"],
    }),
    broadcastNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/admin/broadcast",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
  useBroadcastNotificationMutation,
} = notificationApiSlice;