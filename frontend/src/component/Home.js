import React, { useEffect } from "react";
import banner from "../images/banner.jpg";
import { useDispatch } from "react-redux";
import { resetMessage } from "../store/participantSlice.js";
import { Link } from "react-router-dom"; // ✅ IMPORTANT

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetMessage(""));
  }, [dispatch]);

  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <img src={banner} className="hero-banner" alt="Sports Arena Banner" />

        <div className="hero-overlay">
          <h1>Sports & eSports Arena</h1>
          <p>
            Discover and join exciting tournaments. Compete. Win. Celebrate.
          </p>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      {/* <section className="about-section"> */}
      <section id="about" className="about-section">

        <div className="container-inner">
          <h2>About Our Platform</h2>
          <p>
            Sports & eSports Arena is a unified platform where participants
            can explore upcoming tournaments and organizers can create and
            manage competitive events. From traditional sports to modern
            eSports, everything is available in one seamless ecosystem.
          </p>
        </div>
      </section>

      {/* ===== RELATED GAMES SECTION ===== */}
      <section className="games-section">
        <h2>Popular Games & Sports</h2>

        <div className="games-grid">

          <div className="game-card">
            <h3>Cricket</h3>
            <p>Join local and national cricket tournaments.</p>
          </div>

          <div className="game-card">
            <h3>Football</h3>
            <p>Compete in exciting football leagues.</p>
          </div>

          <div className="game-card">
            <h3>BGMI</h3>
            <p>Battle royale tournaments with real rewards.</p>
          </div>

          <div className="game-card">
            <h3>Valorant</h3>
            <p>Professional eSports tournaments and scrims.</p>
          </div>

        </div>
      </section>

      {/* ===== CONTACT / CTA SECTION ===== */}
      {/* <section className="contact-section"> */}
      <section id="contact" className="contact-section">

        <h2>Ready to Compete?</h2>
        <p>
          Register today and start participating in the best tournaments
          around you.
        </p>

        {/* ✅ React Link instead of <a> (important fix) */}
        <Link to="/participantRegistration" className="cta-button">
          Get Started
        </Link>
      </section>

    </div>
  );
}

export default Home;










// import React, { useEffect } from 'react';
// // import { createRoot } from 'react-dom/client';
// import banner from '../images/banner.jpg';
// import { useDispatch } from 'react-redux';
// import { resetMessage } from '../store/participantSlice.js';

// function Home() {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(resetMessage(''));
//     }, []);

//     return (
//         <div>
//             <div id="home">
//                 <img src={banner} id="bannerId" alt="Banner" />
//             </div>

//             <div id="homeBottom">
//                 <h2>Welcome to Sports & eSports Arena</h2>
//                 <p>
//                     Discover, explore, and register for exciting sports and eSports
//                     tournaments all in one place. This platform provides a simple
//                     BookMyShow-style experience where participants can browse events,
//                     check available slots, and register seamlessly, while organizers
//                     can manage tournaments efficiently.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Home;
