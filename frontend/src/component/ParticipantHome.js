import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavShow } from '../store/commonSlice.js';

function ParticipantHome() {

    const participantObj = useSelector(state => state.participant);
    const navigate = useNavigate();
    const dispatch = useDispatch();

   useEffect(() => {
  if (participantObj.status === 500 || participantObj.status === undefined) {
    navigate("/participantLogin");
  }
}, [participantObj.status, navigate]);

useEffect(() => {
  dispatch(setNavShow("participant"));
}, [dispatch]);

    useEffect(() => {
        dispatch(setNavShow("participant"));
    });

    return (
        <div>
            <br />
            <blockquote>
                <br />
                <h2>Welcome {participantObj.loggedInEmail}</h2>
                <br />
                <h2>{participantObj.message}</h2>

                <p>
                    Welcome to the Sports & eSports Tournament Platform.
                    Here you can browse upcoming tournaments, register for events,
                    track your registrations, and participate in competitive sports
                    and eSports events seamlessly through a single platform.
                </p>
            </blockquote>
        </div>
    );
}

export default ParticipantHome;
