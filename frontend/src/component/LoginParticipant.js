import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';
import participantLoginImg from '../images/participantLogin.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { participantLoginThunk } from '../store/participantSlice.js';

function LoginParticipant() {

    const participantObj = useSelector(state => state.participant);
    const [participantData, setParticipantData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = (event) => {
        const { name, value } = event.target;
        setParticipantData({
            ...participantData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(participantLoginThunk(participantData));
        navigate('/participantHome');
        event.target.reset();
    };

    return (
       <div className="auth-container">

    <div className="auth-image">
      <img src={participantLoginImg} alt="Participant Login" />
    </div>

    <div className="auth-form">
      <h2>Participant Login</h2>
      <br />

      {participantObj.message}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={getData}
        /><br />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={getData}
        /><br /><br />

        <input type="submit" value="Login" /><br />
        <input type="reset" value="Reset" />
      </form>

      <br />
      <Link to="/participantRegistration" id="registrationLink">
        Yet Not Registered? Register Here
      </Link>
    </div>

  </div>
);
}

export default LoginParticipant;
