import mongoose from "mongoose";
import moment from "moment";

const organizerSchema = new mongoose.Schema(
  {
    organizerId: {
      type: String,
      required: true
    },

    organizerName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    contact: {
      type: String,
      required: true
    },

    gameCategory: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    organizerLogo: {
      type: String,
      required: true
    },

    status: {
      type: Boolean,
      default: true
    },

    emailVerified: {
      type: Boolean,
      default: false
    },

    adminVerified: {
      type: Boolean,
      default: false
    },

    registeredDate: {
      type: String,
      default: () => moment().format("DD/MM/YYYY")
    },

    registeredTime: {
      type: String,
      default: () => moment().format("hh:mm:ss A")
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Organizer", organizerSchema);
