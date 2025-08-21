// Need to use the React-specific entry point to import createApi
import { baseApi } from '@/redux/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allTransactions: builder.query({
      query: () => ({
        url: "/transaction",
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"]
  }),
})})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllTransactionsQuery } = userApi;
