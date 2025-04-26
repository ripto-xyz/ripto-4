import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { useEffect, useState } from "react";

export default function Home() {
  // Use our custom swipe navigation hook
  const { activeSection } = useSwipeNavigation();
  
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
      <main className="flex flex-col">
        {/* IMPORTANT: Hard-coding the exact section order to ensure they appear correctly */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
      </main>
      <ContactSection />
      <Footer />
    </div>
  );
}
