import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setNavShow } from "../../store/commonSlice.js";
import "./organizerPages.css";

function OrganizerHome() {
  const organizerObj = useSelector((state) => state.organizer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (organizerObj.status === 500 || organizerObj.status === undefined) {
      navigate("/organizerLogin");
    }
  }, [organizerObj.status, navigate]);

  useEffect(() => {
    dispatch(setNavShow("organizer"));
  }, [dispatch]);

  const organizerName = organizerObj.loggedInEmail || "Organizer";

  const dashboardStats = useMemo(() => {
    const events = organizerObj.tournamentArray || [];

    const totalEvents = events.length;
    const openEvents = events.filter((e) => e.registrationOpen).length;
    const totalRegistrations = events.reduce(
      (acc, item) => acc + (item.registrations?.length || 0),
      0
    );

    return {
      totalEvents,
      openEvents,
      totalRegistrations,
    };
  }, [organizerObj.tournamentArray]);

  return (
    <div className="organizer-dashboard-page">
      <section className="organizer-hero">
        <div className="organizer-hero-left">
          <p className="organizer-hero-badge">Organizer Control Center</p>

          <h1 className="organizer-hero-title">
            Manage your events like a pro on <span>PulseArena</span>
          </h1>

          <p className="organizer-hero-description">
            Welcome <strong>{organizerName}</strong>. From here, you can create
            premium events, track registrations, and manage your tournaments in
            one clean dashboard.
          </p>

          <div className="organizer-hero-actions">
            <Link to="/createTournament" className="organizer-primary-btn">
              Create New Event
            </Link>

            <Link to="/organizerTournamentList" className="organizer-secondary-btn">
              View My Events
            </Link>
          </div>
        </div>

        <div className="organizer-hero-right">
          <div className="organizer-highlight-card">
            <p className="highlight-mini">PulseArena Organizer</p>
            <h3>Build. Manage. Grow.</h3>
            <p>
              Create engaging sports, esports, and campus events with a cleaner,
              more professional organizer workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="organizer-stats-section">
        <div className="organizer-stat-card">
          <p>Total Events</p>
          <h2>{dashboardStats.totalEvents}</h2>
          <span>Your created tournaments</span>
        </div>

        <div className="organizer-stat-card">
          <p>Open Registrations</p>
          <h2>{dashboardStats.openEvents}</h2>
          <span>Currently accepting participants</span>
        </div>

        <div className="organizer-stat-card">
          <p>Total Signups</p>
          <h2>{dashboardStats.totalRegistrations}</h2>
          <span>Across all your events</span>
        </div>
      </section>

      <section className="organizer-info-grid">
        <div className="organizer-info-card">
          <h3>What you can do here</h3>
          <ul>
            <li>Create and publish new tournaments</li>
            <li>Manage registrations and event slots</li>
            <li>Track participation for every event</li>
            <li>Keep your event pages clean and attractive</li>
          </ul>
        </div>

        <div className="organizer-info-card">
          <h3>Quick Access</h3>
          <div className="organizer-quick-links">
            <Link to="/createTournament" className="quick-link-box">
              <span>Create Event</span>
              <small>Add a new tournament instantly</small>
            </Link>

            <Link to="/organizerTournamentList" className="quick-link-box">
              <span>My Events</span>
              <small>Check all your created events</small>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrganizerHome;