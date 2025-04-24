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
  const activeSection = useScrollSpy({
    sectionIds: ["home", "about", "services", "portfolio", "contact"],
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
  
  return (
    <div className="min-h-screen">
      <VideoBackground />
      <Navbar 
        activeSection={activeSection} 
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
