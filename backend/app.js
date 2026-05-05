import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Routers
import adminRouter from "./router/adminRouter.js";
import organizerRouter from "./router/organizerRouter.js";
import participantRouter from "./router/participantRouter.js";
import tournamentRouter from "./router/tournamentRouter.js";
import ticketRouter from "./router/ticketRouter.js";

// DB
import { url } from "./connection/dbConfig.js";

// Utilities
import { adminCredentials } from "./utility/adminUtility.js";

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const requiredEnv = [
  "ADMIN_SECRET",
  "ORGANIZER_SECRET",
  "PARTICIPANT_SECRET",
  "CLOUD_NAME",
  "CLOUD_API_KEY",
  "CLOUD_API_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_VERIFY_URL",
  "FRONTEND_URL"
];

if (isProduction) {
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (!process.env.MONGODB_URL && !process.env.MONGODB_URI) {
    missingEnv.push("MONGODB_URL or MONGODB_URI");
  }

  if (missingEnv.length > 0) {
    throw new Error(`Missing required production env variables: ${missingEnv.join(", ")}`);
  }
}

app.set("trust proxy", 1);

/* ================= SECURITY ================= */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

/* ================= CORS ================= */
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

/* ================= BODY PARSER ================= */
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

/* ================= COOKIE ================= */
app.use(cookieParser());

/* ================= STATIC ================= */
app.use(
  "/public",
  express.static("public", {
    maxAge: isProduction ? "7d" : 0
  })
);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("🚀 Backend Running Successfully");
});

/* ================= DATABASE ================= */
mongoose
  .connect(url)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) =>
    console.log("❌ MongoDB connection error:", error.message)
  );

/* ================= ADMIN INIT ================= */
(async () => {
  try {
    await adminCredentials();
  } catch (error) {
    console.log("Admin credential error:", error.message);
  }
})();

/* ================= ROUTES ================= */

// ✅ API prefix clear structure (BEST PRACTICE)
app.use("/admin", adminRouter);
app.use("/organizer", organizerRouter);
app.use("/participant", participantRouter);
app.use("/tournament", tournamentRouter);
app.use("/ticket", ticketRouter);

/*
👉 IMPORTANT:
Now your participants API works at:

GET http://localhost:5000/tournament/participants/:tournamentId
*/

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
    path: req.originalUrl
  });
});

/* ================= GLOBAL ERROR ================= */
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).json({
    message: err.message || "Something went wrong"
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Pulse Arena backend running on port ${PORT}`);
});

