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
      <div className={`relative aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-lg group ${className}`}>
        {/* Main image */}
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300 cursor-pointer"
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

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/30 to-transparent pointer-events-none"></div>
      </div>

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
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full p-2"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full size image */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <img
                src={images[currentIndex]}
                alt={`${alt} - Image ${currentIndex + 1} (Full Size)`}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: '82vh', maxWidth: '86vw' }}
              />
            </div>

            {/* Navigation in lightbox */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black border-2 border-black rounded-full p-3 transition-all duration-300 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black border-2 border-black rounded-full p-3 transition-all duration-300 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          {/* Image counter - positioned outside the image area */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 text-black text-sm px-4 py-2 rounded-full border border-black/20 shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};