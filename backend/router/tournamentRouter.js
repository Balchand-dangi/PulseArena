import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  createTournamentController,
  viewTournamentListController,
  assignAdminController,
  tournamentListController
} from "../controller/tournamentController.js";

import {
  getTournamentParticipantsController
} from "../controller/organizerController.js";

dotenv.config();

const tournamentRouter = express.Router();
const ORGANIZER_SECRET_KEY = process.env.ORGANIZER_SECRET;

/* ================= ORGANIZER JWT MIDDLEWARE ================= */
const authenticateOrganizerJWT = (req, res, next) => {
  try {
    const token = req.query.organizerTokenData;

    if (!token) {
      return res.status(401).json({ message: "Organizer token missing" });
    }

    // ✅ FIXED (sync verify instead of callback)
    const payload = jwt.verify(token, ORGANIZER_SECRET_KEY);

    req.organizerPayload = payload;
    next();

  } catch (error) {
    console.log("Organizer JWT error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

/* ================= TOURNAMENT ROUTES ================= */

// ✅ Create Tournament (Organizer)
tournamentRouter.post(
  "/createTournament",
  authenticateOrganizerJWT,
  createTournamentController
);

// ✅ View All Tournaments (Public)
tournamentRouter.get(
  "/tournamentList",
  tournamentListController
);

// ✅ GET PARTICIPANTS (FINAL WORKING)
tournamentRouter.get(
  "/participants/:tournamentId",
  authenticateOrganizerJWT,
  getTournamentParticipantsController
);

export default tournamentRouter;


