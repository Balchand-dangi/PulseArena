import express from "express";
import {
  addOrganizerController,
  loginOrganizerController,
  organizerVerifyEmailController,
  organizerTournamentListController,
  organizerCreateTournamentController
} from "../controller/organizerController.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const organizerRouter = express.Router();
const ORGANIZER_SECRET_KEY = process.env.ORGANIZER_SECRET;

/* ================= JWT AUTH ================= */
const authenticateOrganizerJWT = (req, res, next) => {
  const token = req.query.organizerTokenData;

  if (!token) {
    return res.status(401).send("Organizer token missing");
  }

  jwt.verify(token, ORGANIZER_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.organizerPayload = payload;
    next();
  });
};

/* ================= ROUTES ================= */

// ✅ THIS ROUTE MUST EXIST
organizerRouter.post("/addOrganizer", addOrganizerController);

organizerRouter.post("/loginOrganizer", loginOrganizerController);

organizerRouter.post("/verifyEmail", organizerVerifyEmailController);

organizerRouter.get(
  "/organizerTournamentList",
  authenticateOrganizerJWT,
  organizerTournamentListController
);

organizerRouter.post(
  "/createTournament",
  authenticateOrganizerJWT,
  organizerCreateTournamentController
);

export default organizerRouter;
