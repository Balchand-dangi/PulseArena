import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Controls which navigation menu is active
    // Example: home, tournaments, participant, organizer, admin
    navShow: "home"
};

const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {
        setNavShow: (state, action) => {
            state.navShow = action.payload;
        }
    }
});

export const { setNavShow } = commonSlice.actions;
export default commonSlice.reducer;
