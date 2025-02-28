// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice.js";
import { api } from "../redux/features/user/userSlice"; // Redux Query API service
import themeReducer from "../redux/features/button/themeSlice"; // Correct path to themeSlice
import sidebarReducer from "../redux/features/user/sidebarSlice"; // Correct path to sidebarSlice
import { toggle } from "../redux/features/user/visibilitySlice.js";
import visibilitySlice from "../redux/features/user/visibilitySlice.js";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    visibility: visibilitySlice,
    [apiSlice.reducerPath]: apiSlice.reducer, // use for RTK query about skill reading
    [api.reducerPath]: api.reducer, // Redux Query API reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, api.middleware), // Add Redux Query middleware
});

setupListeners(store.dispatch);
