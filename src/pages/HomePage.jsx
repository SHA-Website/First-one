import heroImg from "../assets/hero-building.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import Footer from "../components/Footer";
import { STUDENT_COORDINATORS } from "../data/members";
import { galleryImages as allGalleryImages } from "../data/galleryImages";

/* Faculty images */
import dean from "../assets/faculties/dean.jpg";
import hodEnglish from "../assets/faculties/hod-english.jpg";
import hodMathematics from "../assets/faculties/hod-mathematics.jpg";
import hodPhysics from "../assets/faculties/hod-physics.jpg";
import hodChemistry from "../assets/faculties/hod-chemistry.jpg";

/* Faculty Data */
const facultyData = [
  { img: dean, name: "Dr. R. Viswanathan", dept: "Dean, S&H" },
  { img: hodEnglish, name: "Dr. J. Rajini", dept: "HOD, English" },
  { img: hodMathematics, name: "Dr. M. Dhavamani", dept: "HOD, Mathematics" },
  { img: hodPhysics, name: "Dr.K.Prabu", dept: "HOD, Physics" },
  { img: hodChemistry, name: "Dr.P. MANIKANDAN", dept: "HOD, Chemistry" },
];

/* Student Data */
const rolePriority = {
  Secretary: 1,
  "Joint Secretary": 2,
  Treasurer: 3,
  "Joint Treasurer": 4,
};

const studentData = [...STUDENT_COORDINATORS]
  .sort((a, b) => {
    const roleDiff = (rolePriority[a.role] ?? 99) - (rolePriority[b.role] ?? 99);
    if (roleDiff !== 0) return roleDiff;
    const clusterDiff = a.cluster.localeCompare(b.cluster, undefined, { numeric: true });
    if (clusterDiff !== 0) return clusterDiff;
    return a.name.localeCompare(b.name);
  })
  .map((student) => ({
    img: student.image,
    name: student.name,
    role: student.role,
    cluster: student.homepageCluster,
  }));

function pickRandomImages(images, count) {
  const shuffled = [...images];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function HomePage() {
  const navigate = useNavigate();
  const [homeGalleryImages, setHomeGalleryImages] = useState(() =>
    pickRandomImages(allGalleryImages, 4)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHomeGalleryImages((prevImages) => {
        let nextImages = pickRandomImages(allGalleryImages, 4);
        const prevKey = prevImages.join("|");
        let attempts = 0;

        while (nextImages.join("|") === prevKey && attempts < 5) {
          nextImages = pickRandomImages(allGalleryImages, 4);
          attempts += 1;
        }

        return nextImages;
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="home-scroll">
        {/* HOME 1 */}
        <section className="screen home1-desktop">
          <div className="home1-hero-wrapper">
            <img src={heroImg} alt="Hero" className="home1-hero-img" />

            <div className="home1-hero-content">
              <img src={logo} alt="SHA Logo" className="home1-center-logo" />
              <h1>Science and Humanities Association</h1>

              <div className="down-arrow">&#8595;</div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="about-card">
            <h2 className="about-title">Science & Humanities Association</h2>

            <p>
              The <span className="highlight">Science & Humanities Association (SHA)</span> is one of the
              largest associations of <strong>Kongu Engineering College (Autonomous)</strong>.
            </p>

            <p>
              SHA represents the Department of Science & Humanities, comprising four distinguished
              departments: <strong>Mathematics, Physics, Chemistry,</strong> and <strong>English</strong>.
              It also represents all first-year B.E./B.Tech students, serving as a common platform
              that brings together young minds from diverse disciplines.
            </p>

            <p>
              The association is presided over by the Dean of Science & Humanities and is organized
              into six clusters, each headed by a Secretary, Joint Secretary, Treasurer, and Joint
              Treasurer, along with a team of executive members.
            </p>

            <p className="closing-line">
              Through its initiatives, SHA promotes academic excellence, leadership, and holistic
              development beyond the classroom.
            </p>
          </div>
        </section>

        {/* HOME 2 */}
        <section className="screen home2">
          <AnimatedBackground />

          <div className="home2-content">
            <button className="btn-primary home-events-btn" onClick={() => navigate("/events")}>
              View Events
            </button>

            <h2 className="home2-top">Gallery</h2>

            <div className="home2-grid">
              {homeGalleryImages.map((img, i) => (
                <div className="gallery-box" key={i}>
                  <img src={img} alt={`Gallery ${i}`} />
                </div>
              ))}
            </div>

            <button className="home2-btn" onClick={() => navigate("/gallery")}>
              View Gallery
            </button>
          </div>
        </section>

        {/* HOME 3 - COORDINATORS SECTION */}
        <section className="screen home3">
          {/* FACULTY */}
          <h2>Faculty Coordinators</h2>
          <div className="coordinator-carousel">
            {facultyData.map((f, i) => (
              <div className="coordinator-card" key={i}>
                <div className="coordinator-avatar">
                  <img src={f.img} alt={f.name} />
                </div>
                <p className="coordinator-name">{f.name}</p>
                <span className="coordinator-dept">{f.dept}</span>
                <span className="coordinator-cluster">{f.cluster}</span>
              </div>
            ))}
          </div>

          <p className="swipe-hint">&lt;- Swipe to see more -&gt;</p>

          {/* STUDENTS */}
          <h2 style={{ marginTop: "40px" }}>Student Coordinators</h2>
          <div className="coordinator-carousel">
            {studentData.map((s, i) => (
              <div className="coordinator-card" key={i}>
                <div className="coordinator-avatar">
                  <img src={s.img || undefined} alt={s.name} />
                </div>
                <p className="coordinator-name">{s.name}</p>
                <span className="coordinator-dept">{s.role}</span>
                <span className="coordinator-cluster">{s.cluster}</span>
              </div>
            ))}
          </div>

          <p className="swipe-hint" style={{ marginBottom: "40px" }}>
            &lt;- Swipe to see more -&gt;
          </p>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;


