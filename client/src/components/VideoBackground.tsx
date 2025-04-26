import { useEffect } from 'react';

export default function VideoBackground() {
  // Add keyframes and animation styles once on mount
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes pulse {
        0% { opacity: 0.3; }
        100% { opacity: 0.7; }
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      
      .animate-pulse-slow {
        animation: pulse 8s infinite alternate;
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    
    // Append to document head
    document.head.appendChild(styleElement);
    
    // Clean up
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-black">
      {/* Dark gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black/80 to-black/90 pointer-events-none"
      ></div>
      
      {/* Starry night effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 5px)',
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0, 50px 50px'
        }}
      ></div>
      
      {/* Animated gradient bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-purple-900/20 to-transparent"
        style={{
          animation: 'pulse 8s infinite alternate'
        }}
      ></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-500/30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
