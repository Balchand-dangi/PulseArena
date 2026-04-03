import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jscookie from "js-cookie";
import { setNavShow } from "../store/commonSlice.js";
import { participantTournamentListThunk } from "../store/participantSlice.js";
import EventSection from "./participant/EventSection";
import "./participant/participantStyles.css";

function ParticipantHome() {
  const participantObj = useSelector((state) => state.participant);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = jscookie.get("participantTokenData");

    if (!token) {
      navigate("/participantLogin");
    }
  }, [navigate]);

  /* ================= HANDLE 403 / INVALID LOGIN ================= */
  useEffect(() => {
    if (
      participantObj.status === 403 &&
      participantObj.message?.toLowerCase().includes("token")
    ) {
      navigate("/participantLogin");
    }
  }, [participantObj.status, participantObj.message, navigate]);

  /* ================= NAV ================= */
  useEffect(() => {
    dispatch(setNavShow("participant"));
  }, [dispatch]);

  /* ================= FETCH TOURNAMENTS ================= */
  useEffect(() => {
    dispatch(participantTournamentListThunk());
  }, [dispatch]);

  const allTournaments = participantObj.tournamentArray || [];

  const categories = [
    "All",
    "Cricket",
    "Football",
    "Badminton",
    "Chess",
    "Kabaddi",
    "Esports",
  ];

  const filteredTournaments = useMemo(() => {
    if (selectedCategory === "All") return allTournaments;

    return allTournaments.filter((t) =>
      t?.gameTitle?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [allTournaments, selectedCategory]);

  const featuredTournaments = filteredTournaments.slice(0, 5);

  const cricketTournaments = filteredTournaments.filter((t) =>
    t?.gameTitle?.toLowerCase().includes("cricket")
  );

  const footballTournaments = filteredTournaments.filter((t) =>
    t?.gameTitle?.toLowerCase().includes("football")
  );

  const badmintonTournaments = filteredTournaments.filter((t) =>
    t?.gameTitle?.toLowerCase().includes("badminton")
  );

  const chessTournaments = filteredTournaments.filter((t) =>
    t?.gameTitle?.toLowerCase().includes("chess")
  );

  const popularTournaments = filteredTournaments.slice(0, 8);
  const recentTournaments = [...filteredTournaments].reverse().slice(0, 8);

  return (
    <div className="participant-home-wrapper">
      {/* ================= HERO SECTION ================= */}
      <section className="participant-hero">
        <div className="participant-hero-left">
          <p className="hero-subtitle">Pulse Arena</p>
          <h1 className="hero-title">
            Discover, Explore & Register for Amazing Tournaments
          </h1>
          <p className="hero-description">
            Browse organizer-created events in a clean, modern, participant-first experience.
          </p>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <h3>{allTournaments.length}</h3>
              <p>Available Events</p>
            </div>
            <div className="hero-stat-card">
              <h3>{participantObj.registeredTournamentArray?.length || 0}</h3>
              <p>My Registrations</p>
            </div>
            <div className="hero-stat-card">
              <h3>{categories.length - 1}</h3>
              <p>Sports Categories</p>
            </div>
          </div>
        </div>

        <div className="participant-hero-right">
          <div className="hero-promo-card">
            <span className="promo-badge">Live</span>
            <h2>Game On!</h2>
            <p>Tap any card to view full details and register instantly.</p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTERS ================= */}
      <section className="category-chip-section">
        <div className="section-header compact">
          <h2>Browse by Category</h2>
        </div>

        <div className="category-chips">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${
                selectedCategory === category ? "active-chip" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="participant-content">
        <EventSection
          title="Featured Tournaments"
          subtitle="Highlighted events for you"
          data={featuredTournaments}
        />

        <EventSection
          title="Cricket Tournaments"
          subtitle="Popular cricket competitions"
          data={cricketTournaments}
        />

        <EventSection
          title="Football Tournaments"
          subtitle="Upcoming football action"
          data={footballTournaments}
        />

        <EventSection
          title="Badminton Tournaments"
          subtitle="Smash your way to victory"
          data={badmintonTournaments}
        />

        <EventSection
          title="Chess Tournaments"
          subtitle="Strategy, skill and checkmate"
          data={chessTournaments}
        />

        <EventSection
          title="Popular Events"
          subtitle="Most explored tournaments"
          data={popularTournaments}
        />

        <EventSection
          title="Recently Added"
          subtitle="Freshly created by organizers"
          data={recentTournaments}
        />
      </div>
    </div>
  );
}

export default ParticipantHome;