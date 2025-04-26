import { useState } from "react";
import { MapPin, Mail, Users } from "lucide-react";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="contact" className={`scroll-section relative ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 z-10 relative py-12 sm:py-16 md:py-20">
        <div className="max-w-[900px] mx-auto relative">
          {/* Pink opaque background container */}
          <div className="absolute inset-0 bg-pink-500 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-xl border border-pink-500/20"></div>
          
          <div className="relative z-10 px-4 py-6 sm:py-8 md:py-10">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-poppins text-white">Get in Touch</h2>
              <p className="text-sm sm:text-base text-white max-w-xl mx-auto opacity-90">
                Ready to elevate your Web3 marketing? Let's discuss your project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4">
              <div className="text-center md:text-left md:pl-2">
                <div className="flex flex-col items-center md:items-start">
                  <div className="text-white mb-1 sm:mb-2">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-poppins text-white mb-1">Location</h3>
                  <p className="text-white text-xs sm:text-sm opacity-90">
                    Global, Remote-First<br />
                    Based in Sevilla, Spain
                  </p>
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                  <div className="text-white mb-1 sm:mb-2">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-poppins text-white mb-1">Email</h3>
                  <p className="text-white text-xs sm:text-sm opacity-90">
                    hello@ripto.eth<br />
                    laurence@web3.marketing
                  </p>
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                  <div className="text-white mb-1 sm:mb-2">
                    <Users size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-poppins text-white mb-1">Connect</h3>
                  <div className="flex space-x-3 sm:space-x-4 mt-1">
                    <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                      {/* X (Twitter) Logo */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                      {/* Discord Logo */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                      {/* Simplified Telegram Logo - Just the Plane */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
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
    </section>
  );
}