// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice.js"; // RTK Query API slice for skill reading
import { userApi } from "../verify/userApi.js"; // RTK Query API service for user
import themeReducer from "../redux/features/button/themeSlice"; // Theme slice
import sidebarReducer from "../redux/features/user/sidebarSlice"; // Sidebar slice
import visibilitySlice from "../redux/features/user/visibilitySlice.js"; // Visibility slice
import { exerciseApi } from "../redux/features/exercises/exercisesSlice.js"; // RTK Query API service for exercises
import authReducer from "../redux/features/user/authSlice.js"; // Auth slice
import { api } from "../redux/features/user/userSlice.js";
// Configure the Redux store
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer, // Sidebar state
    theme: themeReducer, // Theme state
    visibility: visibilitySlice, // Visibility state
    auth: authReducer, // Authentication state
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API slice for skill reading
    [userApi.reducerPath]: userApi.reducer, // RTK Query API slice for user
    [exerciseApi.reducerPath]: exerciseApi.reducer, // RTK Query API slice for exercises
    [api.reducerPath]: api.reducer, // Redux Query API reducer
  },

  // Add middleware for RTK Query APIs
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware, // Middleware for skill reading API
      userApi.middleware, // Middleware for user API
      exerciseApi.middleware, // Middleware for exercises API
      api.middleware
    ),
});

// Enable RTK Query listeners for refetching data on focus or reconnect
setupListeners(store.dispatch);
