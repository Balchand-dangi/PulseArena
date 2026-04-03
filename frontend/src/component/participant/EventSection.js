import React from "react";
import TournamentCard from "./TournamentCard";
import EmptySection from "./EmptySection";
import "./participantStyles.css";

function EventSection({ title, subtitle, data = [] }) {
  return (
    <section className="event-section">
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      </div>

      {data.length > 0 ? (
        <div className="event-scroll-row">
          {data.map((item, index) => (
            <TournamentCard
              key={item?.tournamentId || index}
              item={item}
            />
          ))}
        </div>
      ) : (
        <EmptySection title={title} />
      )}
    </section>
  );
}

export default EventSection;