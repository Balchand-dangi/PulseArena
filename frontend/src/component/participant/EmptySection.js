import React from "react";
import "./participantStyles.css";

function EmptySection({ title }) {
  return (
    <div className="empty-section">
      <h3>No {title} Available</h3>
      <p>Organizers haven’t added anything here yet.</p>
    </div>
  );
}

export default EmptySection;