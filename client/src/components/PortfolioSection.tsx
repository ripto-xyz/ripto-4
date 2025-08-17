import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { scrollToSection } from "@/lib/utils";
import { fetchWithFallback } from "../utils/api";

interface PortfolioItem {
  id: string;
  title: string;
  categories: string;
  imageUrl: string;
  description: string;
}

export default function PortfolioSection() {
  const { data: portfolioItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio'],
    queryFn: () => fetchWithFallback<PortfolioItem[]>('/api/portfolio'),
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
    
    const section = document.getElementById('portfolio');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section id="portfolio" className={`scroll-section relative ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container-fluid mx-auto px-4 sm:px-6 z-10 relative py-12 sm:py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#FF5733] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-[#FF5733]/20 relative overflow-hidden w-full mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-poppins text-white">Portfolio</h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
                "Have a look at my wares. I'm sure there's something to suit you".
              </p>
            </div>
            
            <div className="space-y-10 md:space-y-16">
              {portfolioItems.map((item: PortfolioItem, index: number) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8`}>
                  {/* Video placeholder */}
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center group cursor-pointer">
                      {/* Placeholder image that would be replaced with video */}
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent opacity-50"></div>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 font-poppins text-white">{item.title}</h3>
                    
                    <p className="text-sm text-white/80 mb-3 font-medium">{item.categories}</p>
                    
                    <p className="text-base md:text-lg text-white mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-12">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-primary hover:bg-secondary text-white font-medium rounded-full transition-colors duration-300 text-sm sm:text-base"
              >
                Ready to Work Together?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}