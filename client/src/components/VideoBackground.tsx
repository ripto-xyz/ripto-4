export default function VideoBackground() {
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
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
