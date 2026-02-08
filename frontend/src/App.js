import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './component/Header.js';
import Navbar from './component/Navbar.js';
import Home from './component/Home.js';

import LoginParticipant from './component/LoginParticipant.js';
import LoginOrganizer from './component/LoginOrganizer.js';
import LoginAdmin from './component/LoginAdmin.js';

import RegistrationParticipant from './component/RegistrationParticipant.js';
import RegistrationOrganizer from './component/RegistrationOrganizer.js';

import ParticipantHome from './component/ParticipantHome.js';
import RegisterTournament from './component/RegisterTournament.js';
import ParticipantViewRegistration from './component/ParticipantViewRegistration.js';

import OrganizerHome from './component/OrganizerHome.js';
import OrganizerCreateTournament from './component/OrganizerCreateTournament.js';
import TournamentList from './component/TournamentList.js';

import AdminHome from './component/AdminHome.js';
import AdminOrganizerList from './component/AdminOrganizerList.js';

function App() {
  return (
    <Router>
      <div id="container">

        {/* Global Header + Navbar */}
        <Header />
        <Navbar />

        {/* App Routes */}
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Login Routes */}
          <Route path="/adminLogin" element={<LoginAdmin />} />
          <Route path="/participantLogin" element={<LoginParticipant />} />
          <Route path="/organizerLogin" element={<LoginOrganizer />} />

          {/* Registration Routes */}
          <Route path="/participantRegistration" element={<RegistrationParticipant />} />
          <Route path="/organizerRegistration" element={<RegistrationOrganizer />} />

          {/* Participant Routes */}
          <Route path="/participantHome" element={<ParticipantHome />} />
          <Route path="/registerTournament" element={<RegisterTournament />} />
          <Route path="/participantViewRegistration" element={<ParticipantViewRegistration />} />

          {/* Organizer Routes */}
          <Route path="/organizerHome" element={<OrganizerHome />} />
          <Route path="/createTournament" element={<OrganizerCreateTournament />} />
          <Route path="/organizerTournamentList" element={<TournamentList />} />

          {/* Admin Routes */}
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminOrganizerList" element={<AdminOrganizerList />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;










// import logo from './logo.svg';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';

// import Header from './component/Header.js';
// import Navbar from './component/Navbar.js';
// import Home from './component/Home.js';

// import LoginParticipant from './component/LoginParticipant.js';
// import LoginOrganizer from './component/LoginOrganizer.js';
// import LoginAdmin from './component/LoginAdmin.js';

// import RegistrationParticipant from './component/RegistrationParticipant.js';
// import RegistrationOrganizer from './component/RegistrationOrganizer.js';

// import ParticipantHome from './component/ParticipantHome.js';
// import RegisterTournament from './component/RegisterTournament.js';

// import OrganizerHome from './component/OrganizerHome.js';
// import OrganizerCreateTournament from './component/OrganizerCreateTournament.js';

// import AdminHome from './component/AdminHome.js';
// import AdminOrganizerList from './component/AdminOrganizerList.js';

// import TournamentList from './component/TournamentList.js';
// import ParticipantViewRegistration from './component/ParticipantViewRegistration.js';

// function App() {
//   return (
//     <div id="container">
//       <Header />
//       <Router>
//         <Navbar />
//         <Routes>

//           <Route path="/" element={<Home />} />

//           {/* Login Routes */}
//           <Route path="/adminLogin" element={<LoginAdmin />} />
//           <Route path="/participantLogin" element={<LoginParticipant />} />
//           <Route path="/organizerLogin" element={<LoginOrganizer />} />

//           {/* Registration Routes */}
//           <Route path="/participantRegistration" element={<RegistrationParticipant />} />
//           <Route path="/organizerRegistration" element={<RegistrationOrganizer />} />

//           {/* Participant Routes */}
//           <Route path="/participantHome" element={<ParticipantHome />} />
//           <Route path="/registerTournament" element={<RegisterTournament />} />
//           <Route path="/participantViewRegistration" element={<ParticipantViewRegistration />} />

//           {/* Organizer Routes */}
//           <Route path="/organizerHome" element={<OrganizerHome />} />
//           <Route path="/createTournament" element={<OrganizerCreateTournament />} />

//           {/* Admin Routes */}
//           <Route path="/adminHome" element={<AdminHome />} />
//           <Route path="/adminOrganizerList" element={<AdminOrganizerList />} />

//           {/* Common */}
//           <Route path="/organizerTournamentList" element={<TournamentList />}/>

//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
