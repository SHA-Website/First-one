import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetails from "./pages/EventDetails";
import GalleryPage from "./pages/GalleryPage";
import ClusterMembers from "./pages/ClusterMembers";
import AboutPage from "./pages/AboutPage";

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <Loader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Home Page with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />

        {/* Event Pages */}
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:eventId" element={<EventDetails />} />

        {/* Gallery Page */}
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Cluster Members Page */}
        <Route path="/cluster-members" element={<ClusterMembers />} />

        {/* About Page */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
