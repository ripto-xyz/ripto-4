import { useState, useEffect } from "react";
import { MapPin, Mail, Users } from "lucide-react";
import eloraImage from "@assets/elora.png";

export default function ContactSection() {
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
    
    const section = document.getElementById('contact');
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
    <section id="contact" className={`scroll-section relative overflow-visible pt-24 md:pt-28 lg:pt-36 ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container-fluid mx-auto px-4 sm:px-6 z-10 relative py-12 sm:py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto relative overflow-visible">
          <div className="relative overflow-visible">
            <div className="absolute -top-20 right-[-40px] md:-top-24 md:right-[-60px] lg:-top-28 lg:right-[-80px] z-50 w-40 md:w-56 lg:w-72 elora-character" style={{ pointerEvents: 'none' }}>
              <img 
                src={eloraImage} 
                alt="Elora character" 
                className="w-full h-auto filter drop-shadow-lg"
              />
            </div>
            <div className="bg-[#D81B60] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-[#D81B60]/20 relative overflow-visible w-full mx-auto mt-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 font-poppins text-white">Get in Touch</h2>
                <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto font-medium">
                  Ready to elevate your Web3 marketing? Let's discuss your project.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
                <div className="text-center md:text-left md:pl-2">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="text-white mb-2 sm:mb-3">
                      <MapPin size={28} strokeWidth={1.5} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold font-poppins text-white mb-2">Location</h3>
                    <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                      Global, Remote-First<br />
                      Based in Sevilla, Spain
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="text-white mb-2 sm:mb-3">
                      <Mail size={28} strokeWidth={1.5} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold font-poppins text-white mb-2">Email</h3>
                    <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                      hello@ripto.eth<br />
                      laurence@web3.marketing
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="text-white mb-2 sm:mb-3">
                      <Users size={28} strokeWidth={1.5} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold font-poppins text-white mb-2">Connect</h3>
                    <div className="flex space-x-5 sm:space-x-6 mt-1">
                      <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}