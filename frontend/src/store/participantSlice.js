import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jscookie from "js-cookie";
import { requestedParticipantURL } from "../utils.js";

const initialState = {
  loggedInEmail: "",
  tournamentArray: [],
  status: "",
  message: ""
};

/* ===== REGISTER ===== */
export const participantRegistrationThunk = createAsyncThunk(
  "participant/register",
  async (data) => {
    const res = await axios.post(
      requestedParticipantURL + "/addParticipant",
      data
    );
    return res.data;
  }
);

/* ===== LOGIN ===== */
export const participantLoginThunk = createAsyncThunk(
  "participant/login",
  async (data) => {
    const res = await axios.post(
      requestedParticipantURL + "/loginParticipant",
      data
    );

    jscookie.set("participantTokenData", res.data.participantToken);
    jscookie.set("participantEmail", res.data.email);

    return res.data;
  }
);

/* ===== TOURNAMENT LIST ===== */
export const participantTournamentListThunk = createAsyncThunk(
  "participant/list",
  async () => {
    const token = jscookie.get("participantTokenData");
    const res = await axios.get(
      requestedParticipantURL + "/participantTournamentList",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  }
);

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(participantRegistrationThunk.fulfilled, (state, action) => {
        state.status = 200;
        state.message = action.payload.message;
      })
      .addCase(participantLoginThunk.fulfilled, (state, action) => {
        state.loggedInEmail = action.payload.email;
        state.status = 200;
        state.message = "Login Successful";
      })
      .addCase(participantTournamentListThunk.fulfilled, (state, action) => {
        state.tournamentArray = action.payload.tournaments;
      });
  }
});

export const { resetMessage } = participantSlice.actions;
export default participantSlice.reducer;









// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import jscookie from "js-cookie";
// import { requestedParticipantURL } from "../utils.js";

// const participantTokenData = jscookie.get("participantTokenData");

// const initialState = {
//     loggedInEmail: '',
//     participantObj: {},
//     participantArray: [],
//     tournamentArray: [],
//     status: '',
//     message: ''
// };

// /* ================= PARTICIPANT TOURNAMENT LIST ================= */
// const participantTournamentListThunk = createAsyncThunk(
//   'participantSlice/participantTournamentListThunk',
//   async (obj) => {
//     try {
//       const token = jscookie.get("participantTokenData");

//       const result = await axios.post(
//         requestedParticipantURL + '/participantTournamentList',
//         obj,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       return result.data;
//     } catch (error) {
//       console.log("Error in participantTournamentListThunk :", error);
//       throw error;
//     }
//   }
// );


// /* ================= PARTICIPANT LOGIN ================= */
// const participantLoginThunk = createAsyncThunk(
//   'participantSlice/participantLoginThunk',
//   async (participantObj) => {
//     try {
//       const result = await axios.post(
//         requestedParticipantURL + '/loginParticipant',
//         participantObj
//       );

//       // cookies yahin set karo
//       jscookie.set(
//         "participantTokenData",
//         result.data.participantToken,
//         { expires: 1 }
//       );
//       jscookie.set(
//         "participantEmail",
//         result.data._id,
//         { expires: 1 }
//       );

//       // ⚠️ IMPORTANT: sirf data return karo
//       return result.data;

//     } catch (error) {
//       console.log("Error in participantLoginThunk :", error);
//       throw error;
//     }
//   }
// );

// /* ================= PARTICIPANT REGISTRATION ================= */
// const participantRegistrationThunk = createAsyncThunk(
//   'participantSlice/participantRegistrationThunk',
//   async (participantObj) => {
//     try {
//       const result = await axios.post(
//         requestedParticipantURL + '/addParticipant',
//         participantObj
//       );

//       // ⚠️ IMPORTANT: sirf data return karo
//       return result.data;

//     } catch (error) {
//       console.log("Error in participantRegistrationThunk:", error);
//       throw error;
//     }
//   }
// );

// /* ================= REGISTER TOURNAMENT ================= */
// const registerTournamentThunk = createAsyncThunk(
//     'participantSlice/registerTournamentThunk',
//     async (tournamentObj) => {
//         try {
//             const result = await axios.post(
//                 requestedParticipantURL + '/registerTournament',
//                 tournamentObj
//             );
//             return result;
//         } catch (error) {
//             console.log("Error in registerTournamentThunk : ", error);
//         }
//     }
// );

// const participantSlice = createSlice({
//     name: "participantSlice",
//     initialState,
//     reducers: {
//         resetMessage: (state, action) => {
//             state.message = action.payload;
//         }
//     },
//     extraReducers: (builder) => {

//         /* ===== REGISTRATION ===== */
//         builder
//             .addCase(participantRegistrationThunk.pending, (state) => {})

//            .addCase(participantRegistrationThunk.fulfilled, (state, action) => {
//            state.status = 200;
//            state.message = action.payload.message;
//            })

//             .addCase(participantRegistrationThunk.rejected, (state) => {});

//         /* ===== LOGIN ===== */
//         builder
//             .addCase(participantLoginThunk.pending, (state) => {})
//             .addCase(participantLoginThunk.fulfilled, (state, action) => {
//              state.status = 200;
//              state.loggedInEmail = action.payload._id;
//               state.message = "Login Successful";
//             })

//             .addCase(participantLoginThunk.rejected, (state) => {});

//         /* ===== REGISTER TOURNAMENT ===== */
//         builder
//             .addCase(registerTournamentThunk.pending, (state) => {})
//             .addCase(registerTournamentThunk.fulfilled, (state, action) => {
//                 state.status = action.payload?.status;
//                 if (state.status === 200) {
//                     state.message = "Tournament Registered Successfully";
//                 } else {
//                     state.message = "Error while Tournament Registration";
//                 }
//             })
//             .addCase(registerTournamentThunk.rejected, (state) => {});

//         /* ===== TOURNAMENT LIST ===== */
//         builder
//             .addCase(participantTournamentListThunk.pending, (state) => {})
//             .addCase(participantTournamentListThunk.fulfilled, (state, action) => {
//                 if (action.payload === undefined) {
//                     state.status = 500;
//                 }
//                 if (action.payload?.status === 200) {
//                     state.tournamentArray =
//                         action.payload.data.tournamentList;
//                     state.status = action.payload.status;
//                 }
//             })
//             .addCase(participantTournamentListThunk.rejected, (state) => {});
//     }
// });

// export {
//     participantRegistrationThunk,
//     participantLoginThunk,
//     registerTournamentThunk,
//     participantTournamentListThunk
// };

// export const { resetMessage } = participantSlice.actions;
// export default participantSlice.reducer;
