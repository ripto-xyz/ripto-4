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
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  // Use actual images passed from props, with fallback placeholder if needed
  const workingImages = images.length > 0 ? images : [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM3YWI3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMTwvdGV4dD48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDI4NWY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMjwvdGV4dD48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMzwvdGV4dD48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNDwvdGV4dD48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNTwvdGV4dD48L3N2Zz4='
  ];

  // Progressive image loading - load first 3 immediately, then preload others
  useEffect(() => {
    const loadImage = (src: string, index: number, priority: boolean = false) => {
      if (src.startsWith('data:image/svg+xml') || imagesLoaded.has(index)) return;
      
      const img = new Image();
      // Add loading priority for first few images
      if (priority) {
        img.loading = 'eager';
      } else {
        img.loading = 'lazy';
      }
      
      img.onload = () => {
        setImagesLoaded(prev => new Set(prev).add(index));
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}`);
      };
      
      img.src = src;
    };

    // Load first image immediately with high priority
    if (workingImages[0]) loadImage(workingImages[0], 0, true);
    
    // Load next 2 images with high priority
    workingImages.slice(1, 3).forEach((src, idx) => {
      setTimeout(() => loadImage(src, idx + 1, true), 100 * idx);
    });
    
    // Preload remaining images with lower priority after a delay
    setTimeout(() => {
      workingImages.slice(3).forEach((src, idx) => {
        loadImage(src, idx + 3, false);
      });
    }, 500);
    
  }, [workingImages, imagesLoaded]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % workingImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + workingImages.length) % workingImages.length);
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

  return (
    <>
      <div className={`relative aspect-video bg-gray-800 rounded-xl shadow-lg group ${className}`}>
        {/* Main image with optimized loading */}
        <img
          src={workingImages[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300 cursor-pointer rounded-xl"
          style={{ zIndex: 1 }}
          onClick={openLightbox}
          loading={currentIndex < 3 ? "eager" : "lazy"}
          decoding="async"
        />

        {/* Navigation arrows */}
        {workingImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all duration-300 opacity-0 group-hover:opacity-100"

              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all duration-300 opacity-0 group-hover:opacity-100"

              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}


        {/* Dot indicators - FIXED */}
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black px-4 py-2 rounded-full"
        >
          {workingImages.map((_, index) => (
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
                src={workingImages[currentIndex]}
                alt={`${alt} - Image ${currentIndex + 1} (Full Size)`}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: '82vh', maxWidth: '86vw' }}
                loading="eager"
                decoding="async"
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
              {workingImages.length > 1 && (
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