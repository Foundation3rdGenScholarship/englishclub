import { apiSlice } from "../../../api/apiSlice";

export const skillSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSkill: builder.query({
      query: () => `/skills/`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReading: builder.query({
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
  }),
});

export const {
  useAllSkillQuery,
  useAllReadingQuery,
  useAllReadingA2QueryQuery,
  useAllReadingB1QueryQuery,
  useAllReadingB2QueryQuery,
} = skillSlice;
