import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavShow } from '../store/commonSlice.js';

function OrganizerHome() {

    const organizerObj = useSelector(state => state.organizer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

     useEffect(() => {
  if (organizerObj.status === 500 || organizerObj.status === undefined) {
    navigate("/organizerLogin");
  }
}, [organizerObj.status, navigate]);

useEffect(() => {
  dispatch(setNavShow("organizer"));
}, [dispatch]);


    return (
        <div>
            <br />
            <blockquote>
                <br />
                <h2>Welcome {organizerObj.loggedInEmail}</h2>
                <br />
                <h2>{organizerObj.message}</h2>

                <p>
                    Welcome to the Organizer Dashboard of the Sports & eSports
                    Tournament Platform. From here, you can manage tournaments,
                    review participant registrations, and ensure smooth execution
                    of sports and eSports events hosted by you.
                </p>
            </blockquote>
        </div>
    );
}

export default OrganizerHome;
