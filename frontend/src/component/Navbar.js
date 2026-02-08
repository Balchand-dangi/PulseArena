import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jscookie from "js-cookie";
import { setNavShow } from "../store/commonSlice";

function Navbar() {
  const navObj = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (type) => {
    jscookie.remove(`${type}TokenData`);
    jscookie.set(`${type}Email`, null);
    dispatch(setNavShow("home"));
    navigate("/");
  };

  const renderLinks = () => {
    switch (navObj.navShow) {
      case "participant":
        return (
          <>
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/registerTournament" className="nav-item">Register</Link>
            <Link to="/participantViewRegistration" className="nav-item">My Tournaments</Link>
            <span className="nav-item logout" onClick={() => logout("participant")}>
              Logout
            </span>
          </>
        );

      case "organizer":
        return (
          <>
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/organizerTournamentList" className="nav-item">My Tournaments</Link>
            <span className="nav-item logout" onClick={() => logout("organizer")}>
              Logout
            </span>
          </>
        );

      case "admin":
        return (
          <>
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/adminOrganizerList" className="nav-item">Organizers</Link>
            <span className="nav-item logout" onClick={() => logout("admin")}>
              Logout
            </span>
          </>
        );

      default:
        return (
          <>
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/participantLogin" className="nav-item">Participant</Link>
            <Link to="/organizerLogin" className="nav-item">Organizer</Link>
            <a href="/#about" className="nav-item">About</a>
            <a href="/#contact" className="nav-item">Contact</a>
            {/* <Link to="/" className="nav-item">About</Link>
            <Link to="/" className="nav-item">Contact</Link> */}
          </>
        );
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-logo">
          Sports Arena
        </div>

        <div className="nav-links">
          {renderLinks()}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;








// import React, { useEffect, useState } from 'react';
// // import { createRoot } from 'react-dom/client';
// import { useDispatch, useSelector } from 'react-redux';
// import '../style.css';
// import { Link, useNavigate } from 'react-router-dom';
// import jscookie from 'js-cookie';
// import { setNavShow } from '../store/commonSlice';

// const participantTokenData = jscookie.get("participantTokenData");

// function Navbar() {

//     const [navBar, setNavBar] = useState();
//     const navObj = useSelector(state => state.common);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     /* ========= PARTICIPANT LOGOUT ========= */
//     const participantLogout = () => {
//         jscookie.set("participantEmail", null);
//         jscookie.remove("participantTokenData");
//         dispatch(setNavShow("home"));
//         navigate("/");
//     };

//     /* ========= ORGANIZER LOGOUT ========= */
//     const organizerLogout = () => {
//         jscookie.set("organizerEmail", null);
//         jscookie.remove("organizerTokenData");
//         dispatch(setNavShow("home"));
//         navigate("/");
//     };

//     /* ========= ADMIN LOGOUT ========= */
//     const adminLogout = () => {
//         jscookie.set("adminEmail", null);
//         jscookie.remove("adminTokenData");
//         dispatch(setNavShow("home"));
//         navigate("/");
//     };

//     useEffect(() => {
//         const timer = setInterval(() => {

//             /* ===== HOME NAV ===== */
//             if (navObj.navShow === "home") {
//                 setNavBar(
//                     <div id="section">
//                         <Link id="navOp" to="/">Home</Link>
//                         <Link id="navOp" to="/participantLogin">Participant</Link>
//                         <Link id="navOp" to="/organizerLogin">Organizer</Link>
//                         <Link id="navOp" to="/">About</Link>
//                         <Link id="navOp" to="/">Contact</Link>
//                     </div>
//                 );
//             }

//             /* ===== PARTICIPANT NAV ===== */
//             else if (navObj.navShow === "participant") {
//                 setNavBar(
//                     <div id="section">
//                         <Link id="navOp" to="/">Home</Link>
//                         <Link id="navOp" to="/registerTournament">Register</Link>
//                         <Link id="navOp" to="/participantViewRegistration">My Tournaments</Link>
//                         <Link id="navOp" to="/">Blog</Link>
//                         <Link id="navOp" to="/">Profile</Link>
//                         <span id="navOp" onClick={participantLogout}>Logout</span>
//                     </div>
//                 );
//             }

//             /* ===== ADMIN NAV ===== */
//             else if (navObj.navShow === "admin") {
//                 setNavBar(
//                     <div id="section">
//                         <Link id="navOp" to="/">Home</Link>
//                         <Link id="navOp" to="/adminOrganizerList">Organizers</Link>
//                         <Link id="navOp" to="/tournamentList">Tournaments</Link>
//                         <Link id="navOp" to="/">Blog</Link>
//                         <Link id="navOp" to="/">Profile</Link>
//                         <span id="navOp" onClick={adminLogout}>Logout</span>
//                     </div>
//                 );
//             }

//             /* ===== ORGANIZER NAV ===== */
//             else if (navObj.navShow === "organizer") {
//                 setNavBar(
//                     <div id="section">
//                         <Link id="navOp" to="/">Home</Link>
//                         <Link id="navOp" to="/organizerTournamentList">My Tournaments</Link>
//                         <Link id="navOp" to="/">Participants</Link>
//                         <Link id="navOp" to="/">Profile</Link>
//                         <span id="navOp" onClick={organizerLogout}>Logout</span>
//                     </div>
//                 );
//             }

//         }, 300);

//         return () => clearInterval(timer);
//     }, [navObj.navShow]);

//     return (
//         <div id="nav">
//             {navBar}
//         </div>
//     );
// }

// export default Navbar;
