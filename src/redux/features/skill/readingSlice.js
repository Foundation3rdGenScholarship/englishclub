import { apiSlice } from "../../../api/apiSlice";

export const readingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allReading: builder.query({
      // ✅ Use the correct name
      query: () => ({
        url: `/skills/reading`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllReadingQuery } = readingSlice;
// ❌ This is incorrect because "allReading" is the correct name
