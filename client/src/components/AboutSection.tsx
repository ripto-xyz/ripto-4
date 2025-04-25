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
              
              {/* Spyro portal SVG */}
              <div className="md:w-1/3 flex justify-center items-center relative">
                <div className="md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 w-64 h-64 md:w-auto md:h-auto">
                  <div className="spyro-portal">
                    <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Portal background glow */}
                      <defs>
                        <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                          <stop offset="0%" style={{stopColor:"#9B59B6", stopOpacity:0.9}} />
                          <stop offset="60%" style={{stopColor:"#7D3C98", stopOpacity:0.6}} />
                          <stop offset="100%" style={{stopColor:"#4A235A", stopOpacity:0.1}} />
                        </radialGradient>
                      </defs>
                      
                      {/* Outer portal ring */}
                      <ellipse cx="150" cy="100" rx="120" ry="80" fill="url(#portalGlow)" />
                      
                      {/* Inner portal swirl */}
                      <path d="M150,100 
                        C160,80 180,70 200,80 
                        C220,90 230,110 220,130 
                        C210,150 190,160 170,150 
                        C150,140 140,120 150,100 
                        Z" 
                        fill="#8E44AD" opacity="0.7" />
                      
                      {/* Portal inner light */}
                      <ellipse cx="150" cy="100" rx="80" ry="50" fill="#D2B4DE" opacity="0.5" />
                      
                      {/* Spyro silhouette flying through the portal */}
                      <path d="M120,100 
                        C130,90 140,85 150,90 
                        C155,92 158,95 160,100 
                        C162,105 163,110 165,115 
                        C167,120 170,125 175,123 
                        C180,121 182,115 185,110 
                        C188,105 190,100 195,98 
                        C200,96 205,95 210,100 
                        C215,105 213,110 210,115 
                        C205,120 200,122 195,120 
                        C190,118 187,115 185,110 
                        C183,115 180,120 175,125 
                        C170,130 165,132 160,130 
                        C155,128 150,125 145,120 
                        C140,115 135,110 130,105 
                        C125,100 120,95 120,100 
                        Z" 
                        fill="#6C3483" />
                      
                      {/* Spyro wings */}
                      <path d="M150,100 
                        C155,95 160,90 170,88 
                        C180,86 190,88 195,95 
                        C200,102 198,110 195,115 
                        C192,120 187,123 180,125 
                        C173,127 165,126 160,120 
                        C155,114 150,105 150,100 
                        Z" 
                        fill="#884EA0" />
                      
                      {/* Spyro tail */}
                      <path d="M120,100 
                        C115,105 110,110 105,115 
                        C100,120 95,125 90,120 
                        C85,115 87,110 90,105 
                        C93,100 98,97 105,95 
                        C112,93 120,95 120,100 
                        Z" 
                        fill="#7D3C98" />
                      
                      {/* Magical particles around the portal */}
                      <circle cx="100" cy="70" r="3" fill="#F4D03F" opacity="0.8" />
                      <circle cx="210" cy="60" r="2" fill="#F4D03F" opacity="0.7" />
                      <circle cx="240" cy="110" r="4" fill="#F4D03F" opacity="0.9" />
                      <circle cx="180" cy="150" r="3" fill="#F4D03F" opacity="0.8" />
                      <circle cx="90" cy="130" r="2" fill="#F4D03F" opacity="0.7" />
                      <circle cx="60" cy="90" r="3" fill="#F4D03F" opacity="0.6" />
                      <circle cx="130" cy="50" r="2" fill="#F4D03F" opacity="0.8" />
                      <circle cx="220" cy="140" r="3" fill="#F4D03F" opacity="0.7" />
                    </svg>
                  </div>
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
