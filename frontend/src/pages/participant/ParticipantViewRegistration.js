import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavShow } from "../../store/commonSlice.js";
import { participantMyRegistrationsThunk } from "../../store/participantSlice.js";
import "./participantPages.css";

function ParticipantViewRegistration() {
  const participantObj = useSelector((state) => state.participant);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!participantObj.loggedInEmail) {
      navigate("/participantLogin");
    }
  }, [participantObj.loggedInEmail, navigate]);

  /* ================= NAVBAR + API ================= */
  useEffect(() => {
    if (participantObj.loggedInEmail) {
      dispatch(setNavShow("participant"));
      dispatch(participantMyRegistrationsThunk());
    }
  }, [dispatch, participantObj.loggedInEmail]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date Not Available";
    const date = new Date(dateValue);
    return isNaN(date) ? dateValue : date.toDateString();
  };

  return (
    <div className="participant-page-shell">
      <div className="participant-page-banner registration-banner">
        <div>
          <p className="participant-page-kicker">PulseArena</p>
          <h1>My Registrations</h1>
          <p className="participant-page-subtext">
            Your confirmed tournament entries, all in one place.
          </p>
        </div>
      </div>

      {participantObj.message && (
        <div
          className={`participant-alert ${
            participantObj.status === 200 ? "success-alert" : "error-alert"
          }`}
        >
          {participantObj.message}
        </div>
      )}

      <div className="participant-table-wrapper">
        <div className="participant-table-header">
          <div>
            <h2>Registered Events</h2>
            <p>{participantObj.registeredTournamentArray?.length || 0} registrations</p>
          </div>

          <div className="welcome-pill">
            Welcome {participantObj.loggedInEmail}
          </div>
        </div>

        {participantObj.registeredTournamentArray?.length > 0 ? (
          <div className="participant-table-scroll">
            <table className="participant-modern-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Slots</th>
                  <th>Poster</th>
                  <th>Organizer</th>
                </tr>
              </thead>

              <tbody>
                {participantObj.registeredTournamentArray.map((obj, index) => {
                  const registeredCount = obj.registrations?.length || 0;

                  return (
                    <tr key={obj.tournamentId}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="participant-event-cell">
                          <h4>{obj.tournamentName}</h4>
                          <p>{obj.description || "No description provided"}</p>
                        </div>
                      </td>

                      <td>
                        <span className="participant-type-pill">
                          {obj.eventType || "sports"}
                        </span>
                      </td>

                      <td>{obj.gameCategory}</td>
                      <td>{obj.venue}</td>
                      <td>{formatDate(obj.tournamentDate)}</td>
                      <td>{obj.reportingTime}</td>

                      <td>
                        <span className="slots-pill">
                          {registeredCount} / {obj.maxParticipants}
                        </span>
                      </td>

                      <td>
                        <img
                          src={obj.tournamentPoster}
                          alt="event"
                          className="participant-table-poster"
                        />
                      </td>

                      <td>
                        <div className="organizer-info">
                          <strong>{obj.organizerEmail}</strong>
                          <small>{obj.organizerContact}</small>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="participant-empty-state">
            <h3>No registered events yet</h3>
            <p>You haven’t joined any tournaments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParticipantViewRegistration;