import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  activeMenus: {}, // Used for active menu toggling
};

const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isVisible = !state.isVisible;
    },
    closeMainSidebar: (state) => {
      state.isMainSidebarVisible = false;
    },
  },
});

export const { toggle, closeMainSidebar } = visibilitySlice.actions;
export default visibilitySlice.reducer;
