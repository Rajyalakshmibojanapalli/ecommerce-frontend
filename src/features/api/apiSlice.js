import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  
  baseUrl: import.meta.env.VITE_API_URL ,
  
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
console.log("API URL:", import.meta.env.VITE_API_URL);

// Wrapper: auto logout on 401
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch({ type: "auth/logout" });
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Products",
    "Product",
    "Categories",
    "Cart",
    "Orders",
    "Order",
    "Reviews",
    "Coupons",
    "Dashboard",
    "Wishlist",
    "Addresses",
    "Users",
    "Wishlist",
    "Newsletter",
    "Contacts",
    "Blogs",
    "Pages",
    "Banners",
    "CustomDesigns",
    "Notifications",
    "Search",
    "SearchHistory",
  ],
  endpoints: () => ({}),
});