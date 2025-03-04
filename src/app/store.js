// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice.js";
import { userApi } from "../verify/userApi.js";
import themeReducer from "../redux/features/button/themeSlice";
import sidebarReducer from "../redux/features/user/sidebarSlice";
import visibilitySlice from "../redux/features/user/visibilitySlice.js";
import { exerciseApi } from "../redux/features/exercises/exercisesSlice.js";
import authReducer from "../redux/features/user/authSlice.js";
import { api } from "../redux/features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    visibility: visibilitySlice,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        apiSlice.middleware,
        userApi.middleware,
        exerciseApi.middleware,
        api.middleware
      ),
});

setupListeners(store.dispatch);