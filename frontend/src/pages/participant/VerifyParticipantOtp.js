import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyParticipantOtpThunk } from "../../store/participantSlice";

function VerifyParticipantOtp() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      alert("Invalid access. Please register first.");
      navigate("/participantRegistration");
    }
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(verifyParticipantOtpThunk({ email, otp }))
      .unwrap()
      .then(() => {
        alert("Email verified successfully!");
        navigate("/participantLogin");
      })
      .catch((err) => {
        alert(err?.message || err);
      });
  };

  return (
    <div className="verify-auth-page">
      <div className="verify-auth-card">
        <div className="verify-auth-badge">Participant Verification</div>

        <h2 className="verify-auth-title">Verify OTP</h2>
        <p className="verify-auth-subtitle">
          Please enter the OTP sent to your registered email address.
        </p>

        {email && (
          <p className="verify-auth-email">
            <span>Email:</span> {email}
          </p>
        )}

        <form onSubmit={handleSubmit} className="verify-auth-form">
          <div className="verify-auth-input-group">
            <label htmlFor="participantOtp">Enter OTP</label>
            <input
              id="participantOtp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
              maxLength={6}
              className="verify-auth-input otp-centered-input"
            />
          </div>

          <button type="submit" className="verify-auth-button">
            Verify OTP
          </button>
        </form>

        <p className="verify-auth-footer-text">
          Make sure you entered the correct OTP before continuing.
        </p>
      </div>
    </div>
  );
}

export default VerifyParticipantOtp;