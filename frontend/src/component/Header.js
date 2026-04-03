import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style.css";

function Header() {
  const navigate = useNavigate();
  const navObj = useSelector((state) => state.common);

  const handleLogoClick = () => {
    if (navObj.navShow === "participant") {
      navigate("/participantHome");
    } else if (navObj.navShow === "organizer") {
      navigate("/organizerHome");
    } else if (navObj.navShow === "admin") {
      navigate("/adminDashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div id="header" style={{ cursor: "pointer" }} onClick={handleLogoClick}>
      <h1>
        <span id="heading">PulseArena</span>
      </h1>
    </div>
  );
}

export default Header;