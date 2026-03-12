// features/wishlist/wishlistApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation({
      query: () => ({ url: "/wishlist", method: "DELETE" }),
      invalidatesTags: ["Wishlist"],
    }),
    moveToCart: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}/move-to-cart`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist", "Cart"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useMoveToCartMutation,
} = wishlistApiSlice;