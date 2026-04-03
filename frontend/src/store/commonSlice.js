import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navShow: "home" // home | participant | organizer | admin
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setNavShow: (state, action) => {
      state.navShow = action.payload;
    }
  }
});

export const { setNavShow } = commonSlice.actions;
export default commonSlice.reducer;