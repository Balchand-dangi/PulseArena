import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavShow } from '../store/commonSlice.js';
import {
    organizerTournamentListThunk,
    organizerAcceptTournamentThunk
} from '../store/organizerSlice.js';
import { tournamentImagePath } from '../utils.js';

function TournamentList() {

    const organizerObj = useSelector(state => state.organizer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (organizerObj.status === 500 || organizerObj.status === undefined)
        navigate("/organizerLogin");

    useEffect(() => {
        dispatch(setNavShow("organizer"));
        dispatch(organizerTournamentListThunk());
    }, []);

    const handleSubmit = (tournamentId) => {
        const obj = {
            tournamentId,
            organizerEmail: organizerObj.loggedInEmail
        };
        dispatch(organizerAcceptTournamentThunk(obj));
    };

    return (
        <div>
            <br />
            <blockquote>
                <br />
                <h2>Welcome {organizerObj.loggedInEmail}</h2>
                <br />
                <h2>{organizerObj.message}</h2>

                {organizerObj.tournamentArray.length !== 0 ?
                    <div>
                        <h2>Tournament List</h2>
                        <br />

                        <table
                            style={{ fontSize: "14px" }}
                            border={1}
                            cellPadding={5}
                            cellSpacing={0}
                        >
                            <tr>
                                <th>S.No</th>
                                <th>Tournament ID</th>
                                <th>Creator</th>
                                <th>Tournament Name</th>
                                <th>Contact</th>
                                <th>Venue / Platform</th>
                                <th>Game Details</th>
                                <th>Total Slots</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Game Category</th>
                                <th>Banner</th>
                                <th>Posted At</th>
                                <th>Status</th>
                            </tr>

                            {organizerObj.tournamentArray.map((obj, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{obj.tournamentId}</td>
                                        <td>{obj.userId}</td>
                                        <td>{obj.tournamentName}</td>
                                        <td>{obj.contact}</td>
                                        <td>{obj.venue}</td>
                                        <td>{obj.gameDetails}</td>
                                        <td>{obj.totalSlots}</td>
                                        <td>{obj.tournamentDate}</td>
                                        <td>{obj.tournamentTime}</td>
                                        <td>{obj.gameCategory}</td>
                                        <td>
                                            <img
                                                src={tournamentImagePath + `/${obj.tournamentBanner}`}
                                                height="70"
                                                width="70"
                                                alt="tournamentBanner"
                                            />
                                        </td>
                                        <td>{obj.createdAt}</td>
                                        <td>
                                            {obj.organizerId === "" ?
                                                <form
                                                    onSubmit={() => {
                                                        handleSubmit(obj.tournamentId);
                                                    }}
                                                >
                                                    <button
                                                        style={{
                                                            padding: "5px",
                                                            backgroundColor: "crimson",
                                                            color: "white"
                                                        }}
                                                    >
                                                        Activate
                                                    </button>
                                                </form>
                                                : "Closed"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    : <div>Data Not Found</div>
                }
            </blockquote>
        </div>
    );
}

export default TournamentList;
