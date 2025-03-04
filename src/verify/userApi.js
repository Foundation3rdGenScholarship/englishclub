import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../lib/secureLocalStorage";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserData: builder.query({
      query: () => "/users/me", // ✅ Fix: No token in URL
      transformResponse: (response) => response.payload,
    }),
    updateUserInfo: builder.mutation({
      query: ({ user_uuid, user_name, profile, bio }) => ({
        url: "/users/update",
        method: "POST",
        body: { user_uuid, user_name, profile, bio },
      }),
    }),
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/files",
        method: "POST",
        body: file, // FormData should be passed directly
        headers: {
          "Content-Type": "multipart/form-data", // RTK Query handles the multipart content type
          Authorization: `Bearer ${getAccessToken()}`, // Include the access token
        },
      }),
    }),
  }),
});

export const {
  useFetchUserDataQuery,
  useUpdateUserInfoMutation,
  useUploadFileMutation,
} = userApi;
