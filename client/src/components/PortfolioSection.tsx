import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { scrollToSection } from "@/lib/utils";
import { fetchWithFallback } from "../utils/api";
import { Slideshow } from "./Slideshow";

interface PortfolioItem {
  id: string;
  title: string;
  categories: string;
  imageUrl: string;
  slideshowImages?: string[];
  description: string;
}

// Client-side slideshow image override to bypass deployment issues
const SLIDESHOW_OVERRIDES = {
  0: [ // Section 1 - Everclear
    "/attached_assets/1_Everclear_Site_1756989645481.png",
    "/attached_assets/2_mainnet_1756989645482.png", 
    "/attached_assets/3_CLEAR_Website_1756989645482.png",
    "/attached_assets/4_X_1756989645483.png",
    "/attached_assets/5_Sunset_1756989645481.png"
  ],
  1: [ // Section 2 - Slise Advertising
    "/attached_assets/1_Slise_1757002746363.png",
    "/attached_assets/2_Slise_1757002746363.png",
    "/attached_assets/backbone_before_after_1766075688900.png",
    "/attached_assets/rebalance_before_fter_1766075688901.png", 
    "/attached_assets/5_Dune_1757002746364.png"
  ],
  2: [ // Section 3 - Content Marketing
    "/attached_assets/1_Solana_1757090837848.png",
    "/attached_assets/2_Bera_1757090837849.png",
    "/attached_assets/3_lifi_1757090837849.png", 
    "/attached_assets/4_Ink_1757090837850.png",
    "/attached_assets/5_Hyper_1757090837847.png",
    "/attached_assets/6_Across_1757090837847.png"
  ],
  3: [ // Section 4 - Community Engagement  
    "/attached_assets/Everclear_Ecosystem_Map_1766073306439.png",
    "/attached_assets/4_corrected Ripto pic_1757116701344.png",
    "/attached_assets/1_believe_1757091086503.png",
    "/attached_assets/2_buyback_1757091086503.png",
    "/attached_assets/3_plugged_1757091086504.png",
    "/attached_assets/5_CLEAR_1757091086504.png",
    "/attached_assets/6_Milestone_1757091086502.png"
  ],
  4: [ // Section 5 - Press Releases
    "/attached_assets/1_Business_1757028624524.png",
    "/attached_assets/2_NEAR_1757027968458.png",
    "/attached_assets/3_Arb_1757027968458.png",
    "/attached_assets/4_Uni_1757027968458.png",
    "/attached_assets/5_Tron_1757029188266.png",
    "/attached_assets/BaseEverclear1_1766073388841.png"
  ]
};

export default function PortfolioSection() {
  const { data: rawPortfolioItems = [], isLoading, error } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio'],
    queryFn: () => fetchWithFallback<PortfolioItem[]>('/api/portfolio'),
    staleTime: 0,
    refetchOnMount: true,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Override slideshow images with working attached assets
  const portfolioItems = rawPortfolioItems.map((item, index) => ({
    ...item,
    slideshowImages: SLIDESHOW_OVERRIDES[index as keyof typeof SLIDESHOW_OVERRIDES] || item.slideshowImages
  }));
  
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
          <div className="bg-[#FF5733] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-[#FF5733]/20 relative w-full mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-poppins text-white">Portfolio</h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
                "Have a look at my wares. I'm sure there's something to suit you".
              </p>
            </div>
            
            {isLoading ? (
              <div className="text-center">
                <p className="text-lg md:text-xl text-white/90">Loading...</p>
              </div>
            ) : (
            <div className="space-y-6 md:space-y-16">
              {portfolioItems.map((item: PortfolioItem, index: number) => (
                  <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-8 items-stretch md:items-start`}>
                    {/* Image/Slideshow */}
                    <div className="w-full md:w-1/2 flex-shrink-0">
                      {item.slideshowImages && item.slideshowImages.length > 0 ? (
                      <Slideshow 
                        images={item.slideshowImages} 
                        alt={item.title}
                        className="cursor-pointer mx-auto"
                        coverImageIndices={index === 3 ? [0] : []}
                      />
                    ) : (
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
                    )}
                  </div>
                  
                  {/* Text content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center flex-grow min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 font-poppins text-white">{item.title}</h3>
                    
                    <div className="text-base md:text-lg text-white mb-4 leading-relaxed space-y-2">
                      {item.description.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className="mb-2">
                          {line.split('**').map((part, partIndex) => 
                            partIndex % 2 === 1 ? (
                              <strong key={partIndex} className="font-bold">{part}</strong>
                            ) : (
                              <span key={partIndex}>{part}</span>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
            
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