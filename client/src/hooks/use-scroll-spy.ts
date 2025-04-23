import { useState, useEffect } from "react";

interface ScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export function useScrollSpy({ sectionIds, offset = 0 }: ScrollSpyOptions): string {
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      const sections = sectionIds.map((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return { id: sectionId, position: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id: sectionId,
          position: rect.top + window.scrollY,
        };
      });
      
      const visibleSections = sections
        .filter(section => section.position <= scrollPosition)
        .sort((a, b) => b.position - a.position);
      
      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].id);
      } else if (sections.length > 0) {
        setActiveSection(sections[0].id);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);
  
  return activeSection;
}
