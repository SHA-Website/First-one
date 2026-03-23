import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sha from "../assets/logo.png";
import kecLogo from "../assets/kec-logo.png";
import "../styles/navbar.css";

export default function Sidebar({ showNavbar = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Members", path: "/cluster-members" },
  ];
  const departmentLinks = [
    { name: "Department of English", url: "https://kongu.ac.in/english" },
    { name: "Department of Mathematics", url: "https://kongu.ac.in/maths" },
    { name: "Department of Physics", url: "https://kongu.ac.in/physics" },
    { name: "Department of Chemistry", url: "https://kongu.ac.in/chemistry" },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    const galleryBg = document.querySelector('.gallery-bg');
    
    if (menuOpen) {
      if (galleryBg) {
        galleryBg.style.overflow = 'hidden';
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (galleryBg) {
        galleryBg.style.overflow = '';
      }
      document.body.style.overflow = '';
    }

    return () => {
      if (galleryBg) {
        galleryBg.style.overflow = '';
      }
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setDepartmentsOpen(false);
    }
  }, [menuOpen]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Handle logo click to go home
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR - Only show if showNavbar prop is true */}
      {showNavbar && (
        <header className="app-side-navbar">
          <div className="nav-left nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src={sha} alt="SHA Logo" />
            <span className="nav-title">Science & Humanities Association</span>
          </div>

          <a
            className="nav-center"
            href="https://kongu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Kongu Engineering College website"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            <img
              src={kecLogo}
              className="nav-kec"
              alt="KEC"
              style={{ height: "clamp(110px, 14vh, 190px)", width: "auto", maxWidth: "560px" }}
            />
          </a>

          <div className="nav-right">
            <div 
              className="menu-icon hamburger" 
              onClick={() => setMenuOpen(!menuOpen)}
              role="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </div>
          </div>
        </header>
      )}

      {/* Floating hamburger button for HomePage (when navbar is hidden) */}
      {!showNavbar && (
        <div 
          className="floating-hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            fontSize: '28px',
            color: '#d4af37',
            cursor: 'pointer',
            background: 'rgba(25, 10, 50, 0.8)',
            padding: '10px 15px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      )}

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        {/* OVERLAY */}
        <div 
          className="menu-overlay" 
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        
        {/* MENU DRAWER */}
        <div className={`menu-drawer ${menuOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
          {/* CLOSE BUTTON */}
          <button 
            className="close-btn" 
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          <div className="menu-header">
            <h2>SCIENCE & HUMANITIES ASSOCIATION</h2>
          </div>

          {/* SCROLLABLE NAV SECTION */}
          <nav className="menu-nav" style={{
            flex: '1',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: '20px',
            marginBottom: '0'
          }}>
            {menuItems.map((item, index) => (
              <a 
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`menu-item ${location.pathname === item.path || 
                  (item.path === "/events" && location.pathname.startsWith("/events")) ? "active" : ""}`}
              >
                <span className="menu-text">{item.name.toUpperCase()}</span>
              </a>
            ))}

            <div className="menu-dropdown">
              <button
                type="button"
                className={`menu-item menu-dropdown-toggle ${departmentsOpen ? "open" : ""}`}
                onClick={() => setDepartmentsOpen((prev) => !prev)}
                aria-expanded={departmentsOpen}
                aria-label="Toggle departments menu"
              >
                <span className="menu-text">DEPARTMENTS</span>
                <span className="dropdown-arrow">{departmentsOpen ? "v" : ">"}</span>
              </button>

              {departmentsOpen && (
                <div className="menu-subitems">
                  {departmentLinks.map((department) => (
                    <a
                      key={department.name}
                      href={department.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="menu-subitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      {department.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
          {/* FOOTER - FIXED AT BOTTOM */}
          <div className="menu-footer" style={{ 
            flexShrink: '0',
            padding: '20px',
            background: 'transparent'
          }}>
            <footer>
              <p style={{ margin: '0', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>© 2026 SCIENCE & HUMANITIES ASSOCIATION</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
