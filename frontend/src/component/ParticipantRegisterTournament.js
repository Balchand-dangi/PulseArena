import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import participantImg from '../images/participantLogin.jpg';
import { registerTournamentThunk } from '../store/participantSlice';

function ParticipantRegisterTournament() {

    const participantObj = useSelector(state => state.participant);
    const [tournamentObj, setTournamentObj] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = (event) => {
        let { name, value } = event.target;

        if (event.target.type === "file") {
            value = event.target.files[0];
        }

        setTournamentObj({
            ...tournamentObj,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (let key in tournamentObj) {
            if (tournamentObj[key]) {
                formData.append(key, tournamentObj[key]);
            }
        }

        formData.append("participantEmailId", participantObj.loggedInEmail);

        dispatch(registerTournamentThunk(formData));
        navigate("/participantHome");
        event.target.reset();
    };

    return (
        <div>
            <div id="participantLeft">
                <h2>Welcome {participantObj.loggedInEmail}</h2>
                <img src={participantImg} id="participantLogin" alt="Participant" />
            </div>

            <div id="participantRight">
                <h2>Register Tournament</h2>
                <br />

                <form onSubmit={handleSubmit} encType="multipart/form-data">

                    <input
                        type="text"
                        placeholder="Enter Tournament Name"
                        name="tournamentName"
                        onChange={getData}
                    /><br />

                    <input
                        type="text"
                        placeholder="Enter Venue / Platform"
                        name="venue"
                        onChange={getData}
                    /><br />

                    <input
                        type="text"
                        placeholder="Enter Contact Number"
                        name="contact"
                        onChange={getData}
                    /><br />

                    <textarea
                        placeholder="Enter Game Details / Rules"
                        name="gameDetails"
                        onChange={getData}
                    ></textarea><br />

                    <input
                        type="number"
                        placeholder="Enter Total Slots"
                        name="totalSlots"
                        min={1}
                        onChange={getData}
                    /><br />

                    <input
                        type="date"
                        name="tournamentDate"
                        onChange={getData}
                    /><br />

                    <input
                        type="text"
                        placeholder="Enter Tournament Time"
                        name="tournamentTime"
                        onChange={getData}
                    /><br />

                    <select name="gameCategory" onChange={getData}>
                        <option value="">Select Game Category</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Football">Football</option>
                        <option value="BGMI">BGMI</option>
                        <option value="Valorant">Valorant</option>
                        <option value="CSGO">CSGO</option>
                    </select><br />

                    <input
                        type="file"
                        name="tournamentBanner"
                        onChange={getData}
                    /><br /><br />

                    <input type="submit" value="Register Tournament" /><br />
                    <input type="reset" value="Reset" />

                </form>
            </div>
        </div>
    );
}

export default ParticipantRegisterTournament;
