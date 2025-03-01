import { apiSlice } from "../../../api/apiSlice";

export const readingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allReading: builder.query({
      query: () => `/skills/skill_name=reading/level=a1`,
      transformResponse: (response) => response.payload,
    }),
  }),
});

export const { useAllReadingQuery } = readingSlice;
