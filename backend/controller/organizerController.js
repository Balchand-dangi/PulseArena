import uuid4 from "uuid4";
import bcrypt from "bcrypt";
// import organizerSchema from "../model/organizerSchema.js";
import Organizer from "../model/organizerSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";
// import { organizerMailer } from "../utility/organizerMailer.js";
import organizerMailer from "../utility/organizerMailer.js";

import tournamentSchema from "../model/tournamentSchema.js";

dotenv.config();
const ORGANIZER_SECRET_KEY = process.env.ORGANIZER_SECRET;

/* ================= ORGANIZER REGISTRATION ================= */
export const addOrganizerController = async (req, res) => {
  try {
    // ✅ FILE CHECK
    if (!req.files || !req.files.organizerLogo) {
      return res.status(400).json({ message: "Organizer logo is required" });
    }

    const {
      organizerName,
      email,
      password,
      contact,
      gameCategory,
      description,
      address
    } = req.body;

    // ✅ FIELD VALIDATION
    if (
      !organizerName ||
      !email ||
      !password ||
      !contact ||
      !gameCategory ||
      !description ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ DUPLICATE EMAIL CHECK
    const exists = await Organizer.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // ✅ FILE UPLOAD
    const logoFile = req.files.organizerLogo;
    const fileName = Date.now() + "_" + logoFile.name;
    await logoFile.mv(`public/organizerImages/${fileName}`);

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ SAVE ORGANIZER
    await Organizer.create({
      organizerId: uuid4(),
      organizerName,
      email,
      password: hashedPassword,
      contact,
      gameCategory,
      description,
      address,
      organizerLogo: fileName
    });

    return res.status(200).json({
      message: "Organizer registered successfully"
    });

  } catch (error) {
    console.error("Organizer Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= ORGANIZER LOGIN ================= */

export const loginOrganizerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, organizer.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: organizer.email, role: "organizer" },
      ORGANIZER_SECRET_KEY,
      { expiresIn: "365d" }
    );

    return res.status(200).json({
      email: organizer.email,
      organizerToken: token
    });

  } catch (error) {
    console.error("Organizer Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= ORGANIZER EMAIL VERIFY ================= */
export const organizerVerifyEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await organizerSchema.updateOne(
      { email },
      { $set: { emailVerified: true } }
    );

    if (result.modifiedCount === 1) {
      res.redirect(
        "http://localhost:3000/organizerLogin?message=Email Verified | Await Admin Approval"
      );
    } else {
      res.redirect(
        "http://localhost:3000/organizerLogin?message=Already Verified"
      );
    }

  } catch (error) {
    console.log("Error in organizerVerifyEmailController:", error);
    res.redirect(
      "http://localhost:3000/organizerLogin?message=Something went wrong"
    );
  }
};


/* ================= VIEW TOURNAMENT LIST ================= */
export const organizerTournamentListController = async (req, res) => {
  try {
    const tournamentList = await tournamentSchema.find({
      organizerEmail: req.organizerPayload.email
    });

    return res.status(200).json({
      email: req.organizerPayload.email,
      tournamentList
    });
  } catch (error) {
    console.log("Error in organizerTournamentListController:", error);
    res.status(500).send("Internal Server Error");
  }
};

/* ================= CREATE TOURNAMENT ================= */
export const organizerCreateTournamentController = async (req, res) => {
  try {
    const tournamentData = {
      ...req.body,
      tournamentId: uuid4(),
      organizerEmail: req.organizerPayload.email
    };

    await tournamentSchema.create(tournamentData);

    res.status(200).json({
      message: "Tournament created successfully"
    });
  } catch (error) {
    console.log("Error in organizerCreateTournamentController:", error);
    res.status(500).send("Internal Server Error");
  }
};
/* ================= ALIAS EXPORTS ================= */
export const registerOrganizerController = addOrganizerController;
export const verifyOrganizerEmailController = organizerVerifyEmailController;
