import "../styles/gallery.css";
import GalleryCylinder from "../components/GalleryCylinder";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { galleryImages } from "../data/galleryImages";

export default function GalleryPage() {
  //  Calculate midpoint dynamically so it works for any number of images
  const midpoint = Math.ceil(galleryImages.length / 2);

  return (
    <div className="gallery-bg">

      {/* SIDEBAR/NAVBAR COMPONENT */}
      <Sidebar />

      {/*  PAGE TITLE */}
      <div className="gallery-page-content">
        <h1 className="gallery-title" style={{ marginTop: '60px' }}>Gallery</h1>

        {/* CYLINDRICAL GALLERY - Dynamically splits images in half */}
        <GalleryCylinder
          topImages={galleryImages.slice(0, midpoint)}
          bottomImages={galleryImages.slice(midpoint)}
        />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

