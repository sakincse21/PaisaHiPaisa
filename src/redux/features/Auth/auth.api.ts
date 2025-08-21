// Need to use the React-specific entry point to import createApi
import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        body: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["USER"]
  }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout", //yet to implement
        method: "POST",
        // body: userInfo,
      }),
      invalidatesTags: ["USER"]
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation, useUserInfoQuery, useRegisterMutation } = authApi;
