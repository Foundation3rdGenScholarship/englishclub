import { apiSlice } from "../../../api/apiSlice";

export const listeningSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allListening: builder.query({
      query: () => ({
        url: `/skills/listening`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllListeningQuery } = listeningSlice;
