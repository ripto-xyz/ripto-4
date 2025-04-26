import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Array of section IDs in order of appearance
export const sectionIds = ['home', 'about', 'portfolio', 'services', 'contact'];

// Function to get the next section ID
export function getNextSectionId(currentSectionId: string): string | null {
  const currentIndex = sectionIds.indexOf(currentSectionId);
  if (currentIndex === -1 || currentIndex === sectionIds.length - 1) {
    return null;
  }
  return sectionIds[currentIndex + 1];
}

// Function to get the previous section ID
export function getPrevSectionId(currentSectionId: string): string | null {
  const currentIndex = sectionIds.indexOf(currentSectionId);
  if (currentIndex <= 0) {
    return null;
  }
  return sectionIds[currentIndex - 1];
}

// Function to scroll to a section
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    // Special handling for navigating from About to Home
    // This helps prevent unintentional navigation from About to Home
    const currentSection = sectionIds.find(id => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top <= 120 && rect.bottom > 120; // Check if section is at top of viewport
    });
    
    // If we're in About section and trying to go back to Home,
    // add extra validation to make sure it's intentional
    if (currentSection === 'about' && sectionId === 'home') {
      // Check if we're very close to the top of the About section
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Only allow going back to home if we're in the top 5% of the About section
        // This helps prevent accidental navigation
        if (rect.top > -(viewportHeight * 0.05)) {
          // Ensure we scroll to the top of the section minus the navbar height
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Normal navigation for all other sections
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }
}
