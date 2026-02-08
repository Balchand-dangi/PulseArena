import mongoose from "mongoose";
import moment from "moment";

const tournamentSchema = mongoose.Schema({
  tournamentId: {
    type: String,
    required: true,
    unique: true
  },

  organizerEmail: {
    type: String,
    required: true
  },

  tournamentName: {
    type: String,
    required: true
  },

  organizerContact: {
    type: String,
    required: true
  },

  venue: {
    type: String,
    required: true
  },

  gameTitle: {
    type: String,
    required: true
  },

  maxParticipants: {
    type: Number,
    required: true
  },

  tournamentDate: {
    type: String,
    required: true,
    default: () => moment().format("DD/MM/YYYY")
  },

  reportingTime: {
    type: String,
    required: true
  },

  gameCategory: {
    type: String,
    required: true
  },

  tournamentPoster: {
    type: String,
    required: true
  },

  registrations: [
  {
    registrationId: {
      type: String,
      required: true
    },
    participantEmail: {
      type: String,
      required: true
    },
    registeredAt: {
      type: String,
      default: () => moment().format("DD/MM/YYYY hh:mm A")
    }
  }
],


  registrationOpen: {
    type: Boolean,
    default: true
  },

  assignedAdminId: {
    type: String,
    default: ""
  },

  status: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: String,
    default: () => moment().format("DD/MM/YYYY")
  }
});

export default mongoose.model(
  "Tournament",
  tournamentSchema,
  "tournaments"
);
