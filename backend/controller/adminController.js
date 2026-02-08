import bcrypt from "bcrypt";
import adminSchema from "../model/adminSchema.js";
import organizerSchema from "../model/organizerSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET;

/* ================= ADMIN LOGIN ================= */
export const loginAdminController = async (request, response) => {
  try {
    if (!request.body) {
      return response.status(400).json({
        message: "Request body missing"
      });
    }

    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Email or password missing"
      });
    }

    const adminObj = await adminSchema.findOne({ email });

    if (!adminObj) {
      return response.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, adminObj.password);

    if (!isMatch) {
      return response.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { email, role: "ADMIN" },
      process.env.ADMIN_SECRET,
      { expiresIn: "365d" }
    );

    response.status(200).json({
      email,
      adminToken: token
    });

  } catch (error) {
    console.log("Error in loginAdminController:", error);
    response.status(500).json({
      message: "Internal server error"
    });
  }
};

  

/* ================= VIEW ORGANIZER LIST ================= */
export const adminViewOrganizerListController = async (request, response) => {
  try {
    const organizerList = await organizerSchema.find();

    response.status(200).send({
      email: request.adminPayload.email,
      organizerList
    });

  } catch (error) {
    console.log("Error in adminViewOrganizerListController:", error);
    response.status(500).send("Internal Server Error");
  }
};

/* ================= VERIFY ORGANIZER ================= */
export const adminVerifyOrganizerController = async (request, response) => {
  try {
    const { _id } = request.body;

    await organizerSchema.updateOne(
      { _id },
      { $set: { adminVerify: true } }
    );

    const organizerList = await organizerSchema.find();

    response.status(200).send({
      email: request.adminPayload.email,
      organizerList
    });

  } catch (error) {
    console.log("Error in adminVerifyOrganizerController:", error);
    response.status(500).send("Internal Server Error");
  }
};
