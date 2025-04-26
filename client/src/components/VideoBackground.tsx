export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      {/* Background color as fallback */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Dark overlay over video */}
      <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none"></div>
      
      {/* Background video using regular HTML video tag */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background-video.mov" type="video/quicktime" />
      </video>
    </div>
  );
}
