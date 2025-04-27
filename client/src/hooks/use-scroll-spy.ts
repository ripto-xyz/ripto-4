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

export function useScrollSpy({ sectionIds, offset = 100 }: ScrollSpyOptions): string {
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + offset;
      const windowHeight = window.innerHeight;
      // Use 2/5 of viewport height from top for better detection accuracy
      const middleOfViewport = scrollPosition + (windowHeight * 0.4);
      
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
      
      // First, check if any section contains the reference point in the viewport
      // Add a minimum threshold to prevent rapid switching between sections
      const sectionInMiddle = sections.find(
        section => section.position <= middleOfViewport && 
                   section.bottom >= middleOfViewport &&
                   // Ensure we're at least 50px into the section to avoid flicker at boundaries
                   middleOfViewport >= (section.position + 50)
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
