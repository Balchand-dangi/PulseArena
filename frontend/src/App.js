import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Cookies from "js-cookie";

import Header from "./component/Header.js";
import Navbar from "./component/Navbar.js";
import Home from "./component/Home.js";
import About from "./component/About.js";
import Contact from "./component/Contact.js";
import Footer from "./component/Footer.js";

import LoginParticipant from "./component/LoginParticipant.js";
import LoginOrganizer from "./component/LoginOrganizer.js";
import LoginAdmin from "./component/LoginAdmin.js";

import RegistrationParticipant from "./component/RegistrationParticipant.js";
import RegistrationOrganizer from "./component/RegistrationOrganizer.js";

import ParticipantHome from "./component/ParticipantHome.js";
import RegisterTournament from "./component/RegisterTournament.js";
import ParticipantViewRegistration from "./component/ParticipantViewRegistration.js";

import OrganizerHome from "./component/OrganizerHome.js";
import OrganizerCreateTournament from "./component/OrganizerCreateTournament.js";
import TournamentList from "./component/TournamentList.js";

import AdminHome from "./component/AdminHome.js";
import AdminOrganizerList from "./component/AdminOrganizerList.js";
import AdminDashboard from "./component/AdminDashboard";

import VerifyParticipantOtp from "./component/VerifyParticipantOtp.js";
import VerifyOrganizerOTP from "./component/VerifyOrganizerOTP.js";

import ParticipantEventDetails from "./pages/ParticipantEventDetails.js";

import { setNavShow } from "./store/commonSlice.js";

/* ================= PROTECTED ROUTES ================= */

const AdminRoute = ({ children }) => {
  const token = Cookies.get("adminTokenData");
  return token ? children : <Navigate to="/adminLogin" />;
};

const ParticipantRoute = ({ children }) => {
  const token = Cookies.get("participantTokenData");
  return token ? children : <Navigate to="/participantLogin" />;
};

const OrganizerRoute = ({ children }) => {
  const token = Cookies.get("organizerTokenData");
  return token ? children : <Navigate to="/organizerLogin" />;
};

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();

  /* ================= HIDE HEADER/NAV ON OTP PAGES ================= */
  const hideLayout =
    location.pathname === "/verifyParticipantOtp" ||
    location.pathname === "/verifyOrganizerOTP";

  /* ================= AUTO RESTORE NAVBAR STATE ================= */
  useEffect(() => {
    const participantToken = Cookies.get("participantTokenData");
    const organizerToken = Cookies.get("organizerTokenData");
    const adminToken = Cookies.get("adminTokenData");

    if (participantToken) {
      dispatch(setNavShow("participant"));
    } else if (organizerToken) {
      dispatch(setNavShow("organizer"));
    } else if (adminToken) {
      dispatch(setNavShow("admin"));
    } else {
      dispatch(setNavShow("home"));
    }
  }, [dispatch, location.pathname]);

  return (
    <div id="container">
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/adminLogin" element={<LoginAdmin />} />
        <Route path="/participantLogin" element={<LoginParticipant />} />
        <Route path="/organizerLogin" element={<LoginOrganizer />} />

        <Route
          path="/participantRegistration"
          element={<RegistrationParticipant />}
        />
        <Route
          path="/organizerRegistration"
          element={<RegistrationOrganizer />}
        />

        <Route
          path="/verifyParticipantOtp"
          element={<VerifyParticipantOtp />}
        />
        <Route path="/verifyOrganizerOTP" element={<VerifyOrganizerOTP />} />

        {/* ================= PARTICIPANT ROUTES ================= */}
        <Route
          path="/participantHome"
          element={
            <ParticipantRoute>
              <ParticipantHome />
            </ParticipantRoute>
          }
        />

        <Route
          path="/participant/event/:id"
          element={
            <ParticipantRoute>
              <ParticipantEventDetails />
            </ParticipantRoute>
          }
        />

        <Route
          path="/registerTournament"
          element={
            <ParticipantRoute>
              <RegisterTournament />
            </ParticipantRoute>
          }
        />

        <Route
          path="/participantViewRegistration"
          element={
            <ParticipantRoute>
              <ParticipantViewRegistration />
            </ParticipantRoute>
          }
        />

        {/* ================= ORGANIZER ROUTES ================= */}
        <Route
          path="/organizerHome"
          element={
            <OrganizerRoute>
              <OrganizerHome />
            </OrganizerRoute>
          }
        />

        <Route
          path="/createTournament"
          element={
            <OrganizerRoute>
              <OrganizerCreateTournament />
            </OrganizerRoute>
          }
        />

        <Route
          path="/organizerTournamentList"
          element={
            <OrganizerRoute>
              <TournamentList />
            </OrganizerRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/adminHome"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />

        <Route
          path="/adminOrganizerList"
          element={
            <AdminRoute>
              <AdminOrganizerList />
            </AdminRoute>
          }
        />

        <Route
          path="/adminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ================= FOOTER ONLY ON HOME ================= */}
      {!hideLayout && location.pathname === "/" && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;