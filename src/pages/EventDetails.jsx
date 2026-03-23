import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/eventdetails.css";
import Sidebar from "../components/Sidebar";

// Import posters (same as EventPage)
import neuralnexus from "../assets/posters/neural.jpeg";
import scientiumPoster from "../assets/posters/Scientium'26.png";
import upcomingPoster1 from "../assets/posters/upcomingposter1.jpg";
import upcomingPoster2 from "../assets/posters/upcomingposter2.jpg";
import pastPoster1 from "../assets/posters/pastposter1.jpeg";
import pastPoster2 from "../assets/posters/technical-quiz.jpeg";
import pastPoster3 from "../assets/posters/english-speech.jpeg";
import miniHack from "../assets/posters/minihack.jpeg";
// Event data with posters
const EVENT_DATA = {
  "scientium'26": {
    poster: scientiumPoster,
    category: "COMPETITION",
    title: "SCIENTIUM'26",
    date: "27 / 02 / 2026",
    time: "9:30 AM - 11:30 PM",
    venue: "Kongu Convention Centre",
    description:
      "The Science and Humanities Association (SHA) of Kongu Engineering College organized SCIENTIUM'26 on February 27, 2026. The event fostered creativity, scientific thinking, and communication skills among students while providing a platform to showcase their talents.",
    type: "past",
    winners: [
      {
        place: "Winner",
        name: "To be Updated",
        category: "Best Speech",
        prize: "Prizes & Certificate",
      },
    ],
  },
  "neural-nexus": {
    poster: neuralnexus, 
    category: "TECHNICAL & NON-TECHNICAL EVENT",
    title: "NEURAL NEXUS",
    date: "14 / 03 / 2026",
    time: "1:30 PM – 4:30 PM",
    eventActivities: [
      {
        id: 1,
        title: "TECH DEBATE",
        description: "Debate on the topic “Rise of AI: Hope or Hazard”. Each participant speaks for 5 minutes. The side (for or against) will be decided one hour before the event by lot. Participants must present logical arguments strictly related to the topic. Offensive language and personal attacks are prohibited.",
        participants: "Individual",
        icon: "💬",
        iconColor: "#00d4ff",
        registerLink: "https://docs.google.com/forms/d/e/1FAIpQLScjghqdoDz1nYK3rsOpP5i_IDcdv3Hlz-5E8tLfoyaCm_UyLA/viewform?pli=1&pli=1"
      },
      {
        id: 2,
        title: "SCIENCE PICTIONARY",
        description: "Team-based event combining science and creativity. Each team receives 10 words: 5 science-fiction movie titles to act out (no lip movement) and 5 scientific terms to draw (no letters, numbers, or verbal clues). Total time limit is 10 minutes per team.                                                                               ",
        participants: "2 Participants",
        icon: "🎨",
        iconColor: "#ff6b9d",
      },
      {
        id: 3,
        title: "AD-O-MANIA",
        description: "Teams perform a live advertisement skit for a self-created fictional product or brand. The advertisement may be professional or humorous. Each team must present a 2–3 minute skit highlighting the product’s uniqueness and appeal. Impersonation of existing brands is not allowed.",
        participants: "2-5 Participants",
        icon: "📺",
        iconColor: "#00ff88",
      },
      {
        id: 4,
        title: "MYSTERY BOX",
        description: "An individual event testing creativity and quick thinking. Participants randomly pick a lot from the mystery box and perform the assigned task. A maximum of 5 minutes is given to complete the task. The element of surprise makes it fun and challenging.",
        participants: "Individual",
        icon: "🎁",
        iconColor: "#e5d059",
      },
      {
        id: 5,
        title: "REELS CREATION",
        description: "Creative media event where teams capture highlights of the program and compile them into an original reel. Videos must be recorded during the event only. Each team must submit a reel of exactly 60 seconds showcasing the spirit and excitement of the event.",
        participants: "3 Participants",
        icon: "🎬",
        iconColor: "#e060ee",
        registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfwoBrOOpb7Fw5LnBWONpUvZPKRRrwJqsX2FvIiT8nWhDuNXg/viewform"
      }
    ],
    venues: [
      {
        hall: "Maharaja Auditorium",
        location: "Maharaja Auditorium",
        departments: ["CSE"]
      },
      {
        hall: "SIR C V Raman Seminar Hall",
        location: "S&H Block",
        departments: ["AIDS","AIML"]
      },
      {
        hall: "Pragaladha Seminar Hall",
        location: "MBA Block",
        departments: ["ECE", "MTS"]
      }
    ],
    description: "Neural Nexus is a technical event organized by the Physics and Chemistry Department under the Science and Humanities Association. The event features multiple engaging activities including Reels Creation, Advertisement Making, Tech Debate, Science Pictionary, and a Mystery Box Challenge, providing students with an opportunity to showcase creativity, scientific thinking, and communication skills.",
    type: "ongoing",
    registerButton: false,
    agenda: [
      { time: "1:30 – 1:35 PM", event: "Inaugural Session" },
      { time: "1:35 – 2:15 PM", event: "Tech Debate" },
      { time: "2:15 – 2:55 PM", event: "Science Pictionary" },
      { time: "2:55 – 3:05 PM", event: "Tea Break" },
      { time: "3:05 – 3:35 PM", event: "AD-O-MANIA" },
      { time: "3:35 – 4:05 PM", event: "Mystery Box Challenge" },     
      { time: "4:05 – 4:30 PM", event: "Valedictory Session" }
    ]

    
  },
 
  "robotics-expo": {
    poster: upcomingPoster1,
    category: "EXPO",
    title: "Robotics Expo",
    date: "05 / 02 / 2026",
    time: "10:00 AM",
    venue: "Mechanical Block",
    description: "Experience the future of automation at our grand Robotics Expo! Witness cutting-edge humanoid robots, autonomous drones, AI-powered robotic arms, and innovative automation systems designed by our talented students and industry partners. This interactive exhibition features live demonstrations, hands-on workshops, and expert talks from leading roboticists. Explore applications in manufacturing, healthcare, agriculture, and space exploration. Perfect for tech enthusiasts, students, and professionals looking to understand the revolutionary impact of robotics on our daily lives.",
    type: "upcoming"
  },
  "industry-tech-talk": {
    poster: upcomingPoster2,
    category: "SEMINAR",
    title: "Industry Tech Talk",
    date: "10 / 02 / 2026",
    time: "2:00 PM",
    venue: "Conference Hall",
    description: "Join us for an exclusive Industry Tech Talk featuring renowned experts from leading IT companies. Gain valuable insights into emerging technologies including Artificial Intelligence, Machine Learning, Cloud Computing, Blockchain, and Cybersecurity. Learn about current industry trends, career opportunities, essential skills for the modern workplace, and the future of technology. This interactive session includes live Q&A, networking opportunities with industry professionals, and guidance on building a successful tech career. Don't miss this chance to bridge the gap between academic learning and industry requirements.",
    type: "upcoming"
  },
  
  "matlab": {
    poster: pastPoster1,
    category: "CONTEST",
    title: "MATLAB CODY CONTEST",
    date: "29 / 11 / 2025 & 06 / 12 / 2025",
    time: "Session-wise",
    venue: "Lab, EEE Block",
    description: "The MATLAB Cody Contest was organized by the Science and Humanities Association exclusively for first-year students. The event aimed to enhance problem-solving and coding skills using MATLAB through competitive challenges. The contest was conducted in two sessions for different department clusters, encouraging students to strengthen their analytical and programming abilities.",
    type: "past",
    winnersNote: "Session-1",
    winners: [
    
      {
      place: "Winner",
      name: "To be Updated",
      category: "Technical Quiz",
      prize: "Prizes & Certificate"
    },
    ]
  },
  "technical-quiz": {
  poster: pastPoster2,
  category: "QUIZ",
  title: "Technical Quiz Competition",
  date: "FINALS : 29 / 11 / 2025 & 06 / 12 / 2025",
  time: "Prelims: 29 / 11 / 2025| 3:30 PM – 4:30 PM",
  venue: "Multiple Venues (KEC Campus)",
  description: "The Science and Humanities Association (SHA) organized a Technical Quiz Competition exclusively for First Year B.E./B.Tech students. The event aimed to enhance technical knowledge, logical reasoning, and teamwork among students. The preliminary round was conducted on 19.11.2025 at Sir C.V. Raman Seminar Hall, S&H Block. Students shortlisted from the prelims advanced to the final rounds held on 29.11.2025 and 06.12.2025 across various auditoriums and seminar halls based on department clusters. The competition witnessed enthusiastic participation from first-year students across multiple departments.",
  type: "past",
  winners: [
    
    {
      place: "Winner",
      name: "To be Updated",
      category: "Technical Quiz",
      prize: "Prizes & Certificate"
    },
  ]
},
"english-speech": {
  poster: pastPoster3,
  category: "COMPETITION",
  title: "English Speech Competition",
  date: "29 / 11 / 2025 & 06 / 12 / 2025",
  time: "10:30 AM – 12:25 PM",
  venue: "Maharaja Auditorium / Sir C.V. Raman Hall (S&H Block) / Mahatma Gandhi Seminar Hall (EEE Block)",
  description: "The Science and Humanities Association (SHA) of Kongu Engineering College organized an English Speech Competition exclusively for First Year B.E./B.Tech students. The event aimed to provide a platform for students to showcase their communication skills, confidence, creativity, and command over the English language. Conducted across two days for different department clusters, the competition encouraged students to think sharp and speak bold. All participants received certificates, and attractive prizes were awarded to the winners.",
  type: "past",
  winners: [
    {
      place: "Winner",
      name: "To be Updated",
      category: "Best Speech",
      prize: "Prizes & Certificate"
    },
    
  ]
},

"mini-hackathon": {
  poster: miniHack, 
  category: "HACKATHON",
  title: "Mini Hackathon ’26",
  date: "30 / 01 / 2026 & 31 / 01 / 2026",
  time: "8:30 AM – 4:30 PM (8 Hours)",
  venue: "Multiple Venues (KEC Campus)",
  description: "The Science and Humanities Department, in association with the Foundation Lab Forum, organized Mini Hackathon ’26 exclusively for First Year B.E./B.Tech students of Kongu Engineering College. This 8-hour hackathon provided students with an opportunity to showcase their problem-solving abilities, teamwork, and innovative thinking by working on real-world challenges. Participants competed across six exciting domains including Electrical Installation, IoT, Web Technologies, Product Design and Development, Manufacturing, and Robotics. The event was conducted over two days based on branch-wise eligibility, encouraging interdisciplinary collaboration and hands-on learning. Cash prizes worth ₹60,000, certificates, and valuable exposure were awarded to the winning teams.",
  type: "past", 

  winnersByDomain: [
  {
    domain: "Electrical Installation",
    winners: [
      { place: "1st", name: "Team Name 1", prize: "₹5,000" },
      { place: "2nd", name: "Team Name 2", prize: "₹3,000" },
      { place: "3rd", name: "Team Name 3", prize: "₹2,000" }
    ]
  },
  {
    domain: "IoT",
    winners: [
      { place: "1st", name: "Team Name 1", prize: "₹5,000" },
      { place: "2nd", name: "Vishal M , Sanjeev Kumar A , Thumilesh R", prize: "₹3,000" },
      { place: "3rd", name: "Team Name 3", prize: "₹2,000" }
    ]
  },
  {
    domain: "Web Technologies",
    winners: [
      { place: "1st", name: "Sachin S , Sabarish V , Praveen S , Nithin S", prize: "₹5,000" },
      { place: "2nd", name: "    Vipin G , Vijayanand M, Saran B", prize: "₹3,000" },
      { place: "3rd", name: "Kaviya G , Hemashree A, Hemavarni S", prize: "₹2,000" }
    ]
  },
  {
    domain: "Product Design and Development",
    winners: [
      { place: "1st", name: "Team Name 1", prize: "₹5,000" },
      { place: "2nd", name: "Team Name 2", prize: "₹3,000" },
      { place: "3rd", name: "Team Name 3", prize: "₹2,000" }
    ]
  },
  {
    domain: "Manufacturing",
    winners: [
      { place: "1st", name: "Team Name 1", prize: "₹5,000" },
      { place: "2nd", name: "Team Name 2", prize: "₹3,000" },
      { place: "3rd", name: "Team Name 3", prize: "₹2,000" }
    ]
  },
  {
    domain: "Robotics",
    winners: [
      { place: "1st", name: "Team Name 1", prize: "₹5,000" },
      { place: "2nd", name: "Team Name 2", prize: "₹3,000" },
      { place: "3rd", name: "Team Name 3", prize: "₹2,000" }
    ]
  },
]
}


};
export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = EVENT_DATA[eventId];
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [venuesOpen, setVenuesOpen] = useState(false);
  const isNeuralNexus = eventId === "neural-nexus";
  const commonRegistrationLink = isNeuralNexus
    ? event?.eventActivities?.find((activity) => activity.id === 1)?.registerLink
    : null;
  const reelsRegistrationLink = isNeuralNexus
    ? event?.eventActivities?.find((activity) => activity.id === 5)?.registerLink
    : null;

  if (!event) {
    return (
      <>
        <Sidebar />
        <div className="event-details-error">
          <h2>Event not found</h2>
          <button onClick={() => navigate("/events")}>Back to Events</button>
        </div>
      </>
    );
  }

  return (
  <>
  <Sidebar />
  <div className="event-details-page">
    {/* Back Button */}
    <button className="back-button" onClick={() => navigate("/events")}>
      ← Back
    </button>
      {/* Responsive  */}
    <div className="event-details-content-wrapper">
      {/* Event Poster */}
      <div className="event-poster-container">
        <img src={event.poster} alt={event.title} className="event-poster" />
           {/* Agenda */}
        {event.agenda && (
          <div className={`agenda-section dropdown-section ${agendaOpen ? 'open' : ''}`}>
            <div className="dropdown-header" onClick={() => setAgendaOpen(!agendaOpen)}>
              <h2 className="agenda-heading">
                Event <span className="highlight">Agenda</span>
              </h2>
              <span className="dropdown-arrow">{agendaOpen ? '▲' : '▼'}</span>
            </div>
            <div className="dropdown-content">
              <div className="agenda-list">
                {event.agenda.map((item, index) => (
                  <div key={index} className="agenda-item">
                    <span className="agenda-time">⏰ {item.time}</span>
                    <span className="agenda-event">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
              {/* Event Details */}
      <div className="event-details-info">
        <div className="event-category-badge">{event.category}</div>
           { /* Event Title */}
        <h1 className="event-details-title">{event.title}</h1>

        <div className="event-meta-tags">
          <span className="meta-tag">📅 {event.date}</span>
          <span className="meta-tag">⏰ {event.time}</span>
          {event.venue && <span className="meta-tag">📍 {event.venue}</span>}
        </div>

        {/* About */}

        <div className="about-event-section">
          <h2 className="about-heading">
            About This <span className="highlight">Event</span>
          </h2>
          <p className="event-description">{event.description}</p>
        </div>

        
        {/* Venues*/}
        {event.venues && (
          <div className={`venues-section dropdown-section ${venuesOpen ? 'open' : ''}`}>
            <div className="dropdown-header" onClick={() => setVenuesOpen(!venuesOpen)}>
              <h2 className="about-heading">
                Event <span className="highlight">Venues</span>
              </h2>
              <span className="dropdown-arrow">{venuesOpen ? '▲' : '▼'}</span>
            </div>
            <div className="dropdown-content">
              <div className="venues-grid">
                {event.venues.map((venueItem, index) => (
                  <div key={index} className="venue-card">
                    <div className="venue-hall">🏛️ {venueItem.hall}</div>
                    <div className="venue-location">📍 {venueItem.location}</div>
                    <div className="venue-departments">
                      <span className="dept-label">Departments:</span>
                      <div className="dept-tags">
                        {venueItem.departments.map((dept, deptIndex) => (
                          <span key={deptIndex} className="dept-tag">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Winners Section */}

        {event.type === "past" && event.winners && (
          <div className="winners-section">
            <h2 className="about-heading">
              Event <span className="highlight">Winners</span>
            </h2>
            {event.winnersNote && (
              <p className="winners-note">{event.winnersNote}</p>
            )}
            <div className="winners-list">
              {event.winners.map((winner, index) => (
                <div key={index} className="winner-item">
                  <div className="winner-place">{winner.place} Place</div>
                  <div className="winner-name">{winner.name}</div>
                  <div className="winner-category">{winner.category}</div>
                  <div className="winner-prize">🏆 {winner.prize}</div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Domain wise Winners Mini Hackathon */}

        {event.type === "past" && event.winnersByDomain && (
          <div className="winners-section">
            <h2 className="about-heading">
              Event <span className="highlight">Winners</span>
            </h2>
            <div className="domains-grid">
              {event.winnersByDomain.map((domainData, domainIndex) => (
                <div key={domainIndex} className="domain-card">
                  <h3 className="domain-title">{domainData.domain}</h3>
                  <div className="domain-winners">
                    {domainData.winners.map((winner, winnerIndex) => (
                      <div
                        key={winnerIndex}
                        className={`domain-winner-item place-${winner.place
                          .toLowerCase()
                          .replace(" ", "")}`}
                      >
                        <span className="domain-winner-place">
                          {winner.place}
                        </span>
                        <span className="domain-winner-name">
                          {winner.name}
                        </span>
                        <span className="domain-winner-prize">
                          {winner.prize}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {event.type === "ongoing" && event.registerButton && (
          <button className="register-button">Register Now</button>
        )}
      </div>
    </div>

    {/* Event Activities Cards - Full Width Section */}
    {event.eventActivities && (
      <div className="event-activities-section">
        <h2 className="about-heading">
          Event <span className="highlight">Activities</span>
        </h2>
        {isNeuralNexus && (commonRegistrationLink || reelsRegistrationLink) && (
          <div className="registration-cta-group">
            {commonRegistrationLink && (
              <a
                href={commonRegistrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="activity-register-btn"
              >
                Register For Events 1 To 4
              </a>
            )}
            {reelsRegistrationLink && (
              <a
                href={reelsRegistrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="activity-register-btn"
              >
                Register For Reels Creation
              </a>
            )}
          </div>
        )}
        <div className="event-cards-grid">
          {event.eventActivities.map((activity) => (
            <div key={activity.id} className="event-activity-card">
              <div 
                className="activity-icon" 
                style={{ color: activity.iconColor, borderColor: activity.iconColor }}
              >
                {activity.icon}
              </div>
              <h3 className="activity-title" style={{ color: activity.iconColor }}>
                {activity.title}
              </h3>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-participants">
                <span className="participants-icon">👥</span>
                <span>{activity.participants}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  </>
);


}

