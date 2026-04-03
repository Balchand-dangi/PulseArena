import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavShow } from "../store/commonSlice.js";
import "../pages/Admin.css";

function AdminHome() {
  const adminObj = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminObj.status === 500 || adminObj.status === undefined) {
      navigate("/adminLogin");
    }
    dispatch(setNavShow("admin"));
  }, [adminObj.status, navigate, dispatch]);

  return (
    <div className="admin-page">
      <div className="admin-home-hero">
        <div className="admin-home-content">
          <p className="admin-badge">PulseArena Admin Panel</p>
          <h1 className="admin-main-title">
            Welcome {adminObj.loggedInEmail || "Admin"}
          </h1>
          <p className="admin-subtitle">
            {adminObj.message || "Manage the platform efficiently from one place."}
          </p>

          <div className="admin-home-card">
            <h3>Admin Responsibilities</h3>
            <p>
              As an administrator of the Sports & eSports Tournament Platform,
              you are responsible for managing organizers, monitoring tournaments,
              and ensuring fair and smooth operations across the system.
              This dashboard allows you to verify organizers, oversee registrations,
              and maintain platform integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;