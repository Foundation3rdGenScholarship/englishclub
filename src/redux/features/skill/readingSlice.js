import { apiSlice } from "../../../api/apiSlice";

export const readingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allReading: builder.query({
      // ✅ Use the correct name
      query: () => ({
        url: `/skills/skill_name=speaking/level=a1`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllReadingQuery } = readingSlice;
