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

// Function to scroll to a section - completely rebuilt for maximum reliability
export function scrollToSection(sectionId: string): void {
  // Get all sections
  const sections: Record<string, HTMLElement | null> = {};
  for (const id of sectionIds) {
    sections[id] = document.getElementById(id);
  }
  
  // Exit if target section is missing
  if (!sections[sectionId]) return;
  
  // Calculate current section
  const windowMiddle = window.scrollY + window.innerHeight / 2;
  let currentSectionId = sectionIds[0]; // Default to first section
  
  // Determine which section we're currently in
  for (const id of sectionIds) {
    if (!sections[id]) continue;
    
    const sectionTop = sections[id]!.offsetTop;
    const sectionHeight = sections[id]!.clientHeight;
    
    if (windowMiddle >= sectionTop && windowMiddle < sectionTop + sectionHeight) {
      currentSectionId = id;
      break;
    }
  }
  
  // Get target section position - always use hardcoded offsets for consistency
  // Use ViewportHeight units to be more consistent and stop at exact section boundaries
  const viewportHeight = window.innerHeight;
  
  // Special case for Services section to ensure it always stays visible
  if (sectionId === 'services') {
    // Cancel any ongoing scrolling first
    window.scrollTo({top: window.scrollY, behavior: 'auto'});
    
    // Forcefully position to a specific value to ensure consistency
    setTimeout(() => {
      // Get the exact services section position
      const servicesTop = sections.services!.offsetTop;
      
      // Use an absolutely fixed position
      window.scrollTo({
        top: servicesTop,
        behavior: 'smooth'
      });
    }, 50);
    return;
  }
  
  // For all other sections, use normal scrolling with appropriate offset
  const offsets: {[key: string]: number} = {
    'home': 0,
    'about': 0, 
    'portfolio': 0,
    'contact': 0,
    'default': 0
  };
  
  const offset = offsets[sectionId] || offsets.default;
  const targetPosition = sections[sectionId]!.offsetTop - offset;
  
  // Special handling for portfolio-services transitions
  if ((currentSectionId === 'portfolio' && sectionId === 'services') || 
      (currentSectionId === 'services' && sectionId === 'portfolio')) {
    
    // Stop any ongoing scrolling
    window.scrollTo({top: window.scrollY, behavior: 'auto'});
    
    // Then navigate with a delay
    setTimeout(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 100);
    return;
  }
  
  // Standard scroll for other transitions
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}
