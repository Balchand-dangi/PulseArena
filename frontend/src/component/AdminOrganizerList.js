import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavShow } from '../store/commonSlice.js';
import {
  adminVerifyOrganizerThunk,
  adminViewOrganizerListThunk
} from '../store/adminSlice.js';
import { tournamentImagePath } from '../utils.js';

function AdminOrganizerList() {

  const adminObj = useSelector(state => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ===== AUTH GUARD ===== */
  useEffect(() => {
    if (adminObj.status === 500 || adminObj.status === undefined) {
      navigate("/adminLogin");
    }
  }, [adminObj.status, navigate]);

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    dispatch(setNavShow("admin"));
    dispatch(adminViewOrganizerListThunk());
  }, [dispatch]);

  const handleSubmit = (email) => {
    dispatch(adminVerifyOrganizerThunk({ _id: email }));
  };

  return (
    <div>
      <br />
      <blockquote>
        <h2>Welcome {adminObj.loggedInEmail}</h2>
        <h3>{adminObj.message}</h3>

        {adminObj.organizerArray.length > 0 ? (
          <div>
            <h2>Organizer List</h2>

            <table
              style={{ fontSize: "14px" }}
              border={1}
              cellPadding={5}
              cellSpacing={0}
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Email</th>
                  <th>Organizer ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Game Category</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Logo</th>
                  <th>Email Verified</th>
                  <th>Admin Verify</th>
                </tr>
              </thead>

              <tbody>
                {adminObj.organizerArray.map((obj, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{obj._id}</td>
                    <td>{obj.organizerId}</td>
                    <td>{obj.organizerName}</td>
                    <td>{obj.contact}</td>
                    <td>{obj.gameCategory}</td>
                    <td>{obj.description}</td>
                    <td>{obj.address}</td>
                    <td>
                      <img
                        src={`${tournamentImagePath}/${obj.organizerLogo}`}
                        height="70"
                        width="70"
                        alt="organizerLogo"
                      />
                    </td>
                    <td>{String(obj.emailVerify)}</td>
                    <td>
                      {!obj.adminVerify ? (
                        <button
                          onClick={() => handleSubmit(obj._id)}
                          style={{
                            padding: "5px",
                            backgroundColor: "crimson",
                            color: "white",
                            cursor: "pointer"
                          }}
                        >
                          Verify
                        </button>
                      ) : (
                        "Verified"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>Data Not Found</div>
        )}
      </blockquote>
    </div>
  );
}

export default AdminOrganizerList;
