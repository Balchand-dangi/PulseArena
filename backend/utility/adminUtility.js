import adminSchema from "../model/adminSchema.js";
import bcrypt from "bcrypt";

/*
  This function ensures that a default Super Admin
  exists for Sports & eSports Arena platform.
*/

export const adminCredentials = async () => {
  try {
    const admins = await adminSchema.find();
    console.log("Admin records:", admins);

    // If no admin exists, create default admin
    if (admins.length === 0) {
      const adminObj = {
        email: "admin@sportsarena.com",
        password: await bcrypt.hash("admin@123", 10),
        role: "ADMIN"
      };

      const result = await adminSchema.create(adminObj);
      console.log("Default Admin Created:", result);
      console.log("✅ Admin credentials inserted successfully");
    } else {
      console.log("ℹ️ Admin credentials already exist");
    }

  } catch (error) {
    console.error("❌ Error while inserting admin credentials:", error);
    throw error;
  }
};
