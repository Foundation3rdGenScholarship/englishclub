import { apiSlice } from "../../../api/apiSlice";

export const speakingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
	allSpeaking: builder.query({
	  query: () => ({
		url: `/skills/speaking`,
		method: "GET",
	  }),
	}),
  }),
});

export const { useAllSpeakingQuery } = speakingSlice;