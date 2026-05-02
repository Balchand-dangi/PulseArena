import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavShow } from "../../store/commonSlice";
import {
  adminTournamentListThunk,
  adminViewOrganizerListThunk,
  adminVerifyOrganizerThunk
} from "../../store/adminSlice";
import "./adminPages.css";

function AdminDashboard() {
  const dispatch = useDispatch();
  const adminObj = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(setNavShow("admin"));
    dispatch(adminTournamentListThunk());
    dispatch(adminViewOrganizerListThunk());
  }, [dispatch]);

  const totalEvents = adminObj.tournamentArray?.length || 0;

  const totalRegistrations =
    adminObj.tournamentArray?.reduce(
      (total, event) => total + (event.registrations?.length || 0),
      0
    ) || 0;

  const openEvents =
    adminObj.tournamentArray?.filter((event) => event.registrationOpen).length || 0;

  const closedEvents = totalEvents - openEvents;

  const pendingOrganizers =
    adminObj.organizerArray?.filter((org) => org.accountStatus !== "approved").length || 0;

  const handleApprove = async (email) => {
    await dispatch(adminVerifyOrganizerThunk(email));
    dispatch(adminViewOrganizerListThunk());
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-badge">PulseArena Admin Panel</p>
          <h1 className="admin-main-title">Dashboard Overview</h1>
          <p className="admin-subtitle">
            Monitor events, registrations, and organizer approvals from one place.
          </p>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-label">Total Events</span>
          <h2>{totalEvents}</h2>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Total Registrations</span>
          <h2>{totalRegistrations}</h2>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Open Events</span>
          <h2 className="admin-success">{openEvents}</h2>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Closed Events</span>
          <h2 className="admin-danger">{closedEvents}</h2>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Pending Organizers</span>
          <h2 className="admin-warning">{pendingOrganizers}</h2>
        </div>
      </div>

      <div className="admin-grid-two">
        {/* ===== EVENTS TABLE ===== */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>All Events</h3>
            <span className="admin-chip">{totalEvents} Total</span>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Event Name</th>
                  <th>Venue</th>
                  <th>Registrations</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminObj.tournamentArray?.length > 0 ? (
                  adminObj.tournamentArray.map((event, index) => (
                    <tr key={event.tournamentId || index}>
                      <td>{index + 1}</td>
                      <td>{event.tournamentName}</td>
                      <td>{event.venue}</td>
                      <td>
                        {event.registrations?.length || 0} / {event.maxParticipants || "-"}
                      </td>
                      <td>
                        <span
                          className={
                            event.registrationOpen
                              ? "admin-status admin-status-open"
                              : "admin-status admin-status-closed"
                          }
                        >
                          {event.registrationOpen ? "Open" : "Closed"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="admin-empty-cell">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== ORGANIZER APPROVALS ===== */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Organizer Approvals</h3>
            <span className="admin-chip">{pendingOrganizers} Pending</span>
          </div>

          <div className="admin-approval-list">
            {adminObj.organizerArray?.length > 0 ? (
              adminObj.organizerArray.map((org, i) => (
                <div className="admin-approval-item" key={org.email || i}>
                  <div>
                    <h4>{org.organizerName || "Organizer"}</h4>
                    <p>{org.email}</p>
                    <span
                      className={
                        org.accountStatus === "approved"
                          ? "admin-status admin-status-approved"
                          : "admin-status admin-status-pending"
                      }
                    >
                      {org.accountStatus === "approved" ? "Approved" : "Pending"}
                    </span>
                  </div>

                  <div>
                    {org.accountStatus !== "approved" ? (
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => handleApprove(org.email)}
                      >
                        Approve
                      </button>
                    ) : (
                      <button className="admin-btn admin-btn-disabled" disabled>
                        Verified
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-empty-box">No organizers found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;