import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="pulse-page-wrapper">
      <section className="pulse-page-hero">
        <span className="pulse-page-tag">Contact PulseArena</span>
        <h1>We’d Love to Hear From You</h1>
        <p>
          Have questions, suggestions, or need support? Reach out and stay
          connected with the PulseArena experience.
        </p>
      </section>

      <section className="pulse-page-section single-card-section">
        <div className="pulse-page-card compact-contact-card">
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> support@pulsearena.com</p>
          <p><strong>Phone:</strong> +91 7804885007</p>
          <p><strong>Location:</strong> Indore, Madhya Pradesh, India</p>

          <div className="pulse-contact-actions">
            <Link to="/participantRegistration" className="pulse-primary-btn">
              Join as Participant
            </Link>

            <Link to="/registerTournament" className="pulse-secondary-btn dark-outline-btn">
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;