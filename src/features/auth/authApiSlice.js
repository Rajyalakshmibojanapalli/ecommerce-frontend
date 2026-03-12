import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // Logout
    logoutApi: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Get current user
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // Update profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update avatar
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: "/users/avatar",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    // Get addresses
    getAddresses: builder.query({
      query: () => "/users/addresses",
      providesTags: ["Addresses"],
    }),

    // Add address
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/users/addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    // Update address
    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    // Delete address
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/users/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),

    // Get wishlist
    getWishlist: builder.query({
      query: () => "/users/wishlist",
      providesTags: ["Wishlist"],
    }),

    // Toggle wishlist
    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: `/users/wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutApiMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useChangePasswordMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useGetWishlistQuery,
  useToggleWishlistMutation,
} = authApiSlice;