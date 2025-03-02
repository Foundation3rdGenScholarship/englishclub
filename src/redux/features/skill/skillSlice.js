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
  }),
});

export const { useAllSkillQuery, useAllReadingQuery } = skillSlice;
