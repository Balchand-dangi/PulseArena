import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  createTournamentController,
  viewTournamentListController,
  assignAdminController,
  tournamentListController
} from "../controller/tournamentController.js";


dotenv.config();

const tournamentRouter = express.Router();
const ORGANIZER_SECRET_KEY = process.env.ORGANIZER_SECRET;

/* ================= ORGANIZER JWT MIDDLEWARE ================= */
const authenticateOrganizerJWT = (req, res, next) => {
  try {
    const token = req.query.organizerTokenData;

    if (!token) {
      return res.status(401).send("Organizer token missing");
    }

    jwt.verify(token, ORGANIZER_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid or expired token");
      }
      req.organizerPayload = payload;
      next();
    });
  } catch (error) {
    console.log("Organizer JWT error:", error);
    res.status(500).send("Internal Server Error");
  }
};

/* ================= TOURNAMENT ROUTES ================= */

// Create Tournament (Organizer)
tournamentRouter.post(
  "/createTournament",
  authenticateOrganizerJWT,
  createTournamentController
);

// View All Tournaments (Public)
tournamentRouter.get(
  "/tournamentList",
  tournamentListController
);

export default tournamentRouter;
