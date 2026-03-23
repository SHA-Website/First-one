import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import sha from "../assets/logo.png";
import kecLogo from "../assets/kec-logo.png";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const showKecLogo = true;
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
    
    if (open) {
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
  }, [open]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setDepartmentsOpen(false);
    }
  }, [open]);

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (location.pathname === "/") {
      const scrollContainer = document.querySelector('.home-scroll');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const scrollContainer = document.querySelector('.home-scroll');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 100);
    }
  };

  const currentLogo = isHomePage ? logo : sha;

  return (
    <>
      <header className="main-navbar">
        <div 
          className="nav-left" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <img src={currentLogo} className="nav-logo" alt="SHA" />
          {(!showKecLogo || !isHomePage) && (
            <span className="nav-association-text">
              Science & Humanities Association
            </span>
          )}
        </div>

        {showKecLogo && (
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
        )}

        <div className="nav-right">
          <span 
            className="nav-menu" 
            onClick={() => setOpen(!open)}
            role="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </span>
        </div>
      </header>

      {/* SIDE MENU */}
      <div className={`side-menu ${open ? "open" : ""}`}>
        {/* OVERLAY */}
        <div 
          className="menu-overlay" 
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        
        {/* MENU DRAWER */}
        <div className={`menu-drawer ${open ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
          {/* CLOSE BUTTON */}
          <button 
            className="close-btn" 
            onClick={() => setOpen(false)}
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
            paddingBottom: '80px',
            marginBottom: '0'
          }}>
            {menuItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`menu-item ${location.pathname === item.path || 
                  (item.path === "/events" && location.pathname.startsWith("/events")) ? "active" : ""}`}
                type="button"
              >
                <span className="menu-text">{item.name.toUpperCase()}</span>
              </button>
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
                      onClick={() => setOpen(false)}
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

export default Navbar;

