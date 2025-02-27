import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/features/user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice.js";
// import skillSlice from "./features/skill/skillSlice";
// import skillnamelevel from "./skillnamelevel/skillnamelevel";
// import lessondetailSlice from "./features/lessondetail/lessondetailSlice";
// import submitsSlice from "../redux/features/submit/submitSlice";
import { verifyUserSlice } from "../verify/verifyUserSlice";
import themeReducer from "../redux/features/button/themeSlice";
//import visibilityReducer from "../redux/features/user/visibilitySlice"; // this is a visibil reducer for toggle theme

import sidebarReducer from "../redux/features/user/sidebarSlice.js";
// import grammarSllice from "./features/grammar/grammarSllice";
// import LessonsSlice from "./features/lessons/LessonsSlice";
// import vocabularySlice from "./features/vocabulary/vocabularySlice";
// import resubmitSlice from "./features/resubmit/reSumitSlice";
// import SearchSlide from "./features/search/SearchSlide";
// import exerciseSlice from "./features/exerciseSubmit/exerciseSubmitSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    // skill: skillSlice,
    // skillNameLevel: skillnamelevel,
    // excersice: lessondetailSlice,
    // submits: submitsSlice,
    userVerify: verifyUserSlice,
    sidebar: sidebarReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // use for RTK query about skill reading
    // visibility: visibilityReducer,
    // visibilitySkill: visibilityReducer,
    // visibilityGrammar: visibilityReducer,
    // sidebar: visibilityReducer,
    // grammar: grammarSllice,
    // lesson: LessonsSlice,
    // vocabluary: vocabularySlice,
    // resubmit: resubmitSlice,
    // search: SearchSlide,
    // exercise: exerciseSlice,
    // vocabulary : vocabularySlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
