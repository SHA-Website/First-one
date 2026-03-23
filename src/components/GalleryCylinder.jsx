import { useEffect, useRef, useState } from "react";

export default function GalleryCylinder({ topImages, bottomImages }) {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const wrapperRef = useRef(null);
  
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  
  // LIGHTBOX STATE
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  //   MOMENTUM PHYSICS
  const velocityRef = useRef(0);
  const lastPositionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumAnimationRef = useRef(null);
  const dragDistanceRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const isTrackingRef = useRef(false);
  const clickedImageRef = useRef(null);

  //   AUTO ROTATION (when not dragging and no momentum)
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isDragging && Math.abs(velocityRef.current) < 0.01) {
        setAngle((prev) => prev + 0.25);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  //   UPDATE TRANSFORMS
  useEffect(() => {
    if (topRef.current) {
      topRef.current.style.transform = `rotateX(-12deg) rotateY(${angle}deg)`;
    }
    if (bottomRef.current) {
      bottomRef.current.style.transform = `rotateX(-12deg) rotateY(${angle}deg)`;
    }
  }, [angle]);

  //   MOMENTUM ANIMATION
  const startMomentum = () => {
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
    }

    const animateMomentum = () => {
      velocityRef.current *= 0.95;
      setAngle((prev) => prev + velocityRef.current);

      if (Math.abs(velocityRef.current) > 0.01) {
        momentumAnimationRef.current = requestAnimationFrame(animateMomentum);
      } else {
        velocityRef.current = 0;
      }
    };

    animateMomentum();
  };

  //   HANDLE IMAGE CLICK
  const handleImageClick = (img) => {
    // Only open if it was a quick tap/click (not a drag)
    const timeSinceStart = Date.now() - dragStartTimeRef.current;
    
    // Click/tap if: small distance moved AND quick action
    if (dragDistanceRef.current < 10 && timeSinceStart < 300) {
      setSelectedImage(img);
      setIsLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  //   CLOSE LIGHTBOX
  const closeLightbox = (e) => {
    if (e) e.stopPropagation();
    setIsLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  //   HANDLERS
  const handleStart = (clientX, clientY = 0, targetElement = null) => {
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
    }
    velocityRef.current = 0;
    
    isTrackingRef.current = true;
    setStartX(clientX);
    setCurrentAngle(angle);
    dragDistanceRef.current = 0;
    dragStartTimeRef.current = Date.now();
    hasDraggedRef.current = false;
    
    // Track if clicked on an image
    if (targetElement && targetElement.tagName === 'IMG') {
      clickedImageRef.current = targetElement.src;
    } else {
      clickedImageRef.current = null;
    }
    
    touchStartPosRef.current = { x: clientX, y: clientY };
    
    lastPositionRef.current = clientX;
    lastTimeRef.current = Date.now();
  };

  const handleMove = (clientX) => {
    if (!isTrackingRef.current) return;
    
    const diffX = Math.abs(clientX - touchStartPosRef.current.x);
    // Check if we should start dragging (horizontal movement > 5px)
    if (!isDragging && diffX > 5) {
      setIsDragging(true);
      hasDraggedRef.current = true;
      clickedImageRef.current = null; // Cancel image click if we dragged
      document.body.style.userSelect = 'none';
    }
    
    // If we're dragging, update the rotation
    if (isDragging || diffX > 5) {
      const diff = clientX - startX;
      dragDistanceRef.current = Math.abs(diff);
      const rotationChange = diff * 0.5;
      setAngle(currentAngle + rotationChange);
      
      const now = Date.now();
      const timeDelta = now - lastTimeRef.current;
      
      if (timeDelta > 0) {
        const positionDelta = clientX - lastPositionRef.current;
        velocityRef.current = (positionDelta * 0.5) / timeDelta * 16;
      }
      
      lastPositionRef.current = clientX;
      lastTimeRef.current = now;
    }
  };

  const handleEnd = () => {
    // Check if we should open lightbox
    if (clickedImageRef.current && !hasDraggedRef.current && dragDistanceRef.current < 10) {
      handleImageClick(clickedImageRef.current);
    }
    
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = '';
      
      if (Math.abs(velocityRef.current) > 0.1) {
        startMomentum();
      }
    }
    
    // Reset tracking
    isTrackingRef.current = false;
    clickedImageRef.current = null;
    setStartX(0);
  };

  //   GLOBAL EVENT LISTENERS
  useEffect(() => {
    // Mouse events on entire document
    const handleGlobalMouseMove = (e) => {
      if (isTrackingRef.current && !isLightboxOpen) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isTrackingRef.current && !isLightboxOpen) {
        handleEnd();
      }
    };

    // Touch events on entire document
    const handleGlobalTouchMove = (e) => {
      if (isTrackingRef.current && e.touches.length === 1 && !isLightboxOpen) {
        const touch = e.touches[0];
        const diffX = Math.abs(touch.clientX - touchStartPosRef.current.x);
        const diffY = Math.abs(touch.clientY - touchStartPosRef.current.y);
        
        // Only prevent default if we're dragging horizontally
        if (isDragging || (diffX > 5 && diffX > diffY)) {
          e.preventDefault();
          handleMove(touch.clientX);
        }
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isTrackingRef.current && !isLightboxOpen) {
        handleEnd();
      }
    };

    // Add global listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, isLightboxOpen]);

  //   CLEANUP
  useEffect(() => {
    return () => {
      if (momentumAnimationRef.current) {
        cancelAnimationFrame(momentumAnimationRef.current);
      }
      document.body.style.overflow = '';
    };
  }, []);

  //   GET RADIUS
  const getRadius = () => {
    if (typeof window === 'undefined') return 400;
    const width = window.innerWidth;
    if (width > 1024) return 550;
    if (width > 768) return 450;
    return 340;
  };

  //   Z-INDEX CALCULATION
  const calculateZIndex = (itemAngle, currentRotation) => {
    const normalizedAngle = ((itemAngle - currentRotation) % 360 + 360) % 360;
    
    if (normalizedAngle > 90 && normalizedAngle < 270) {
      return Math.floor(100 - Math.abs(180 - normalizedAngle));
    } else {
      const frontAngle = normalizedAngle > 180 ? 360 - normalizedAngle : normalizedAngle;
      return Math.floor(200 - frontAngle);
    }
  };

  // Render items
  const renderItems = (items, isOffset = false) => {
    const total = items.length;
    if (total === 0) return null;
    const angleStep = 360 / total;
    const radius = getRadius();

    return items.map((img, i) => {
      const offset = isOffset ? angleStep / 2 : 0;
      const itemAngle = i * angleStep + offset;
      const zIndex = calculateZIndex(itemAngle, angle);

      return (
        <div
          key={i}
          className="cylinder-item"
          style={{
            transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
            zIndex: zIndex
          }}
        >
          <img 
            src={img} 
            alt={`Gallery ${i + 1}`} 
            loading="lazy"
            draggable="false"
          />
        </div>
      );
    });
  };

  // Mouse down handler
  const handleMouseDown = (e) => {
    if (!isLightboxOpen) {
      handleStart(e.clientX, e.clientY, e.target);
    }
  };

  // Touch start handler
  const handleTouchStart = (e) => {
    if (!isLightboxOpen && e.touches.length === 1) {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY, e.target);
    }
  };

  return (
    <>
      <div 
        className="cylinder-wrapper"
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >

        {/*   TOP CYLINDER */}
        <div className="cylinder-track top-track">
          <div className="cylinder" ref={topRef}>
            {renderItems(topImages, false)}
          </div>
        </div>

        {/*   BOTTOM CYLINDER */}
        <div className="cylinder-track bottom-track">
          <div className="cylinder" ref={bottomRef}>
            {renderItems(bottomImages, true)}
          </div>
        </div>

      </div>

      {/*   LIGHTBOX MODAL - Close button on image corner */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Full size preview" 
              className="lightbox-image"
            />
            <button 
              className="lightbox-close" 
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
