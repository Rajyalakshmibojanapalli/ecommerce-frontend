// features/search/searchApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query({
      query: (params) => ({ url: "/search", params }),
    }),
    getSuggestions: builder.query({
      query: (q) => ({ url: "/search/suggestions", params: { q } }),
    }),
    getTrending: builder.query({
      query: () => "/search/trending",
      providesTags: ["Search"],
    }),
    getSearchHistory: builder.query({
      query: () => "/search/history",
      providesTags: ["SearchHistory"],
    }),
    clearSearchHistory: builder.mutation({
      query: () => ({ url: "/search/history", method: "DELETE" }),
      invalidatesTags: ["SearchHistory"],
    }),
  }),
});

export const {
  useGlobalSearchQuery,
  useLazyGlobalSearchQuery,
  useGetSuggestionsQuery,
  useLazyGetSuggestionsQuery,
  useGetTrendingQuery,
  useGetSearchHistoryQuery,
  useClearSearchHistoryMutation,
} = searchApiSlice;