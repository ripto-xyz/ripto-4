import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="max-w-5xl mx-auto">
          {/* White semi-transparent container behind the text with Spyro portal image */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Text content area */}
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 font-poppins md:text-left text-center">
                  <span className="whitespace-nowrap">About&nbsp;Me</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    I'm a Web3 native who understands the unique challenges of marketing in the blockchain space. My approach combines deep technical knowledge with creative marketing strategies to help projects stand out.
                  </p>
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    Whether you're launching a new token, growing a DeFi protocol, or building in the metaverse, I create marketing strategies that resonate with both crypto enthusiasts and mainstream audiences.
                  </p>
                
                  {/* Technologies list displayed inline without buttons */}
                  <div className="md:mt-10 mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white/90 md:text-left text-center">Expertise In:</h3>
                    <p className="text-white text-lg md:text-xl font-medium md:text-left text-center">
                      {technologies.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Spyro portal image */}
              <div className="md:w-1/3 flex justify-center items-center relative">
                <div className="md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 w-64 h-64 md:w-auto md:h-auto">
                  <img 
                    src="/assets/spyro-portal.png" 
                    alt="Spyro flying through a portal" 
                    className="w-full h-auto max-w-[300px] md:max-w-none object-contain spyro-portal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section with matching white semi-transparent background */}
        <div className="mt-16">
          <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-3">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-3">{stat.value}</div>
                  <p className="text-white/80 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
