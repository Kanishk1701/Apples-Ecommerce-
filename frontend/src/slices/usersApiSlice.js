import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    // NEW: Register Logic
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // POST to /api/users
        method: 'POST',
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyMutation, useProfileMutation } = usersApiSlice