import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavShow } from '../store/commonSlice.js';
import { participantTournamentListThunk } from '../store/participantSlice.js';
import { tournamentImagePath } from '../utils.js';

function ParticipantViewRegistration() {

  const participantObj = useSelector(state => state.participant);
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
      dispatch(
        participantTournamentListThunk({
          email: participantObj.loggedInEmail
        })
      );
    }
  }, [dispatch, participantObj.loggedInEmail]);

  return (
    <div>
      <br />
      <blockquote>
        <h2>Welcome {participantObj.loggedInEmail}</h2>
        <h3>{participantObj.message}</h3>

        {participantObj.tournamentArray?.length > 0 ? (
          <div>
            <h2>Your Tournament Registrations</h2>
            <br />

            <table border={1} cellPadding={5} cellSpacing={0}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Tournament ID</th>
                  <th>Tournament Name</th>
                  <th>Venue / Platform</th>
                  <th>Game</th>
                  <th>Slots</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Category</th>
                  <th>Banner</th>
                  <th>Organizer</th>
                </tr>
              </thead>

              <tbody>
                {participantObj.tournamentArray.map((obj, index) => (
                  <tr key={obj.tournamentId}>
                    <td>{index + 1}</td>
                    <td>{obj.tournamentId}</td>
                    <td>{obj.tournamentName}</td>
                    <td>{obj.venue}</td>
                    <td>{obj.gameDetails}</td>
                    <td>{obj.totalSlots}</td>
                    <td>{obj.tournamentDate}</td>
                    <td>{obj.tournamentTime}</td>
                    <td>{obj.gameCategory}</td>
                    <td>
                      <img
                        src={`${tournamentImagePath}/${obj.tournamentBanner}`}
                        width="70"
                        height="70"
                        alt="tournament"
                      />
                    </td>
                    <td>
                      {obj.organizerName ? (
                        <>
                          {obj.organizerName}
                          <br />
                          ({obj.organizerContact})
                        </>
                      ) : (
                        "Pending"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No registrations found</div>
        )}
      </blockquote>
    </div>
  );
}

export default ParticipantViewRegistration;
