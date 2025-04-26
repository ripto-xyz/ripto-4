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

// Function to scroll to a section - simplified version to avoid runtime errors
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Get the viewport height to help calculate position
  const viewportHeight = window.innerHeight;
  const elementHeight = element.getBoundingClientRect().height;
  
  // Improved offset mapping - adjusts based on section height and viewport
  const offsets: {[key: string]: number} = {
    'home': 0,                  // Home should always be at the very top
    'about': 100,               // Standard offset for about
    'portfolio': 100,           // Standard offset for portfolio
    'services': 80,             // Reduced offset to stop properly at services
    'contact': Math.min(80, viewportHeight * 0.1),  // Smaller offset for contact to ensure it's visible
    'default': 100
  };
  
  // Get offset with fallback to default
  const offset = offsets[sectionId] || offsets.default;
  
  // Calculate final position
  let targetPosition = element.offsetTop - offset;
  
  // For services section, ensure it doesn't scroll too far
  if (sectionId === 'services') {
    // Make sure we don't scroll beyond what's needed to see the section title
    targetPosition = Math.min(targetPosition, element.offsetTop - 80);
  }
  
  // For contact section, ensure it stops properly
  if (sectionId === 'contact') {
    // Make sure we see the section and don't scroll beyond it
    const maxScroll = document.body.scrollHeight - viewportHeight;
    targetPosition = Math.min(targetPosition, maxScroll);
  }
  
  try {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } catch (err) {
    // Fallback for older browsers
    window.scrollTo(0, targetPosition);
  }
}
