// import uuid4 from "uuid4";
// import bcrypt from "bcrypt";
// import Participant from "../model/participantSchema.js";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";

// dotenv.config();
// const PARTICIPANT_SECRET_KEY = process.env.PARTICIPANT_SECRET;

// /* ================= PARTICIPANT REGISTRATION ================= */
// export const addParticipantController = async (request, response) => {
//   try {
//     const { username, email, password, contact } = request.body;

//     // ✅ validation
//     if (!username || !email || !password || !contact) {
//       return response.status(400).send({ message: "All fields are required" });
//     }

//     const alreadyExists = await Participant.findOne({ email });
//     if (alreadyExists) {
//       return response.status(409).send({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Participant.create({
//       participantId: uuid4(),
//       username,
//       email,
//       password: hashedPassword,
//       contact
//     });

//     response.status(200).send({
//       message: "Participant registered successfully"
//     });
//   } catch (error) {
//     console.log("Error in addParticipantController:", error);
//     response.status(500).send({ message: "Internal Server Error" });
//   }
// };

// /* ================= PARTICIPANT LOGIN ================= */
// export const loginParticipantController = async (request, response) => {
//   try {
//     const { email, password } = request.body;

//     if (!email || !password) {
//       return response.status(400).send({ message: "Email & password required" });
//     }

//     const participantObj = await Participant.findOne({ email });

//     if (!participantObj) {
//       return response.status(401).send({ message: "Invalid credentials" });
//     }

//     const isPasswordMatch = await bcrypt.compare(
//       password,
//       participantObj.password
//     );

//     if (!isPasswordMatch) {
//       return response.status(401).send({ message: "Invalid credentials" });
//     }

//     const payload = {
//       email,
//       role: "participant"
//     };

//     const token = jwt.sign(payload, PARTICIPANT_SECRET_KEY, {
//       expiresIn: "365d"
//     });

//     response.status(200).send({
//       email,
//       participantToken: token
//     });
//   } catch (error) {
//     console.log("Error in loginParticipantController:", error);
//     response.status(500).send({ message: "Internal Server Error" });
//   }
// };








import Participant from "../model/participantSchema.js";
import uuid4 from "uuid4";
import bcrypt from "bcrypt";
import participantSchema from "../model/participantSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import tournamentSchema from "../model/tournamentSchema.js";
import organizerSchema from "../model/organizerSchema.js";

dotenv.config();
const PARTICIPANT_SECRET_KEY = process.env.PARTICIPANT_SECRET;

/* ================= PARTICIPANT REGISTRATION ================= */
export const addParticipantController = async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;

    if (!username || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Participant.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Participant.create({
      participantId: uuid4(),
      username,
      email,
      password: hashedPassword,
      contact
    });

    res.status(200).json({
      message: "Participant registered successfully"
    });

  } catch (error) {
    console.log("Error in addParticipantController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// export const addParticipantController = async (request, response) => {
//   try {
//     const participantData = {
//       participantId: uuid4(),
//       username: request.body.username,
//       email: request.body.email,
//       password: await bcrypt.hash(request.body.password, 10),
//       contact: request.body.contact
//     };

//     const result = await Participant.create(participantData);

//     console.log("Participant registered:", result.email);

//     response.status(200).send({
//       message: "Participant registered successfully"
//     });

//   } catch (error) {
//     console.log("Error in addParticipantController:", error);
//     response.status(500).send({
//       message: "Internal Server Error"
//     });
//   }
// };


/* ================= PARTICIPANT LOGIN ================= */

   export const loginParticipantController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Email or password missing" });
    }

    const participantObj = await participantSchema.findOne({ email });

    if (!participantObj) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, participantObj.password);

    if (!isMatch) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: participantObj.email,
        role: "participant"
      },
      process.env.PARTICIPANT_SECRET,
      { expiresIn: "365d" }
    );

    response.status(200).json({
      email: participantObj.email,
      participantToken: token
    });

  } catch (error) {
    console.log("Error in loginParticipantController:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
 



/* ================= REGISTER FOR TOURNAMENT ================= */
export const registerTournamentController = async (request, response) => {
  try {
    const { tournamentId } = request.body;
    const participantEmail = request.participantPayload._id;

    const tournament = await tournamentSchema.findOne({ tournamentId });

    // ❌ tournament not found
    if (!tournament) {
      return response.status(404).send("Tournament not found");
    }

    // ❌ registration closed
    if (!tournament.registrationOpen) {
      return response.status(400).send("Registration closed");
    }

    // ❌ already registered
    const alreadyRegistered = tournament.registrations.find(
      r => r.participantEmail === participantEmail
    );

    if (alreadyRegistered) {
      return response.status(400).send("Already registered");
    }

    // ❌ slots full
    if (tournament.registrations.length >= tournament.maxParticipants) {
      tournament.registrationOpen = false;
      await tournament.save();
      return response.status(400).send("Slots full");
    }

    // ✅ register participant
    tournament.registrations.push({
      registrationId: uuid4(),
      participantEmail
    });

    // auto close registration if limit reached
    if (tournament.registrations.length >= tournament.maxParticipants) {
      tournament.registrationOpen = false;
    }

    await tournament.save();

    response.status(200).send({
      message: "Tournament registered successfully"
    });

  } catch (error) {
    console.log("Error in registerTournamentController:", error);
    response.status(500).send("Internal Server Error");
  }
};


/* ================= PARTICIPANT REGISTRATION LIST ================= */
export const participantRegistrationListController = async (request, response) => {
  try {
    const email = request.participantPayload._id;

    const tournaments = await tournamentSchema.find({
      "registrations.participantEmail": email
    }).lean();

    for (let t of tournaments) {
      const organizer = await organizerSchema.findOne({
        organizerId: t.organizerId
      });

      t.organizerName = organizer?.organizerName || "";
      t.organizerContact = organizer?.contact || "";
    }

    response.status(200).send({
      _id: email,
      tournaments
    });

  } catch (error) {
    console.log("Error in participantRegistrationListController:", error);
    response.status(500).send("Internal Server Error");
  }
};
