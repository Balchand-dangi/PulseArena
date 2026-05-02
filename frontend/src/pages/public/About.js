import React from "react";
import "./publicPages.css";

function About() {
  return (
    <div className="pulse-page-wrapper">
      <section className="pulse-page-hero">
        <span className="pulse-page-tag">About PulseArena</span>
        <h1>Discover Events. Feel the Energy.</h1>
        <p>
          PulseArena is a modern event discovery platform designed to help users
          explore exciting experiences across sports, eSports, cultural,
          technical, and social events — all in one place.
        </p>
      </section>

      <section className="pulse-page-section">
        <div className="pulse-page-card">
          <h2>What We Do</h2>
          <p>
            We bring together different kinds of events into one unified
            platform, making it easier for participants to discover, explore,
            and engage with opportunities happening around them.
          </p>
        </div>

        <div className="pulse-page-card">
          <h2>Why PulseArena</h2>
          <ul className="pulse-page-list">
            <li>✔ Multi-category event discovery</li>
            <li>✔ Easy and smooth user experience</li>
            <li>✔ Clean and modern interface</li>
            <li>✔ Built for communities and organizers</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;