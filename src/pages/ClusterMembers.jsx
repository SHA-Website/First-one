import { useEffect, useState } from "react";
import "../styles/clustermembers.css";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { MEMBERS, getMemberImageByRollNo } from "../data/members";

/**
 * HIGH-LEVEL ASSET RESOLVER
 * This scans the assets folder for all images regardless of extension.
 * 'eager: true' ensures they are available immediately on render.
 */
const ASSET_MAP = import.meta.glob("../assets/**/*.{png,jpg,jpeg,svg,webp}", { eager: true });

const getDynamicImage = (folder, fileName) => {
  const pathKey = Object.keys(ASSET_MAP).find((path) => 
    path.includes(`/${folder}/`) && path.includes(`/${fileName}.`)
  );
  return pathKey ? ASSET_MAP[pathKey].default : null;
};

const TEAM_MEMBERS = [
  {
    name: "Mr.V.Pathibaraj",
    department: "AP / Physics",
    contribution: "Faculty Coordinator",
    imageName: "parthi", // No extension needed
    folder: "faculties"
  },
  {
    name: "Dheepesh K",
    department: "MTS",
    contribution: "Coordinator & Data management",
    imageName: "25MTR021",
    folder: "students",
    linkedin: "https://www.linkedin.com/in/dheepeshk/",
  },
  {
    name: "Panbalan PI",
    department: "MECH",
    contribution: "Coordinator & Advisor",
    imageName: "25MER038",
    folder: "students",
    linkedin: "https://www.linkedin.com/in/panbalan-parimalakumar-iniyaval-105550366",
  },
  {
    name: "Vijay Anand M",
    department: "MTS",
    contribution: "Lead Developer , Designer & contributor",
    imageName: "vijay-anand",
    folder: "students",
    linkedin: "https://www.linkedin.com/in/vijay-anand-7ba814398/",
  },
  {
    name: "Vipin G",
    department: "MTS",
    contribution: "Lead Developer , Designer & contributor",
    imageName: "vipin",
    folder: "students",
    linkedin: "https://www.linkedin.com/in/vipin-g-965316314/",
  },
];

const TOPS = [
  {
    id: "top-1",
    name: "Thiru. E. R. K. Krishnan",
    role: "Chief Patron",
    dept: "Correspondent, KEC",
    imageName: "correspondent",
  },
  {
    id: "top-2",
    name: "Dr. R. Parameshwaran",
    role: "Patron",
    dept: "Principal, KEC",
    imageName: "principal",
  },
  {
    id: "top-3",
    name: "Dr. R. Viswanathan",
    role: "President",
    dept: "Dean, S&H",
    imageName: "dean",
  },
];

const groupByCluster = (members) => {
  const clusters = {};
  members.forEach((member) => {
    if (!clusters[member.cluster]) {
      clusters[member.cluster] = [];
    }
    clusters[member.cluster].push(member);
  });
  return clusters;
};

export default function ClusterMembers() {
  const clusteredMembers = groupByCluster(MEMBERS);
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLinkedInClick = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Sidebar />

      <div className="cluster-members-page">
        <h1>Cluster Members</h1>

        {/* TOP CHIEFS SECTION */}
        <div className="cluster-section">
          <h2>Our Chiefs</h2>
          <div className="members-grid">
            {TOPS.map((item) => (
              <div key={item.id} className="member-card">
                <img 
                  src={getDynamicImage("faculties", item.imageName)} 
                  alt={item.name} 
                />
                <h3>{item.name}</h3>
                <p className="role">{item.role}</p>
                <p className="dept">{item.dept}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DYNAMIC CLUSTER SECTIONS */}
        {Object.keys(clusteredMembers).map((clusterName) => (
          <div key={clusterName} className="cluster-section">
            <h2>{clusterName}</h2>
            <div className="members-grid">
              {clusteredMembers[clusterName].map((member) => (
                <div key={member.id} className="member-card">
                  <img src={getMemberImageByRollNo(member.rollNo)} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="dept">{member.dept}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* WEB DEV TEAM SECTION */}
        <section className="dev-team-section">
          <h2>Web Development Team</h2>
          <div className="footer-team-small">
            {TEAM_MEMBERS.map((member, index) => {
              const imagePath = getDynamicImage(member.folder, member.imageName);
              
              return (
                <div
                  key={index}
                  className={`team-member-card ${isMobile && activeCard === index ? "mobile-active" : ""}`}
                  onClick={() => isMobile && setActiveCard(activeCard === index ? null : index)}
                >
                  <img src={imagePath} alt={member.name} />
                  <button
                    className="linkedin-corner-badge"
                    onClick={(e) => handleLinkedInClick(e, member.linkedin)}
                    aria-label="LinkedIn Profile"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <div className={`team-member-info ${isMobile && activeCard === index ? "active" : ""}`}>
                    <h4>{member.name}</h4>
                    <span className="department">{member.department}</span>
                    <p className="contribution">{member.contribution}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}