import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/about.css";

export default function AboutPage() {
  return (
    <>
      <Sidebar />

      <main className="about-page">
        <section className="about-hero">
          <p className="about-kicker">About</p>
          <h1>Science & Humanities Association (SHA)</h1>
          <p>
            The Science & Humanities Association (SHA) is a student-driven platform dedicated exclusively
            to first-year students. It is designed to create a strong foundation for academic excellence,
            interdisciplinary collaboration, and personal growth from the very beginning of university life.
          </p>
        </section>

        <section className="about-highlights">
          <article className="highlight-card">
            <h3>Founded</h3>
            <p>2025</p>
          </article>
          <article className="highlight-card">
            <h3>Student Reach</h3>
            <p>1700+ First year students of B.E/B.Tech Students</p>
          </article>
          <article className="highlight-card">
            <h3>Departments Covered</h3>
            <p>English, Mathematics, Physics, Chemistry</p>
          </article>
          <article className="highlight-card">
            <h3>Events Per Year</h3>
            <p>10+ events</p>
          </article>
        </section>

        <section className="about-grid">
          <article className="about-card">
            <h2>Our Vision</h2>
            <p>
              Build an inclusive learning ecosystem where first year students from all departments can
              connect, share ideas, and grow together.
            </p>
          </article>

          <article className="about-card">
            <h2>Our Mission</h2>
            <p>
              Organize events, workshops, and activities that combine technical knowledge, communication,
              and leadership development.
            </p>
          </article>

          <article className="about-card">
            <h2>What We Do</h2>
            <p>
              We conduct club activities, competitions, and community initiatives to strengthen student
              engagement and practical learning from the beginning itself.
            </p>
          </article>
        </section>

        <section className="about-section">
          <h2>Objectives</h2>
          <ul className="about-list">
            <li>Strengthen first-year student confidence in academics and communication.</li>
            <li>Provide early exposure to technical, non-technical, and creative events.</li>
            <li>Encourage team collaboration across departments and clusters.</li>
            <li>Identify and nurture student leaders from the first semester itself.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Organizational Structure</h2>
          <div className="about-two-col">
            <article className="about-card">
              <h3>Faculty Leadership</h3>
              <p>Dean: Dr.R.Viswanathan</p>
              <p>Faculty Coordinators: <br />Dr. J. Rajini, HOD-English <br />Dr. M. Dhavamani, HOD-Maths <br />Dr. K. Prabhu, HOD-Physics <br />Dr. P. Manikandan, HOD-Chemistry</p>
            </article>
            <article className="about-card">
              <h3>Student Leadership - 6 Clusters</h3>
              <p>6 Secretaries,6 Joint Secretaries, 6 Treasurers, 6 Joint Treasurers</p>
              <p>70+ Executive members</p>
            </article>
          </div>
        </section>

        <section className="about-section">
          <h2>Annual Activity Plan</h2>
          <div className="timeline-grid">
            <article className="timeline-item">
              <h3>Semester 1</h3>
              <p>Orientation events, ice-breakers, skill sessions.</p>
            </article>
            <article className="timeline-item">
              <h3>Semester 2</h3>
              <p>Flagship competitions, project showcases, inter-cluster activities (update).</p>
            </article>
            <article className="timeline-item">
              <h3>Special Initiatives</h3>
              <p>Community outreach, mentorship, department collaborations (update).</p>
            </article>
          </div>
        </section>

        <section className="about-section">
          <h2>Achievements</h2>
          <ul className="about-list">
            <li>Major Event Participation Count:</li>
            <li>Notable Student/Team Recognition:</li>
            <li>External Collaboration or Sponsorship:</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>FAQ</h2>
          <div className="faq-grid">
            <article className="about-card">
              <h3>Who can join SHA?</h3>
              <p>All first-year students of the institution.</p>
            </article>
            <article className="about-card">
              <h3>Is registration required?</h3>
              <p>Yes, event-wise or association-wise based on activity rules.</p>
            </article>
            <article className="about-card">
              <h3>How are coordinators selected?</h3>
              <p>Selection process: [add your official process details].</p>
            </article>
          </div>
        </section>

        <section className="about-section about-contact">
          <h2>Contact & Socials</h2>
          <p>Email: sha@institution.edu (update)</p>
          <p>Faculty Coordinator Contact: +91-XXXXXXXXXX (update)</p>
          <p>Instagram / LinkedIn / YouTube: [add official links]</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
