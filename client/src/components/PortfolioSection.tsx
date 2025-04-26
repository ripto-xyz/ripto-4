import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section id="portfolio" className={`scroll-section relative pb-0 mb-0 ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 z-10 relative pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-poppins">Our Portfolio</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing our successful campaigns and projects in the Web3 space
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioItems.map((item: PortfolioItem, index: number) => (
            <Link href={`/case-study/${item.id}`} key={index}>
              <div className="portfolio-item overflow-hidden rounded-xl group cursor-pointer h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden h-full">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    {item.id === 'dex-growth-campaign' ? (
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 font-poppins bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-orange-500">
                        {item.title}
                      </h3>
                    ) : (
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 font-poppins">{item.title}</h3>
                    )}
                    <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">{item.categories}</p>
                    <div className="flex items-center text-purple-400 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Case Study <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <a 
            href="#contact" 
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-primary hover:bg-secondary text-white font-medium rounded-full transition-colors duration-300 text-sm sm:text-base"
          >
            Ready to Work Together?
          </a>
        </div>
      </div>
    </section>
  );
}
