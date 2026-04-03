import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavShow } from "../store/commonSlice.js";
import { organizerTournamentListThunk } from "../store/organizerSlice.js";

function TournamentList() {
  const organizerObj = useSelector((state) => state.organizer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavShow("organizer"));
    dispatch(organizerTournamentListThunk());
  }, [dispatch]);

  return (
    <div className="organizer-events-page">
      <section className="organizer-events-header">
        <div>
          <p className="organizer-hero-badge">My Events</p>
          <h1>PulseArena Organizer Dashboard</h1>
          <p>
            Welcome <strong>{organizerObj.loggedInEmail}</strong>. Here’s a clean
            overview of all the tournaments you’ve created.
          </p>
        </div>
      </section>

      {organizerObj.tournamentArray.length > 0 ? (
        <div className="organizer-table-shell">
          <div className="organizer-table-topbar">
            <div>
              <h2>Created Events</h2>
              <p>Track registrations, posters, status, and event details</p>
            </div>

            <div className="table-count-pill">
              {organizerObj.tournamentArray.length} Event
              {organizerObj.tournamentArray.length > 1 ? "s" : ""}
            </div>
          </div>

          <div className="organizer-table-wrapper">
            <table className="organizer-premium-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Registrations</th>
                  <th>Status</th>
                  <th>Poster</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {organizerObj.tournamentArray.map((obj, index) => {
                  const registeredCount = obj.registrations?.length || 0;
                  const remainingSlots = obj.maxParticipants - registeredCount;

                  return (
                    <tr key={obj.tournamentId}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="event-cell">
                          <h4>{obj.tournamentName}</h4>
                          <p>{obj.description || "No description available"}</p>
                        </div>
                      </td>

                      <td>
                        <span className="event-type-badge">
                          {obj.eventType || "sports"}
                        </span>
                      </td>

                      <td>{obj.gameCategory}</td>
                      <td>{obj.venue}</td>
                      <td>{obj.tournamentDate}</td>
                      <td>{obj.reportingTime}</td>

                      <td>
                        <div className="registration-cell">
                          <strong>
                            {registeredCount} / {obj.maxParticipants}
                          </strong>
                          <span>{remainingSlots} slots left</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            obj.registrationOpen
                              ? "status-pill open"
                              : "status-pill closed"
                          }
                        >
                          {obj.registrationOpen ? "Open" : "Closed"}
                        </span>
                      </td>

                      <td>
                        <div className="poster-cell">
                          <img src={obj.tournamentPoster} alt="poster" />
                        </div>
                      </td>

                      <td>{obj.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="organizer-empty-state">
          <h3>No events created yet</h3>
          <p>
            Start by creating your first tournament and make your organizer
            dashboard come alive.
          </p>
        </div>
      )}
    </div>
  );
}

export default TournamentList;