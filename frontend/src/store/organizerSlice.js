import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jscookie from "js-cookie";
import { requestedOrganizerURL } from "../utils.js";

const initialState = {
loggedInEmail: "",
organizerObj: {},
organizerArray: [],
tournamentArray: [],
status: "",
message: ""
};

/* ================= TOURNAMENT LIST ================= */
export const organizerTournamentListThunk = createAsyncThunk(
"organizerSlice/organizerTournamentListThunk",
async () => {
try {
const token = jscookie.get("organizerTokenData");


  const result = await axios.get(
    requestedOrganizerURL +
      "/organizerTournamentList?organizerTokenData=" +
      token
  );

  return result.data; // ✅ ONLY DATA
} catch (error) {
  console.log("Error in organizerTournamentListThunk:", error);
  throw error;
}


}
);

/* ================= ACCEPT / MANAGE TOURNAMENT ================= */
export const organizerAcceptTournamentThunk = createAsyncThunk(
"organizerSlice/organizerAcceptTournamentThunk",
async (tournamentIdObj) => {
try {
const token = jscookie.get("organizerTokenData");


  const result = await axios.post(
    requestedOrganizerURL +
      "/organizerAcceptTournament?organizerTokenData=" +
      token,
    tournamentIdObj
  );

  return result.data; // ✅ ONLY DATA
} catch (error) {
  console.log("Error in organizerAcceptTournamentThunk:", error);
  throw error;
}


}
);

/* ================= ORGANIZER LOGIN ================= */
export const organizerLoginThunk = createAsyncThunk(
"organizer/login",
async (data, { rejectWithValue }) => {
try {
const res = await axios.post(
requestedOrganizerURL + "/loginOrganizer",
data
);


  jscookie.set("organizerTokenData", res.data.organizerToken);
  jscookie.set("organizerEmail", res.data.email);

  return res.data; // ✅ ONLY DATA
} catch (err) {
  return rejectWithValue(err.response?.data);
}


}
);

/* ================= ORGANIZER REGISTRATION ================= */
export const organizerRegistrationThunk = createAsyncThunk(
"organizer/register",
async (formData, { rejectWithValue }) => {
try {
const res = await axios.post(
requestedOrganizerURL + "/addOrganizer",
formData
);


  return res.data; // ✅ ONLY DATA
} catch (err) {
  return rejectWithValue(err.response?.data);
}


}
);

const organizerSlice = createSlice({
name: "organizerSlice",
initialState,
reducers: {
resetMessage: (state, action) => {
state.message = action.payload;
}
},
extraReducers: (builder) => {
/* ===== REGISTRATION ===== */
builder.addCase(
organizerRegistrationThunk.fulfilled,
(state, action) => {
state.status = 200;
state.message = action.payload?.message;
}
);


/* ===== LOGIN ===== */
builder.addCase(organizerLoginThunk.fulfilled, (state, action) => {
  state.status = 200;
  state.loggedInEmail = action.payload.email;
  state.message = "Login Successful";
});

/* ===== TOURNAMENT LIST ===== */
builder.addCase(
  organizerTournamentListThunk.fulfilled,
  (state, action) => {
    state.status = 200;
    state.tournamentArray = action.payload.tournamentList;
  }
);

/* ===== ACCEPT / MANAGE TOURNAMENT ===== */
builder.addCase(
  organizerAcceptTournamentThunk.fulfilled,
  (state, action) => {
    state.status = 200;
    state.tournamentArray = action.payload.tournamentList;
  }
);


}
});

export const { resetMessage } = organizerSlice.actions;
export default organizerSlice.reducer;




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import jscookie from "js-cookie";
// import { requestedOrganizerURL } from "../utils.js";

// const organizerTokenData = jscookie.get("organizerTokenData");

// const initialState = {
//     loggedInEmail: '',
//     organizerObj: {},
//     organizerArray: [],
//     tournamentArray: [],
//     status: '',
//     message: ''
// };

// /* ================= TOURNAMENT LIST ================= */
// export const organizerTournamentListThunk = createAsyncThunk(
//     'organizerSlice/organizerTournamentListThunk',
//     async () => {
//         try {
//             const result = await axios.get(
//                 requestedOrganizerURL +
//                 '/organizerTournamentList?organizerTokenData=' +
//                 organizerTokenData
//             );
//             return result.data;
//         } catch (error) {
//             console.log("Error in organizerTournamentListThunk : ", error);
//         }
//     }
// );

// /* ================= ACCEPT / MANAGE TOURNAMENT ================= */
// export const organizerAcceptTournamentThunk = createAsyncThunk(
//     'organizerSlice/organizerAcceptTournamentThunk',
//     async (tournamentIdObj) => {
//         try {
//             const result = await axios.post(
//                 requestedOrganizerURL +
//                 '/organizerAcceptTournament?organizerTokenData=' +
//                 organizerTokenData,
//                 tournamentIdObj
//             );
//             return result.data;
//         } catch (error) {
//             console.log("Error in organizerAcceptTournamentThunk : ", error);
//         }
//     }
// );

// /* ================= ORGANIZER LOGIN ================= */
// export const organizerLoginThunk = createAsyncThunk(
//   "organizer/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         requestedOrganizerURL + "/loginOrganizer",
//         data
//       );

//       jscookie.set("organizerTokenData", res.data.organizerToken);
//       jscookie.set("organizerEmail", res.data.email);

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );



// /* ================= ORGANIZER REGISTRATION ================= */
// export const organizerRegistrationThunk = createAsyncThunk(
//   "organizer/register",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         requestedOrganizerURL + "/addOrganizer",
//         formData
//       );
//       return res.data; // ⚠️ ONLY DATA
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// const organizerSlice = createSlice({
//     name: "organizerSlice",
//     initialState,
//     reducers: {
//         resetMessage: (state, action) => {
//             state.message = action.payload;
//         }
//     },
//     extraReducers: (builder) => {

//         /* ===== REGISTRATION ===== */
//         builder
//             .addCase(organizerRegistrationThunk.pending, (state) => {})
//             .addCase(organizerRegistrationThunk.fulfilled, (state, action) => {
//                 state.status = action.payload?.status;
//                 if (state.status === 200) {
//                     state.message = "Organizer Registration Successful";
//                 } else {
//                     state.message = "Error while Organizer Registration";
//                 }
//             })
//             .addCase(organizerRegistrationThunk.rejected, (state) => {});

//         /* ===== LOGIN ===== */
//         builder
//             .addCase(organizerLoginThunk.pending, (state) => {})
//             .addCase(organizerLoginThunk.fulfilled, (state, action) => {
//                 if (action.payload === undefined) {
//                     state.status = 500;
//                 }
//                 if (action.payload?.status === 200) {
//                     state.loggedInEmail = action.payload.data._id;
//                     state.status = action.payload.status;
//                 }
//             })
//             .addCase(organizerLoginThunk.rejected, (state) => {});

//         /* ===== TOURNAMENT LIST ===== */
//         builder
//             .addCase(organizerTournamentListThunk.pending, (state) => {})
//             .addCase(organizerTournamentListThunk.fulfilled, (state, action) => {
//                 if (action.payload === undefined) {
//                     state.status = 500;
//                 }
//                 if (action.payload?.status === 200) {
//                     state.tournamentArray =
//                         action.payload.data.tournamentList;
//                     state.status = action.payload.status;
//                 }
//             })
//             .addCase(organizerTournamentListThunk.rejected, (state) => {});

//         /* ===== ACCEPT / MANAGE TOURNAMENT ===== */
//         builder
//             .addCase(organizerAcceptTournamentThunk.pending, (state) => {})
//             .addCase(organizerAcceptTournamentThunk.fulfilled, (state, action) => {
//                 if (action.payload === undefined) {
//                     state.status = 500;
//                 }
//                 if (action.payload?.status === 200) {
//                     state.tournamentArray =
//                         action.payload.data.tournamentList;
//                     state.status = action.payload.status;
//                 }
//             })
//             .addCase(organizerAcceptTournamentThunk.rejected, (state) => {});
//     }
// });

// export {
//     organizerRegistrationThunk,
//     organizerLoginThunk,
//     organizerTournamentListThunk,
//     organizerAcceptTournamentThunk
// };

// export const { resetMessage } = organizerSlice.actions;
// export default organizerSlice.reducer;
