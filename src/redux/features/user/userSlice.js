// src/services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (email) => ({
        url: "/request/reset-password",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/request/reset-password/otp-verify",
        method: "POST",
        body: { email, otp },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, new_password, confirm_password }) => ({
        url: "/reset-password",
        method: "POST",
        body: { email, new_password, confirm_password },
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({ user_uuid, token, user_name, profile, bio }) => ({
        url: `/users/${user_uuid}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { user_name, profile, bio },
      }),
    }),
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/files",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useUpdateUserInfoMutation,
  useUploadFileMutation,
} = api;
