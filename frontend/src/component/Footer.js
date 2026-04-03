import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">PulseArena</h2>
        {/* <p className="footer-text">
          Discover, explore and organize exciting events with ease.
        </p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div> */}

        <p className="footer-copy">
          © 2026 PulseArena. All rights reserved to Karan Gangwal.
        </p>
      </div>
    </footer>
  );
}

export default Footer;