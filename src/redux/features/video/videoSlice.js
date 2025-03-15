import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videoIds: [
      "aMWT9aEShWs",
      "OW0uuGfpvUE",
      "B6kryr_WIaY",
      "cWmGqByYEus",
      "henIVlCPVIY",
      "tLULIzOj-Ew",
      "axYAW7PuSIM",
      "2cpd1fsUQ1I",
      "Y3FDMiKZ7zo",
      "cSe5mwiXPT0",
      "jNI0fiX4q4A",
      "hSg1eZcqMio",
      "Ff5FUoo2YZA",
      "juKd26qkNAw",
      "yrgmbnotrGg",
      "tGdtrWxt0bc",
      "TbmSCdn_iUo",
      "dBVIlxbyBLk",
      "VbBlcO9el9Q",
      "-XCQTNMU0J8",
      "4YyANSrNatk",
      "ucz1R1WnnmQ",
      "LDkvRFCm8No",
      "0Okxsszt624",
      "4s7rlRkwC0U",
      "oN0AjvmVZkc",
      "C_nLt9l74ZY",
      "jgdMLSkJqVI",
      "lyGJU5Xv8Cg",
      "ZYCZ-fD44E0",
      "QXVzmzhxWWc",
      "VXI4l9Tivq0",
      "72A1WYR-Mtc",
      "bEB8-SWMYhI",
      "xSF0LVjn2XM?",
      "lotOsFYpmDc",
      "fFz5gn3zgX4",
      "tLULIzOj-Ew",
      "lzhb451beU0",
      "dh0uz3IKhwc",
      "2fTTKZvzyYE",
      "ZdE7brIbs4U",
      "X627czLUsGY",
      "h0On8w8x_Yo",
      "Gtu-2r3wiPc",
      "yb9Iag9a07U",
      "WPV30RsIM5o",
      "_KYln3kIfP8",
      "P6FORpg0KVo",
      "iRUWzeEGI44",
      
    ], // Initial video IDs
  },
  reducers: {
    setVideoIds: (state, action) => {
      state.videoIds = action.payload;
    },
  },
});

export const { setVideoIds } = videoSlice.actions;
export default videoSlice.reducer;
