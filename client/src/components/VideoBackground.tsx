export default function VideoBackground() {
  return (
    <>
      {/* Fixed background container */}
      <div 
        className="fixed inset-0 -z-10 w-full h-full overflow-hidden"
        style={{ background: 'black' }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        
        {/* Video element - using standard HTML video with direct src */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center center'
          }}
        >
          <source src="/background-optimized.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
