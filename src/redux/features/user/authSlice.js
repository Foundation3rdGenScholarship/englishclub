import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoginIn: false,
    user: null, // Add user state
  },
  reducers: {
    login: (state, action) => {
      state.isLoginIn = true;
      state.user = action.payload; // Set user data when logging in
    },
    logout: (state) => {
      state.isLoginIn = false;
      state.user = null; // Clear user data when logging out
    },
  },
});

export const { login, logout } = authSlice.actions;

// Selectors
export const selectIsLoginIn = (state) => state.auth.isLoginIn;
export const selectUser = (state) => state.auth.user; // Add selector for user

export default authSlice.reducer;
