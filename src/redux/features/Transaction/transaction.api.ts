// Need to use the React-specific entry point to import createApi
import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allTransactions: builder.query({
      query: (params) => ({
        url: "/transaction",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTIONS"]
  }),
    addMoney: builder.mutation({
      query: (transaction) => ({
        url: "/transaction/add-money",
        method: "POST",
        body: transaction,
      }),
      // invalidatesTags: ["TRANSACTIONS"],
    }),
    addMoneyRequest: builder.mutation({
      query: (payload) => ({
        url: `/transaction/add-money-confirm/${payload.transactionId}`,
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: ["TRANSACTIONS","USER"],
    }),
    sendMoney: builder.mutation({
      query: (transaction) => ({
        url: "/transaction/send-money",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["TRANSACTIONS","USER"],
    }),
    withdrawMoney: builder.mutation({
      query: (transaction) => ({
        url: "/transaction/withdraw",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["TRANSACTIONS","USER"],
    }),
    cashIn: builder.mutation({
      query: (transaction) => ({
        url: "/transaction/cash-in",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["TRANSACTIONS","USER"],
    }),
    summary: builder.query({
      query: () => ({
        url: "/transaction/summary",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["SUMMARY"]
  }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
  useCashInMutation,
  useAddMoneyRequestMutation,
  useAllTransactionsQuery,
  useSummaryQuery
} = transactionApi;
