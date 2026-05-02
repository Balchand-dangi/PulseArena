import React from "react";
import { useNavigate } from "react-router-dom";
import { eventImages } from "../../utils/eventImages";
import "./participantComponents.css";

function TournamentCard({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/participant/event/${item?.tournamentId}`, {
      state: { tournamentData: item },
    });
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date Not Available";
    const date = new Date(dateValue);
    return isNaN(date) ? dateValue : date.toDateString();
  };

  // 🔥 FINAL FIXED IMAGE LOGIC
const getCardImage = () => {
  const key = (item?.tournamentName || "").toLowerCase().trim();

  if (key.includes("cricket")) return eventImages.cricket;
  if (key.includes("football")) return eventImages.football;
  if (key.includes("badminton")) return eventImages.badminton;
  if (key.includes("chess")) return eventImages.chess;
  if (key.includes("kabaddi")) return eventImages.kabaddi;
  if (key.includes("karate")) return eventImages.karate;

  if (key.includes("bgmi")) return eventImages.bgmi;
  if (key.includes("free fire")) return eventImages.freefire;

  return eventImages.default;
};
// const getCardImage = () => {
//   const raw =
//     item?.category || item?.gameTitle || item?.sport || "";

//   const key = raw.toLowerCase();

//   // 🔥 smart matching
//   if (key.includes("cricket")) return eventImages.cricket;
//   if (key.includes("football")) return eventImages.football;
//   if (key.includes("chess")) return eventImages.chess;
//   if (key.includes("karate")) return eventImages.karate;
//   if (key.includes("bgmi") || key.includes("esports"))
//     return eventImages.bgmi;

//   return eventImages.default;
// };

  return (
    <div className="tournament-card premium-card" onClick={handleCardClick}>
      <div className="tournament-card-image-wrapper">
        <img
          src={getCardImage()}
          alt={item?.tournamentName || "Tournament"}
          className="tournament-card-image"
        />

        <div className="card-overlay-gradient"></div>

        <span className="status-badge">Open</span>

        <div className="image-bottom-label">
          {item?.gameTitle || item?.category || "Tournament"}
        </div>
      </div>

      <div className="tournament-card-body">
        <h3 className="tournament-title">
          {item?.tournamentName || "Untitled Tournament"}
        </h3>

        <p className="tournament-meta">
          📅 {formatDate(item?.tournamentDate)}
        </p>

        <p className="tournament-meta">
          📍 {item?.venue || "Venue Not Available"}
        </p>

        <p className="slots-text">
          👥 Slots: {item?.maxParticipants || "N/A"}
        </p>

        <button
          className="view-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Explore Event
        </button>
      </div>
    </div>
  );
}

export default TournamentCard;

