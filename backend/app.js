import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import expressFileUpload from "express-fileupload";

// Routers
import adminRouter from "./router/adminRouter.js";
import organizerRouter from "./router/organizerRouter.js";
import participantRouter from "./router/participantRouter.js";
import tournamentRouter from "./router/tournamentRouter.js";

// DB
import { url } from "./connection/dbConfig.js";

// Utilities
import { adminCredentials } from "./utility/adminUtility.js";

dotenv.config();

const app = express();

/* ================= BASIC MIDDLEWARE (TOP PRIORITY) ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= FILE UPLOAD ================= */
app.use(
  expressFileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    createParentPath: true,
  })
);

/* ================= STATIC FILES ================= */
app.use("/public", express.static("public"));

/* ================= DATABASE CONNECTION ================= */
mongoose
  .connect(url, {
    serverSelectionTimeoutMS: 1200000,
    maxPoolSize: 10,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

/* ================= DEFAULT ADMIN SETUP ================= */
(async () => {
  console.log("Checking admin credentials...");
  try {
    await adminCredentials();
  } catch (error) {
    console.log("Admin credential error:", error.message);
  }
  console.log("Admin credential check completed");
})();

/* ================= ROUTES ================= */
app.use("/admin", adminRouter);
app.use("/organizer", organizerRouter);
app.use("/participant", participantRouter);
app.use("/tournament", tournamentRouter);

/* ================= GLOBAL 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sports & eSports Arena backend running on port ${PORT}`);
});





