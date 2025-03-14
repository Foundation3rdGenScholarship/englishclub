import { apiSlice } from "../../../api/apiSlice";

export const readingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
	allReading: builder.query({
	  query: () => ({
		url: `/skills/reading`,
		method: "GET",
	  }),
	}),
  }),
});

export const { useAllReadingQuery } = readingSlice;