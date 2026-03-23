import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/event.css";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

// Import posters with your naming convention
import neuralnexus from "../assets/posters/neural.jpeg";
import scientiumPoster from "../assets/posters/Scientium'26.png";
import pastPoster1 from "../assets/posters/pastposter1.jpeg";
import pastPoster2 from "../assets/posters/technical-quiz.jpeg";
import pastPoster3 from "../assets/posters/english-speech.jpeg";
import miniHack from "../assets/posters/minihack.jpeg";

const EVENTS = {
  ongoing: [ 
    {
      id: "neural-nexus",      
      title: "NEURAL NEXUS",
      poster: neuralnexus,
    },

    
    
  ],

  upcoming: [
    
  ],

  past: [
    {
      id: "scientium'26",
      title: "SCIENTIUM'26",
      poster: scientiumPoster,
    },
    {
      id: "mini-hackathon",
      title: "MINI HACKATHON",
      poster: miniHack,
      
    },
    {
      id: "matlab",
      title: "MATLAB CODY CONTEST",
      poster: pastPoster1,
    
    },
    {
      id: "technical-quiz",
      title: "Technical Quiz Competition",
      poster: pastPoster2,
      
    },
    {
      id: "english-speech",
      title: "English Speech Competition",
      poster: pastPoster3,
      
    },
    
    
  

  ],
};

export default function EventPage() {
  const [tab, setTab] = useState("ongoing");
  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      {/* SIDEBAR/NAVBAR COMPONENT */}
      <Sidebar />

      {/* PAGE */}
      <section className="event-page">
        <h1 className="page-title">Events & Activities</h1>

        {/* TABS */}
        <div className="event-tabs">
          {["ongoing","past", "upcoming"].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SCROLL */}
        <div className="event-scroll">
          {EVENTS[tab].map((e, i) => (
            <div className="event-card" key={i}>
              {/* Event Poster */}
              <div className="event-poster-wrapper">
                <img src={e.poster} alt={e.title} className="event-card-poster" />
              </div>

              {/* Event Title */}
              <h2>{e.title}</h2>

              {/* View Details Button */}
              <button 
                className="event-btn" 
                onClick={() => handleViewDetails(e.id)}
              >
                VIEW DETAILS →
              </button>
            </div>
          ))}
        </div>

        <p className="scroll-hint">← Swipe to explore more events →</p>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
