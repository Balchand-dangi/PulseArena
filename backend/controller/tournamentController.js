import uuid4 from "uuid4";
import tournamentSchema from "../model/tournamentSchema.js";
import organizerSchema from "../model/organizerSchema.js";

/* ================= CREATE TOURNAMENT ================= */
export const createTournamentController = async (request, response) => {
  try {
    const data = request.body;

    const tournamentObj = {
      ...data,
      tournamentId: uuid4()
    };

    await tournamentSchema.create(tournamentObj);

    response.status(200).send({
      message: "Tournament created successfully"
    });

  } catch (error) {
    console.log("Error in createTournamentController:", error);
    response.status(500).send("Internal Server Error");
  }
};

/* ================= VIEW ALL TOURNAMENTS ================= */
export const viewTournamentListController = async (request, response) => {
  try {
    const tournaments = await tournamentSchema.find().lean();

    for (let t of tournaments) {
      const organizer = await organizerSchema.findOne({
        _id: t.organizerEmail
      });

      t.organizerName = organizer?.organizerName || "";
      t.organizerContact = organizer?.contact || "";
    }

    response.status(200).send(tournaments);

  } catch (error) {
    console.log("Error in viewTournamentListController:", error);
    response.status(500).send("Internal Server Error");
  }
};

/* ================= ASSIGN ADMIN (OPTIONAL) ================= */
export const assignAdminController = async (request, response) => {
  try {
    const { tournamentId, adminEmail } = request.body;

    await tournamentSchema.updateOne(
      { tournamentId },
      { $set: { assignedAdminId: adminEmail } }
    );

    response.status(200).send({
      message: "Admin assigned successfully"
    });

  } catch (error) {
    console.log("Error in assignAdminController:", error);
    response.status(500).send("Internal Server Error");
  }
};


/* ================= TOURNAMENT LIST (PUBLIC) ================= */
export const tournamentListController = async (request, response) => {
  try {
    const tournamentList = await tournamentSchema.find({
      status: true,
      registrationOpen: true
    });

    response.status(200).send({ tournamentList });

  } catch (error) {
    console.log("Error in tournamentListController:", error);
    response.status(500).send("Internal Server Error");
  }
};