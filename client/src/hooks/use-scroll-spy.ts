import { useState, useEffect } from "react";

interface ScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

interface SectionPosition {
  id: string;
  position: number;
  height: number;
  bottom: number;
}

export function useScrollSpy({ sectionIds, offset = 0 }: ScrollSpyOptions): string {
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + offset;
      const windowHeight = window.innerHeight;
      const middleOfViewport = scrollPosition + (windowHeight / 3); // Use 1/3 instead of 1/2 for better UX
      
      // Get all section positions
      const sections: SectionPosition[] = sectionIds
        .map((sectionId): SectionPosition => {
          const element = document.getElementById(sectionId);
          if (!element) return { id: sectionId, position: 0, height: 0, bottom: 0 };
          
          const rect = element.getBoundingClientRect();
          const bottom = rect.top + window.scrollY + rect.height;
          return {
            id: sectionId,
            position: rect.top + window.scrollY,
            height: rect.height,
            bottom
          };
        })
        .filter(section => section.height > 0); // Only consider sections that are rendered
      
      // Special case for the About section - if we're at the top, it's active
      if (scrollPosition < 10) {
        setActiveSection('home');
        return;
      }
      
      // First, check if any section contains the middle of the viewport
      const sectionInMiddle = sections.find(
        section => section.position <= middleOfViewport && 
                   section.bottom >= middleOfViewport
      );
      
      if (sectionInMiddle) {
        setActiveSection(sectionInMiddle.id);
        return;
      }
      
      // If no section contains middle, find the closest visible section
      const visibleSections = sections
        .filter(section => 
          (section.position <= scrollPosition + windowHeight) && 
          (section.bottom >= scrollPosition)
        )
        .sort((a, b) => {
          // Calculate distance from middle of viewport to middle of each section
          const distanceA = Math.abs((a.position + a.height/2) - middleOfViewport);
          const distanceB = Math.abs((b.position + b.height/2) - middleOfViewport);
          return distanceA - distanceB;
        });
      
      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].id);
      } else if (scrollPosition <= 10) {
        // If at the very top of the page, select the first section
        setActiveSection(sectionIds[0]);
      } else if (scrollPosition + windowHeight >= document.body.scrollHeight - 10) {
        // If at the very bottom of the page, select the last section
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    // Also recalculate on window resize as section positions may change
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offset]);
  
  return activeSection;
}
