import { useEffect, useRef } from 'react';
// Import the font image directly to ensure it's properly bundled by Vite
import spyroFontImg from '../../assets/spyrofont2.jpg';

interface SpyroLogoProps {
  className?: string;
  text: string;
}

export default function SpyroLogo({ className = '', text }: SpyroLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set the canvas dimensions
    canvas.width = 500;  // Adjusted to better fit the header
    canvas.height = 80;
    
    // Load the Spyro font image
    const fontImage = new Image();
    fontImage.src = spyroFontImg; // Use the imported image
    console.log('Loading image from imported source');
    
    // Add error handling for image load failures
    fontImage.onerror = (e) => {
      console.error('Failed to load Spyro font image:', e);
      // Draw error text on canvas
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('LAURENCE | RIPTO.ETH', 10, 40);
    };
    
    fontImage.onload = () => {
      console.log('Spyro font image loaded successfully!');
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Define the character map - more accurate positions based on the image
      // Format: [x, y, width, height]
      const charMap: Record<string, [number, number, number, number]> = {
        '0': [85, 243, 28, 34],
        '1': [119, 243, 22, 34],
        '2': [147, 243, 28, 34],
        '3': [178, 243, 26, 34],
        '4': [210, 243, 31, 34],
        '5': [245, 243, 31, 34],
        '6': [280, 243, 30, 34],
        '7': [316, 243, 30, 34],
        '8': [350, 243, 29, 34],
        '9': [384, 243, 29, 34],
        ',': [419, 243, 15, 34],
        '!': [442, 243, 10, 34],
        '%': [458, 243, 39, 34],
        '/': [503, 243, 22, 34],
        '.': [531, 243, 13, 34],
        'A': [87, 293, 37, 34],
        'B': [129, 293, 31, 34],
        'C': [165, 293, 31, 34],
        'D': [200, 293, 33, 34],
        'E': [238, 293, 30, 34],
        'F': [273, 293, 30, 34],
        'G': [308, 293, 33, 34],
        'H': [346, 293, 33, 34],
        'I': [384, 293, 14, 34],
        'J': [403, 293, 27, 34],
        'K': [435, 293, 33, 34],
        'L': [473, 293, 27, 34],
        'M': [505, 293, 40, 34],
        'N': [550, 293, 33, 34],
        'O': [588, 293, 35, 34],
        'P': [628, 293, 31, 34],
        'Q': [87, 342, 35, 34],
        'R': [127, 342, 33, 34],
        'S': [165, 342, 30, 34],
        'T': [200, 342, 31, 34],
        'U': [236, 342, 33, 34],
        'V': [274, 342, 35, 34],
        'W': [314, 342, 41, 34],
        'X': [360, 342, 35, 34],
        'Y': [400, 342, 35, 34],
        'Z': [440, 342, 35, 34],
        '|': [500, 243, 5, 34], // Using the slash character
        ' ': [0, 0, 20, 34], // Space - not in image, but we'll add a gap
        'Ñ': [550, 293, 33, 34], // For ñ/Ñ
        'É': [238, 293, 30, 34], // For é/É
        'Í': [384, 293, 14, 34], // For í/Í
        'Ó': [588, 293, 35, 34], // For ó/Ó
        'Ú': [236, 342, 33, 34], // For ú/Ú
        'Ç': [165, 293, 31, 34], // For ç/Ç
        'Ä': [87, 293, 37, 34], // For ä/Ä
        'Ö': [588, 293, 35, 34], // For ö/Ö
      };

      // Draw the text
      let xPos = 10; // Starting position (moved left a bit)
      const yPos = 45; // Vertical position
      const scale = 1.0; // Scale matches the original size
      const letterSpacing = 3; // Space between characters
      
      // Convert text to uppercase since the font is all uppercase
      const upperText = text.toUpperCase();
      
      for (let i = 0; i < upperText.length; i++) {
        const char = upperText[i];
        
        // Skip if character is not in our map
        if (!charMap[char]) {
          // Just move the position for unknown characters
          xPos += 15 * scale;
          continue;
        }
        
        if (char === ' ') {
          // Handle space character
          xPos += 15 * scale;
          continue;
        }
        
        const [srcX, srcY, width, height] = charMap[char];
        
        // Draw the character
        ctx.drawImage(
          fontImage,
          srcX, srcY, width, height,
          xPos, yPos - height * scale, width * scale, height * scale
        );
        
        // Move position for next character
        xPos += (width + letterSpacing) * scale;
      }
      
      // Add a subtle animation effect (slight floating)
      let floatOffset = 0;
      let direction = 1;
      const floatSpeed = 0.03; // Slower, smoother animation
      const floatMax = 1.5;    // Slightly larger movement
      
      // Add color cycling for the gold effect
      let colorPhase = 0;
      const colorSpeed = 0.005;
      
      // Add a glow effect
      ctx.shadowColor = 'rgba(255, 230, 0, 0.5)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      const animate = () => {
        // Only animate if component is still mounted
        if (!canvas) return;
        
        // Update floating animation
        floatOffset += floatSpeed * direction;
        if (floatOffset > floatMax || floatOffset < 0) {
          direction *= -1;
        }
        
        // Update color cycling
        colorPhase += colorSpeed;
        if (colorPhase > Math.PI * 2) {
          colorPhase = 0;
        }
        
        // Calculate color based on phase
        const goldenIntensity = Math.sin(colorPhase) * 20;
        const glowColor = `rgba(255, ${210 + goldenIntensity}, 0, 0.5)`;
        ctx.shadowColor = glowColor;
        
        // Clear and redraw with new position
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Apply the calculated glow effect (we already set shadowColor above)
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Redraw all characters with slight offset
        xPos = 10;
        for (let i = 0; i < upperText.length; i++) {
          const char = upperText[i];
          
          if (!charMap[char]) {
            xPos += 15 * scale;
            continue;
          }
          
          if (char === ' ') {
            xPos += 15 * scale;
            continue;
          }
          
          const [srcX, srcY, width, height] = charMap[char];
          
          // Alternate character float for more organic movement
          const charFloat = (i % 2 === 0) ? floatOffset : floatMax - floatOffset;
          
          ctx.drawImage(
            fontImage,
            srcX, srcY, width, height,
            xPos, (yPos - height * scale) + charFloat, width * scale, height * scale
          );
          
          xPos += (width + letterSpacing) * scale;
        }
        
        requestAnimationFrame(animate);
      };
      
      // Start animation
      animate();
    };
    
    // Cleanup animation when component unmounts
    return () => {
      // Animation will stop because we check if canvas exists
    };
  }, [text]);
  
  return (
    <div className={`inline-block ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto"
        style={{ maxHeight: '80px' }}
      />
    </div>
  );
}