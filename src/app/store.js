// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../redux/features/user/userSlice"; // Redux Query API service
import themeReducer from "../redux/features/button/themeSlice"; // Correct path to themeSlice
import sidebarReducer from "../redux/features/user/sidebarSlice"; // Correct path to sidebarSlice

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Redux Query API reducer
    theme: themeReducer, // Theme slice reducer
    sidebar: sidebarReducer, // Sidebar slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add Redux Query middleware
});
