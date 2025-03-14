import { apiSlice } from "../../../api/apiSlice";

export const writingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allWriting: builder.query({
      query: () => ({
        url: `/skills/writing`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllWritingQuery } = writingSlice;
