import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  addParticipantController,
  loginParticipantController,
  registerTournamentController,
  participantRegistrationListController
} from "../controller/participantController.js";


dotenv.config();

const participantRouter = express.Router();
const PARTICIPANT_SECRET_KEY = process.env.PARTICIPANT_SECRET;

/* ================= JWT AUTH MIDDLEWARE ================= */
const authenticateParticipantJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send("Token missing");
    }

    jwt.verify(token, PARTICIPANT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }
      req.participantPayload = payload;
      next();
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


/* ================= PARTICIPANT ROUTES ================= */

// Participant Registration
participantRouter.post(
  "/addParticipant",
  addParticipantController
);


// Participant Login
participantRouter.post(
  "/loginParticipant",
  loginParticipantController
);

// Register for Tournament (Protected)
participantRouter.post(
  "/registerTournament",
  authenticateParticipantJWT,
  registerTournamentController
);

// View Participant Registered Tournaments (Protected)
participantRouter.get(
  "/participantTournamentList",
  authenticateParticipantJWT,
  participantRegistrationListController
);

export default participantRouter;
