// Need to use the React-specific entry point to import createApi
import { baseApi } from '@/redux/baseApi';

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWalletInfo: builder.query({
      query: (walletId) => ({
        url: `/wallet/${walletId}`,
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"]
  }),
})})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWalletInfoQuery } = walletApi;
