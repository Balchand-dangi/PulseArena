import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  participantTournamentListThunk,
  participantRegisterTournamentThunk,
  participantMyRegistrationsThunk
} from "../../store/participantSlice";
import { setNavShow } from "../../store/commonSlice";
import "./participantPages.css";

function RegisterTournament() {
  const dispatch = useDispatch();
  const participantObj = useSelector((state) => state.participant);

  useEffect(() => {
    dispatch(setNavShow("participant"));
    dispatch(participantTournamentListThunk());
    dispatch(participantMyRegistrationsThunk());
  }, [dispatch]);

  const handleRegister = async (tournamentId) => {
    await dispatch(participantRegisterTournamentThunk(String(tournamentId)));
    dispatch(participantTournamentListThunk());
    dispatch(participantMyRegistrationsThunk());
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date Not Available";
    const date = new Date(dateValue);
    return isNaN(date) ? dateValue : date.toDateString();
  };

  return (
    <div className="participant-page-shell">
      <div className="participant-page-banner explore-banner">
        <div>
          <p className="participant-page-kicker">PulseArena</p>
          <h1>Explore Events</h1>
          <p className="participant-page-subtext">
            Discover tournaments, secure your spot, and join the competition.
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
            <h2>Available Events</h2>
            <p>{participantObj.tournamentArray.length} events found</p>
          </div>
        </div>

        {participantObj.tournamentArray.length > 0 ? (
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
                  <th>Register</th>
                </tr>
              </thead>

              <tbody>
                {participantObj.tournamentArray.map((t, index) => {
                  const alreadyRegistered = t.registrations?.some(
                    (r) => r.participantEmail === participantObj.loggedInEmail
                  );

                  const remainingSlots =
                    t.maxParticipants - (t.registrations?.length || 0);

                  return (
                    <tr key={t.tournamentId}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="participant-event-cell">
                          <h4>{t.tournamentName}</h4>
                          <p>{t.description || "No description available"}</p>
                        </div>
                      </td>

                      <td>
                        <span className="participant-type-pill">
                          {t.eventType || "sports"}
                        </span>
                      </td>

                      <td>{t.gameCategory}</td>
                      <td>{t.venue}</td>
                      <td>{formatDate(t.tournamentDate)}</td>
                      <td>{t.reportingTime}</td>

                      <td>
                        <span className="slots-pill">
                          {remainingSlots} / {t.maxParticipants}
                        </span>
                      </td>

                      <td>
                        <button
                          disabled={!t.registrationOpen || alreadyRegistered}
                          onClick={() => handleRegister(t.tournamentId)}
                          className={`participant-action-btn ${
                            !t.registrationOpen
                              ? "btn-disabled"
                              : alreadyRegistered
                              ? "btn-registered"
                              : "btn-register"
                          }`}
                        >
                          {!t.registrationOpen
                            ? "Full"
                            : alreadyRegistered
                            ? "Registered"
                            : "Register"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="participant-empty-state">
            <h3>No events available</h3>
            <p>Looks like organizers haven’t published tournaments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterTournament;