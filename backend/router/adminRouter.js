import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  loginAdminController,
  adminViewOrganizerListController,
  adminVerifyOrganizerController
} from "../controller/adminController.js";

dotenv.config();

const adminRouter = express.Router();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET;

/* ================= JWT AUTH MIDDLEWARE ================= */
const authenticateAdminJWT = (request, response, next) => {
  try {
    const token = request.query.adminTokenData;

    if (!token) {
      return response.status(401).send("Admin token missing");
    }

    jwt.verify(token, ADMIN_SECRET_KEY, (error, payload) => {
      if (error) {
        console.log("JWT verification failed:", error);
        return response.status(403).send("Invalid or expired admin token");
      }

      request.adminPayload = payload;
      next();
    });

  } catch (error) {
    console.log("Admin JWT authentication error:", error);
    return response.status(500).send("Internal server error");
  }
};

/* ================= ADMIN ROUTES ================= */

// Admin Login
adminRouter.post("/loginAdmin", loginAdminController);

// View Organizer List (Admin Only)
adminRouter.get(
  "/adminViewOrganizerList",
  authenticateAdminJWT,
  adminViewOrganizerListController
);

// Verify Organizer (Admin Only)
adminRouter.post(
  "/adminVerifyOrganizer",
  authenticateAdminJWT,
  adminVerifyOrganizerController
);

export default adminRouter;
