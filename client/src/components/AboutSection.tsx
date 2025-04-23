import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function AboutSection() {
  const { data: aboutData } = useQuery({
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
  const stats = aboutData?.stats || [
    { value: "50+", label: "Projects Launched" },
    { value: "$100M+", label: "Total Raised" },
    { value: "250K+", label: "Community Members" },
    { value: "5 Years", label: "Web3 Experience" }
  ];
  
  // Default technologies if API call isn't complete
  const technologies = aboutData?.technologies || [
    "Blockchain", "DeFi", "NFTs", "DAOs", "Metaverse", "Web3 Social"
  ];

  return (
    <section id="about" className={`scroll-section relative ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">About Our Approach</h2>
            <p className="text-lg text-gray-300 mb-6">
              We're a team of Web3 natives who understand the unique challenges of marketing in the blockchain space. Our approach combines deep technical knowledge with creative marketing strategies to help projects stand out.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Whether you're launching a new token, growing a DeFi protocol, or building in the metaverse, we create marketing strategies that resonate with both crypto enthusiasts and mainstream audiences.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {technologies.map((tech, index) => (
                <div key={index} className="bg-primary bg-opacity-10 px-4 py-2 rounded-full">
                  <span className="text-primary font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1642052502340-8e71a2d9ea0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Web3 Marketing Illustration" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1639815188546-c43c240e8335?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Blockchain Marketing Concept" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1629897048512-98ae449fef8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Decentralized Marketing Strategy" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1642052294994-c1b8d63a6945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Crypto Community Building" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
