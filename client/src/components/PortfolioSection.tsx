import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function PortfolioSection() {
  const { data: portfolioItems = [] } = useQuery({
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
    <section id="portfolio" className={`scroll-section relative ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container mx-auto px-6 z-10 relative py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">Our Portfolio</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing our successful campaigns and projects in the Web3 space
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item overflow-hidden rounded-xl group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-2 font-poppins">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.categories}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 bg-primary hover:bg-secondary text-white font-medium rounded-full transition-colors duration-300"
          >
            Ready to Work Together?
          </a>
        </div>
      </div>
    </section>
  );
}
