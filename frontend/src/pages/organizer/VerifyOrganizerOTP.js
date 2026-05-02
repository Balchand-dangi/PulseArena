import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyOrganizerOTPThunk } from "../../store/organizerSlice";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOrganizerOTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
  });

  useEffect(() => {
    if (!location.state?.email) {
      alert("Invalid access. Please register first.");
      navigate("/organizerRegistration");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "otp" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(verifyOrganizerOTPThunk(formData));

    if (verifyOrganizerOTPThunk.fulfilled.match(result)) {
      alert("Email verified successfully!");
      navigate("/organizerLogin");
    } else {
      alert(result.payload || "OTP verification failed");
    }
  };

  return (
    <div className="verify-auth-page">
      <div className="verify-auth-card">
        <div className="verify-auth-badge organizer-badge">
          Organizer Verification
        </div>

        <h2 className="verify-auth-title">Verify Organizer OTP</h2>
        <p className="verify-auth-subtitle">
          Enter the OTP sent to your organizer email to continue securely.
        </p>

        {formData.email && (
          <p className="verify-auth-email">
            <span>Email:</span> {formData.email}
          </p>
        )}

        <form onSubmit={handleSubmit} className="verify-auth-form">
          <div className="verify-auth-input-group">
            <label htmlFor="organizerEmail">Email Address</label>
            <input
              id="organizerEmail"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="verify-auth-input"
              readOnly
            />
          </div>

          <div className="verify-auth-input-group">
            <label htmlFor="organizerOtp">Enter OTP</label>
            <input
              id="organizerOtp"
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
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
          Verification helps keep organizer access secure and trusted.
        </p>
      </div>
    </div>
  );
}

export default VerifyOrganizerOTP;