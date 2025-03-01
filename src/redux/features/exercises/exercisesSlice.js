import { apiSlice } from "../../../api/apiSlice"; // Import your apiSlice where baseQuery is defined

export const exercisesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch exercise data by ex_uuid
    exerciseDetails: builder.query({
      query: (ex_uuid) => `/exercises/${ex_uuid}`, // Use dynamic URL
      transformResponse: (response) => response.payload, // Transform the response if necessary
    }),
  }),
});

export const { useExerciseDetailsQuery } = exercisesSlice; // Export the hook for the `exerciseDetails` query
