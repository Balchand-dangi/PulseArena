// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import jscookie from "js-cookie";
// import { setNavShow } from "../store/commonSlice";

// function Navbar() {
//   const navObj = useSelector((state) => state.common);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logout = (type) => {
//     // remove token + email properly
//     jscookie.remove(`${type}TokenData`);
//     jscookie.remove(`${type}Email`);

//     // reset navbar to home
//     dispatch(setNavShow("home"));

//     // redirect to landing homepage
//     navigate("/");
//   };

//   const renderLinks = () => {
//     switch (navObj.navShow) {
//       /* ================= PARTICIPANT ================= */
//       case "participant":
//         return (
//           <>
//             <Link to="/participantHome" className="nav-item">
//               Home
//             </Link>

//             <Link to="/registerTournament" className="nav-item">
//               Explore Events
//             </Link>

//             <Link to="/participantViewRegistration" className="nav-item">
//               My Registrations
//             </Link>

//             <span
//               className="nav-item logout"
//               onClick={() => logout("participant")}
//             >
//               Logout
//             </span>
//           </>
//         );

//       /* ================= ORGANIZER ================= */
//       case "organizer":
//         return (
//           <>
//             <Link to="/organizerHome" className="nav-item">
//               Home
//             </Link>

//             <Link to="/createTournament" className="nav-item">
//               Create Event
//             </Link>

//             <Link to="/organizerTournamentList" className="nav-item">
//               My Events
//             </Link>

//             <span
//               className="nav-item logout"
//               onClick={() => logout("organizer")}
//             >
//               Logout
//             </span>
//           </>
//         );

//       /* ================= ADMIN ================= */
//       case "admin":
//         return (
//           <>
//             <Link to="/adminDashboard" className="nav-item">
//               Dashboard
//             </Link>

//             <Link to="/adminOrganizerList" className="nav-item">
//               Organizers
//             </Link>

//             <span
//               className="nav-item logout"
//               onClick={() => logout("admin")}
//             >
//               Logout
//             </span>
//           </>
//         );

//       /* ================= DEFAULT (NOT LOGGED IN) ================= */
//       default:
//         return (
//           <>
//             <Link to="/" className="nav-item">
//               Home
//             </Link>

//             <Link to="/participantLogin" className="nav-item">
//               Participant
//             </Link>

//             <Link to="/organizerLogin" className="nav-item">
//               Organizer
//             </Link>

//             <a href="/#about" className="nav-item">
//               About
//             </a>

//             <a href="/#contact" className="nav-item">
//               Contact
//             </a>
//           </>
//         );
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* Branding */}
//         <div className="nav-logo">PulseArena</div>

//         <div className="nav-links">{renderLinks()}</div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jscookie from "js-cookie";
import { setNavShow } from "../store/commonSlice";

function Navbar() {
  const navObj = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = (type) => {
    jscookie.remove(`${type}TokenData`);
    jscookie.remove(`${type}Email`);

    dispatch(setNavShow("home"));
    navigate("/");
  };

  const getNavClass = (path) => {
    return location.pathname === path ? "nav-item active-nav" : "nav-item";
  };

  const renderLinks = () => {
    switch (navObj.navShow) {
      /* ================= PARTICIPANT ================= */
      case "participant":
        return (
          <>
            <Link to="/participantHome" className={getNavClass("/participantHome")}>
              Home
            </Link>

            <Link to="/registerTournament" className={getNavClass("/registerTournament")}>
              Explore Events
            </Link>

            <Link
              to="/participantViewRegistration"
              className={getNavClass("/participantViewRegistration")}
            >
              My Registrations
            </Link>

            <span
              className="nav-item logout"
              onClick={() => logout("participant")}
            >
              Logout
            </span>
          </>
        );

      /* ================= ORGANIZER ================= */
      case "organizer":
        return (
          <>
            <Link to="/organizerHome" className={getNavClass("/organizerHome")}>
              Home
            </Link>

            <Link to="/createTournament" className={getNavClass("/createTournament")}>
              Create Event
            </Link>

            <Link
              to="/organizerTournamentList"
              className={getNavClass("/organizerTournamentList")}
            >
              My Events
            </Link>

            <span
              className="nav-item logout"
              onClick={() => logout("organizer")}
            >
              Logout
            </span>
          </>
        );

      /* ================= ADMIN ================= */
      case "admin":
        return (
          <>
            <Link to="/adminDashboard" className={getNavClass("/adminDashboard")}>
              Dashboard
            </Link>

            <Link to="/adminOrganizerList" className={getNavClass("/adminOrganizerList")}>
              Organizers
            </Link>

            <span
              className="nav-item logout"
              onClick={() => logout("admin")}
            >
              Logout
            </span>
          </>
        );

      /* ================= DEFAULT (NOT LOGGED IN) ================= */
      default:
        return (
          <>
            <Link to="/" className={getNavClass("/")}>
              Home
            </Link>

            <Link to="/participantLogin" className={getNavClass("/participantLogin")}>
              Participant
            </Link>

            <Link to="/organizerLogin" className={getNavClass("/organizerLogin")}>
              Organizer
            </Link>

            <Link to="/about" className={getNavClass("/about")}>
              About
            </Link>

            <Link to="/contact" className={getNavClass("/contact")}>
              Contact
            </Link>
          </>
        );
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          PulseArena
        </Link>

        <div className="nav-links">{renderLinks()}</div>
      </div>
    </nav>
  );
}

export default Navbar;