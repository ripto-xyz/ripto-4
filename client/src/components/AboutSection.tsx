import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SpyroPortal from "./SpyroPortal";
import { fetchWithFallback } from "../utils/api";
import appleLogo from "@assets/apple_1755274762626.png";
import appleNameLogo from "@assets/apple_Name_1755274762626.png";
import everclearLogo from "@assets/Everclear-Logo-White1_1755274762627.png";

// Define types for the about data
interface Stat {
  value: string;
  label: string;
}

interface AboutData {
  stats: Stat[];
  technologies: string[];
}

export default function AboutSection() {
  const { data: aboutData } = useQuery<AboutData>({
    queryKey: ['/api/about'],
    queryFn: () => fetchWithFallback<AboutData>('/api/about'),
    staleTime: Infinity,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  // Default stats if API call isn't complete
  const stats: Stat[] = aboutData?.stats || [
    { value: "50+", label: "Projects Launched" },
    { value: "$100M+", label: "Total Raised" },
    { value: "250K+", label: "Community Members" },
    { value: "5 Years", label: "Web3 Experience" }
  ];
  
  // Default technologies if API call isn't complete
  const technologies: string[] = aboutData?.technologies || [
    "Blockchain", "DeFi", "NFTs", "DAOs", "Metaverse", "Web3 Social"
  ];

  return (
    <section id="about" className={`scroll-section relative ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container-fluid mx-auto px-4 sm:px-6 z-10 relative py-12 sm:py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          {/* White semi-transparent container behind the text with Spyro portal image */}
          <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-white/20 relative overflow-hidden w-full mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Text content area */}
              <div className="md:w-1/2 lg:w-3/5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-poppins md:text-left text-center">
                  <span className="whitespace-nowrap">About&nbsp;Me</span>
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed">
                    I'm a Web3 native who understands the unique challenges of marketing in the blockchain space. My approach combines deep technical knowledge with creative marketing strategies to help projects stand out.
                  </p>
                
                  {/* Technologies list displayed inline without buttons */}
                  <div className="mt-6 md:mt-8">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-white/90 md:text-left text-center">Expertise In:</h3>
                    <p className="text-white text-base sm:text-lg md:text-xl font-medium md:text-left text-center">
                      {technologies.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Spyro Sunny Beach portal image */}
              <div className="md:w-1/2 lg:w-2/5 flex justify-center items-center relative">
                <div className="flex justify-center w-full md:justify-end">
                  <SpyroPortal />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section with matching white semi-transparent background and same max-width */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-white/20 w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 text-center">
                {/* Apple logo with name */}
                <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center h-32 md:h-40 lg:h-48">
                  <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
                    <img src={appleLogo} alt="Apple" className="h-16 md:h-20 lg:h-24 xl:h-28 object-contain" />
                    <img src={appleNameLogo} alt="Apple" className="h-14 md:h-18 lg:h-20 xl:h-24 object-contain" />
                  </div>
                </div>
                
                {/* Everclear logo */}
                <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center h-32 md:h-40 lg:h-48">
                  <img src={everclearLogo} alt="Everclear" className="h-20 md:h-24 lg:h-28 xl:h-32 max-w-full object-contain" />
                </div>
                
                {/* Remaining stats */}
                {stats.slice(2).map((stat, index) => (
                  <div key={index + 2} className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center h-32 md:h-40 lg:h-48">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3">{stat.value}</div>
                    <p className="text-white/80 font-medium text-sm sm:text-base">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
