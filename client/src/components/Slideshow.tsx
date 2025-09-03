import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SlideshowProps {
  images: string[];
  alt: string;
  className?: string;
}

export const Slideshow: React.FC<SlideshowProps> = ({ images, alt, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox();
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className={`relative aspect-video bg-gray-800 rounded-xl shadow-lg group ${className}`}>
        {/* Main image */}
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300 cursor-pointer rounded-xl"
          onClick={openLightbox}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/30 to-transparent pointer-events-none"></div>

        {/* Dot indicators - FIXED */}
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black px-4 py-2 rounded-full"
          style={{ zIndex: 9999 }}
        >
          {[0,1,2,3,4].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full border-2 border-white ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-transparent hover:bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Click to enlarge text */}
      <p className="text-center text-sm text-gray-300 mt-8 italic">Click image to enlarge</p>

      {/* Lightbox Modal - rendered as portal */}
      {isLightboxOpen && createPortal(
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
          style={{ 
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={handleLightboxClick}
        >

          {/* Full size image with navigation */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <img
                src={images[currentIndex]}
                alt={`${alt} - Image ${currentIndex + 1} (Full Size)`}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: '82vh', maxWidth: '86vw' }}
              />

              {/* Close button positioned at top right of image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="absolute top-2 right-2 bg-gradient-to-br from-black via-gray-700 to-white border-2 border-white/50 text-white hover:from-gray-800 hover:via-gray-600 hover:to-gray-300 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-2xl backdrop-blur-sm"
                style={{ 
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.6)',
                  background: 'linear-gradient(135deg, #000000 0%, #4a5568 50%, #ffffff 100%)',
                  zIndex: 10
                }}
                aria-label="Close lightbox"
              >
                ✕
              </button>

              {/* Navigation buttons positioned relative to image */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white border-2 border-white rounded-full p-3 transition-all duration-300 shadow-2xl backdrop-blur-sm"
                    style={{ 
                      boxShadow: '0 0 0 3px rgba(0,0,0,0.5), 0 10px 25px rgba(0,0,0,0.4)'
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white border-2 border-white rounded-full p-3 transition-all duration-300 shadow-2xl backdrop-blur-sm"
                    style={{ 
                      boxShadow: '0 0 0 3px rgba(0,0,0,0.5), 0 10px 25px rgba(0,0,0,0.4)'
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>

        </div>,
        document.body
      )}
    </>
  );
};