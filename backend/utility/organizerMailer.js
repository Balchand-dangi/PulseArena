import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const organizerMailer = function (email, callback) {

   const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Organizer Verification | Sports & eSports Arena",
    html: `
      <h3>Hello ${email},</h3>
      <p>
        Welcome to <b>Sports & eSports Arena</b> 🎮⚽ <br/>
        Please verify your organizer account to start creating tournaments.
      </p>

      <form action="${process.env.EMAIL_VERIFY_URL}" method="post">
        <input type="hidden" name="_id" value="${email}" />
        <button 
          style="
            height:40px;
            width:260px;
            background-color:#0f172a;
            color:white;
            border:none;
            border-radius:6px;
            cursor:pointer;
          "
        >
          Verify Organizer Account
        </button>
      </form>

      <p style="margin-top:15px;font-size:12px;color:gray;">
        If you did not request this, please ignore this email.
      </p>
    `
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error in organizerMailer:", error);
      callback(false);
    } else {
      console.log("Organizer verification mail sent");
      callback(info);
    }
  });
};

export default { organizerMailer };
