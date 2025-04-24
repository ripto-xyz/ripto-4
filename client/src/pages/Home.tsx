import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useEffect, useState } from "react";

export default function Home() {
  // Define the exact order of sections for navigation
  const sectionOrder = ["home", "about", "services", "portfolio", "contact"];
  
  const activeSection = useScrollSpy({
    sectionIds: sectionOrder,
    offset: 100
  });
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Close mobile menu when clicking anywhere else
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMobileMenu]);
  
  // Function to render sections in the correct order
  const renderSections = () => {
    // This ensures the exact order of sections in the DOM
    const sections = {
      home: <HeroSection key="home" />,
      about: <AboutSection key="about" />,
      services: <ServicesSection key="services" />,
      portfolio: <PortfolioSection key="portfolio" />,
      contact: <ContactSection key="contact" />
    };
    
    // Return sections in the defined order
    return sectionOrder.map(id => sections[id as keyof typeof sections]);
  };
  
  return (
    <div className="min-h-screen">
      <VideoBackground />
      <Navbar 
        activeSection={activeSection} 
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      <main>
        {renderSections()}
      </main>
      <Footer />
    </div>
  );
}
