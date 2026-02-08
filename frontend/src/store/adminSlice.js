import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestedAdminURL } from "../utils.js";
import jscookie from 'js-cookie';
import axios from "axios";

const adminTokenData = jscookie.get("adminTokenData");

const initialState = {
    loggedInEmail: '',
    adminObj: {},
    participantArray: [],
    tournamentArray: [],
    organizerArray: [],
    status: '',
    message: ''
};

/* ================= ADMIN LOGIN ================= */
const adminLoginThunk = createAsyncThunk(
    'adminSlice/adminLoginThunk',
    async (adminObj) => {
        try {
            const result = await axios.post(
                requestedAdminURL + '/loginAdmin',
                adminObj
            );

            jscookie.set("adminTokenData", result.data.adminToken, { expires: 1 });
            jscookie.set("adminEmail", result.data.email, { expires: 1 });

            return result;
        } catch (error) {
            console.log("Error in adminLoginThunk : ", error);
        }
    }
);

/* ================= VIEW ORGANIZER LIST ================= */
const adminViewOrganizerListThunk = createAsyncThunk(
    'adminSlice/adminViewOrganizerListThunk',
    async () => {
        try {
            const result = await axios.get(
                requestedAdminURL +
                '/adminViewOrganizerList?adminTokenData=' +
                adminTokenData
            );
            return result;
        } catch (error) {
            console.log("Error in adminViewOrganizerListThunk : ", error);
        }
    }
);

/* ================= VERIFY ORGANIZER ================= */
const adminVerifyOrganizerThunk = createAsyncThunk(
    'adminSlice/adminVerifyOrganizerThunk',
    async (organizerEmailObj) => {
        try {
            const result = await axios.post(
                requestedAdminURL +
                '/adminVerifyOrganizer?adminTokenData=' +
                adminTokenData,
                organizerEmailObj
            );
            return result;
        } catch (error) {
            console.log("Error in adminVerifyOrganizerThunk : ", error);
        }
    }
);

const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        /* ===== LOGIN ===== */
        builder
            .addCase(adminLoginThunk.pending, (state) => {})
            .addCase(adminLoginThunk.fulfilled, (state, action) => {
                if (action.payload === undefined) {
                    state.status = 500;
                }
                if (action.payload?.status === 200) {
                    state.loggedInEmail = action.payload.data.email;
                    state.status = action.payload.status;
                }
            })
            .addCase(adminLoginThunk.rejected, (state) => {});

        /* ===== VIEW ORGANIZERS ===== */
        builder
            .addCase(adminViewOrganizerListThunk.pending, (state) => {})
            .addCase(adminViewOrganizerListThunk.fulfilled, (state, action) => {
                if (action.payload === undefined) {
                    state.status = 500;
                }
                if (action.payload?.status === 200) {
                    state.loggedInEmail = action.payload.data.email;
                    state.organizerArray = action.payload.data.organizerList;
                    state.status = action.payload.status;
                }
            })
            .addCase(adminViewOrganizerListThunk.rejected, (state) => {});

        /* ===== VERIFY ORGANIZER ===== */
        builder
            .addCase(adminVerifyOrganizerThunk.pending, (state) => {})
            .addCase(adminVerifyOrganizerThunk.fulfilled, (state, action) => {
                if (action.payload === undefined) {
                    state.status = 500;
                }
                if (action.payload?.status === 200) {
                    state.loggedInEmail = action.payload.data.email;
                    state.organizerArray = action.payload.data.organizerList;
                    state.status = action.payload.status;
                }
            })
            .addCase(adminVerifyOrganizerThunk.rejected, (state) => {});
    }
});

export {
    adminLoginThunk,
    adminViewOrganizerListThunk,
    adminVerifyOrganizerThunk
};

export default adminSlice.reducer;
