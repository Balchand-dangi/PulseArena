import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jscookie from "js-cookie";
import { setNavShow } from "../store/commonSlice.js";
import {
  adminVerifyOrganizerThunk,
  adminViewOrganizerListThunk
} from "../store/adminSlice.js";
import { tournamentImagePath } from "../utils.js";
import "../pages/Admin.css";

function AdminOrganizerList() {
  const adminObj = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState({});

  useEffect(() => {
    const token = jscookie.get("adminTokenData");
    if (!token) {
      navigate("/adminLogin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(setNavShow("admin"));
      await dispatch(adminViewOrganizerListThunk());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleSubmit = async (email) => {
    await dispatch(adminVerifyOrganizerThunk(email));
    dispatch(adminViewOrganizerListThunk());
  };

  const getOrganizerLogo = (logo) => {
    if (!logo || typeof logo !== "string") return null;

    const trimmedLogo = logo.trim();
    if (!trimmedLogo) return null;

    if (trimmedLogo.startsWith("http://") || trimmedLogo.startsWith("https://")) {
      return trimmedLogo;
    }

    const looksLikeLocalFile =
      trimmedLogo.includes(".png") ||
      trimmedLogo.includes(".jpg") ||
      trimmedLogo.includes(".jpeg") ||
      trimmedLogo.includes(".webp");

    if (looksLikeLocalFile) {
      return `${tournamentImagePath}/${trimmedLogo}`;
    }

    return null;
  };

  const adminEmail =
    adminObj.loggedInEmail || jscookie.get("adminEmail") || "Admin";

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-badge">PulseArena Admin Panel</p>
          <h1 className="admin-main-title">Organizer Management</h1>
          <p className="admin-subtitle">
            Welcome {adminEmail}. Review, verify, and manage organizer accounts.
          </p>
        </div>
      </div>

      {adminObj.message && (
        <div
          className={`admin-alert ${
            adminObj.status === 200 ? "admin-alert-success" : "admin-alert-error"
          }`}
        >
          {adminObj.message}
        </div>
      )}

      {loading ? (
        <div className="admin-loader-box">Loading organizers...</div>
      ) : adminObj.organizerArray?.length > 0 ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Organizer List</h3>
            <span className="admin-chip">
              {adminObj.organizerArray.length} Organizers
            </span>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table admin-organizer-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Email</th>
                  <th>Organizer ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Logo</th>
                  <th>Email Verified</th>
                  <th>Admin Verify</th>
                </tr>
              </thead>

              <tbody>
                {adminObj.organizerArray.map((obj, index) => {
                  const logoUrl = getOrganizerLogo(obj.organizerLogo);
                  const imageKey = obj.organizerId || obj.email || index;
                  const isBroken = brokenImages[imageKey];

                  return (
                    <tr key={imageKey}>
                      <td>{index + 1}</td>
                      <td>{obj.email}</td>
                      <td>{obj.organizerId}</td>
                      <td>{obj.organizerName}</td>
                      <td>{obj.contact}</td>
                      <td>{obj.gameCategory}</td>
                      <td className="admin-description-cell">{obj.description}</td>
                      <td>{obj.address}</td>

                      <td>
                        {logoUrl && !isBroken ? (
                          <img
                            src={logoUrl}
                            alt="organizerLogo"
                            className="admin-logo-image"
                            onError={() => {
                              setBrokenImages((prev) => ({
                                ...prev,
                                [imageKey]: true
                              }));
                            }}
                          />
                        ) : (
                          <div className="admin-no-logo">No Logo</div>
                        )}
                      </td>

                      <td>
                        {obj.emailVerified ? (
                          <span className="admin-status admin-status-approved">
                            Verified
                          </span>
                        ) : (
                          <span className="admin-status admin-status-closed">
                            Not Verified
                          </span>
                        )}
                      </td>

                      <td>
                        {obj.accountStatus !== "approved" ? (
                          <button
                            className="admin-btn admin-btn-primary"
                            onClick={() => handleSubmit(obj.email)}
                          >
                            Verify
                          </button>
                        ) : (
                          <span className="admin-status admin-status-approved">
                            Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-empty-box">No organizer data found.</div>
      )}
    </div>
  );
}

export default AdminOrganizerList;