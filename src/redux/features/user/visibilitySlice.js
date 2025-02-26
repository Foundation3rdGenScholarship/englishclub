import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  activeMenus: {}, // Used for active menu toggling
};

const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    show: (state) => {
      state.isVisible = true;
    },
    hide: (state) => {
      state.isVisible = false;
    },
    toggle: (state) => {
      state.isVisible = !state.isVisible;
    },
    toggleMenu: (state, action) => {
      const id = action.payload;
      state.activeMenus[id] = !state.activeMenus[id]; // Toggle specific menu
    },
  },
});

export const { show, hide, toggle, toggleMenu } = visibilitySlice.actions;
export default visibilitySlice.reducer;
