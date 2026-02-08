import React, { useState } from "react";
import organizerImg from "../images/organizerLogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { organizerRegistrationThunk } from "../store/organizerSlice.js";

function RegistrationOrganizer() {
const [organizerData, setOrganizerData] = useState({});
const dispatch = useDispatch();
const navigate = useNavigate();

const getData = (e) => {
let { name, value, type, files } = e.target;


if (type === "file") {
  value = files[0];
}

setOrganizerData({
  ...organizerData,
  [name]: value,
});


};

const handleSubmit = (e) => {
e.preventDefault();


const formData = new FormData();

Object.keys(organizerData).forEach((key) => {
  formData.append(key, organizerData[key]);
});

dispatch(organizerRegistrationThunk(formData));
navigate("/organizerLogin");
e.target.reset();


};

return ( <div className="auth-container">


  <div className="auth-image">
    <img src={organizerImg} alt="Organizer Registration" />
  </div>

  <div className="auth-form">
    <h2>Organizer Registration</h2>

    <form onSubmit={handleSubmit} encType="multipart/form-data">

      <input
        type="text"
        name="organizerName"
        placeholder="Enter Organizer Name"
        onChange={getData}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={getData}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={getData}
        required
      />

      <input
        type="text"
        name="contact"
        placeholder="Enter Mobile Number"
        onChange={getData}
        required
      />

      <select name="gameCategory" onChange={getData} required>
        <option value="">Select Game Category</option>
        <option>Cricket</option>
        <option>Football</option>
        <option>BGMI</option>
        <option>Valorant</option>
        <option>CSGO</option>
      </select>

      <textarea
        name="description"
        placeholder="Enter Description"
        onChange={getData}
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Enter Address"
        onChange={getData}
        required
      />

    <input
type="file"
name="organizerLogo"
onChange={getData}
/>

<div className="form-buttons">
  <input type="submit" value="Register" />
  <input type="reset" value="Reset" />
</div>

    </form>

    <Link to="/organizerLogin" id="registrationLink">
      Already Registered? Login Here
    </Link>
  </div>

</div>


);
}

export default RegistrationOrganizer;





// import React, { useState } from 'react';
// // import { createRoot } from 'react-dom/client';
// import organizerImg from '../images/organizerLogin.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { organizerRegistrationThunk } from '../store/organizerSlice.js';

// function RegistrationOrganizer() {

//     const [organizerData, setOrganizerData] = useState({});
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const getData = (event) => {
//         let { name, value } = event.target;

//         if (event.target.type === "file") {
//             value = event.target.files[0];
//         }

//         setOrganizerData({
//             ...organizerData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const formData = new FormData();
//         for (let key in organizerData) {
//             if (organizerData[key]) {
//                 formData.append(key, organizerData[key]);
//             }
//         }

//         dispatch(organizerRegistrationThunk(formData));
//         navigate("/organizerLogin");
//         event.target.reset();
//     };

//      return (
//   <div className="auth-container">

//     <div className="auth-image">
//       <img
//         src={organizerImg}
//         alt="Organizer Registration"
//       />
//     </div>

//     <div className="auth-form">
//       <h2>Organizer Registration</h2>
//       <br />

//       <form onSubmit={handleSubmit} encType="multipart/form-data">

//         <input
//           type="text"
//           placeholder="Enter Organizer Name"
//           name="organizerName"
//           onChange={getData}
//         /><br />

//         <input
//           type="email"
//           placeholder="Enter Email"
//           name="email"
//           onChange={getData}
//         /><br />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           name="password"
//           onChange={getData}
//         /><br />

//         <input
//           type="text"
//           placeholder="Enter 10-Digit Mobile Number"
//           name="contact"
//           onChange={getData}
//         /><br />

//         <select name="gameCategory" onChange={getData}>
//           <option value="">Select Game Category</option>
//           <option value="Cricket">Cricket</option>
//           <option value="Football">Football</option>
//           <option value="BGMI">BGMI</option>
//           <option value="Valorant">Valorant</option>
//           <option value="CSGO">CSGO</option>
//         </select>
//         <br />

//         <textarea
//           placeholder="Enter Organizer Description"
//           name="description"
//           onChange={getData}
//         ></textarea><br />

//         <input
//           type="text"
//           placeholder="Enter Address"
//           name="address"
//           onChange={getData}
//         /><br />

//         <input
//           type="file"
//           name="organizerLogo"
//           onChange={getData}
//         /><br />

//         <input type="submit" value="Register" /><br />
//         <input type="reset" value="Reset" />
//       </form>

//       <br />
//       <Link to="/organizerLogin" id="registrationLink">
//         Already Registered? Login Here
//       </Link>
//     </div>

//   </div>
// );

// }

// export default RegistrationOrganizer;
