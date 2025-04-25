import { useState } from "react";
import { MapPin, Mail, Users } from "lucide-react";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="contact" className={`relative py-0 my-0 ${isVisible ? 'animate-fadeIn' : ''}`}>
      <div className="max-w-3xl mx-auto relative -mt-8 mb-4">
        {/* Orange opaque background container */}
        <div className="absolute inset-0 bg-orange-500 bg-opacity-95 rounded-xl shadow-xl"></div>
        
        <div className="relative z-10 px-6 py-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-1 font-poppins text-white">Get in Touch</h2>
            <p className="text-base text-white max-w-xl mx-auto">
              Ready to elevate your Web3 marketing? Let's discuss your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-white mt-1 flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold font-poppins text-white">Location</h3>
                <p className="text-white text-xs">
                  Global, Remote-First<br />
                  Based in Sevilla, Spain
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-white mt-1 flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold font-poppins text-white">Email</h3>
                <p className="text-white text-xs">
                  hello@ripto.eth<br />
                  laurence@web3.marketing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-white mt-1 flex-shrink-0">
                <Users size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold font-poppins text-white">Connect</h3>
                <div className="flex space-x-3 mt-1">
                  <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-yellow-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.5 6.374-.5 6.374s-.012.221-.109.338c-.9.109-.21.156-.324.177-.114.021-.285.034-.466-.069-.18-.103-3.75-2.364-3.75-2.364-.097-.064-.156-.096-.156-.195.005-.091.161-.181.161-.181s4.114-3.702 4.422-4.115c.028-.036.006-.07-.058-.106-.231-.106-1.422.391-1.422.391s-1.445.923-2.86 1.864c-.066.04-.114.066-.198.066-.073 0-.146-.023-.208-.06-.106-.063-.188-.14-.188-.14s-.333-.203-.637-.348a3.66 3.66 0 0 0-.921-.28l-.031-.01s1.463-.573 2.928-1.169c1.21-.488 2.275-.942 3.285-1.294.059-.024.116-.052.186-.063l.025-.004z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}