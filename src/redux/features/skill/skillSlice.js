import { apiSlice } from "../../../api/apiSlice";

export const skillSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSkill: builder.query({
      query: () => `/skills/`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    // TODO reading
    allReadingA1Query: builder.query({
      query: () => `/skills/skill_name=reading/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReadingA2Query: builder.query({
      query: () => `/skills/skill_name=reading/level=a2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReadingB1Query: builder.query({
      query: () => `/skills/skill_name=reading/level=b1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReadingB2Query: builder.query({
      query: () => `/skills/skill_name=reading/level=b2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    // TODO listening
    allListeningA1Query: builder.query({
      query: () => `/skills/skill_name=listening/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningA2Query: builder.query({
      query: () => `/skills/skill_name=listening/level=a2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningB1Query: builder.query({
      query: () => `/skills/skill_name=listening/level=b1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningB2Query: builder.query({
      query: () => `/skills/skill_name=listening/level=b2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningC1Query: builder.query({
      query: () => `/skills/skill_name=listening/level=c1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    // TODO writing
    allWritingA1Query: builder.query({
      query: () => `/skills/skill_name=writing/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allWritingA2Query: builder.query({
      query: () => `/skills/skill_name=writing/level=a2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allWritingB1Query: builder.query({
      query: () => `/skills/skill_name=writing/level=b1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allWritingB2Query: builder.query({
      query: () => `/skills/skill_name=writing/level=b2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allWritingC1Query: builder.query({
      query: () => `/skills/skill_name=writing/level=c1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    // TODO speaking
    allSpeakingA1Query: builder.query({
      query: () => `/skills/skill_name=speaking/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allSpeakingA2Query: builder.query({
      query: () => `/skills/skill_name=speaking/level=a2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allSpeakingB1Query: builder.query({
      query: () => `/skills/skill_name=speaking/level=b1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allSpeakingB2Query: builder.query({
      query: () => `/skills/skill_name=speaking/level=b2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allSpeakingC1Query: builder.query({
      query: () => `/skills/skill_name=speaking/level=c1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
  }),
});

export const {
  useAllSkillQuery,
  // Reading
  useAllReadingA1QueryQuery,
  useAllReadingA2QueryQuery,
  useAllReadingB1QueryQuery,
  useAllReadingB2QueryQuery,
  // Listening
  useAllListeningA1QueryQuery,
  useAllListeningA2QueryQuery,
  useAllListeningB1QueryQuery,
  useAllListeningB2QueryQuery,
  useAllListeningC1QueryQuery,
  // Writing
  useAllWritingA1QueryQuery,
  useAllWritingA2QueryQuery,
  useAllWritingB1QueryQuery,
  useAllWritingB2QueryQuery,
  useAllWritingC1QueryQuery,
  // speaking
  useAllSpeakingA1QueryQuery,
  useAllSpeakingA2QueryQuery,
  useAllSpeakingB1QueryQuery,
  useAllSpeakingB2QueryQuery,
  useAllSpeakingC1QueryQuery,
} = skillSlice;
