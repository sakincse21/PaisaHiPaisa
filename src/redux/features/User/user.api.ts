// Need to use the React-specific entry point to import createApi
import { baseApi } from '@/redux/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query({
      query: (phoneNo) => ({
        url: `/user/search/${phoneNo}`,
        method: "GET"
      })
  }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload.userId}`,
        method: "PATCH",
        body: payload.body
      })
  }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: `/user/update-password`,
        method: "PATCH",
        body
      })
  }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["USER"]
  }),
  

})})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSearchUserQuery, useLazySearchUserQuery, useUserInfoQuery, useUpdatePasswordMutation , useUpdateProfileMutation } = userApi;
