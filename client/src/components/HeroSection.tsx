import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="scroll-section relative">
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-400 via-purple-500 to-orange-500">
              Web3 Growth
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300 max-w-2xl">
            Innovative marketing solutions for blockchain projects and decentralized platforms
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#portfolio" 
              className="px-8 py-3 bg-primary hover:bg-secondary text-white font-medium rounded-full transition-colors duration-300 text-center"
            >
              View Our Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-transparent border border-white hover:border-primary hover:text-primary text-white font-medium rounded-full transition-all duration-300 text-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
