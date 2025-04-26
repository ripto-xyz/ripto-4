import { useEffect, useState } from 'react';
import './SmokeTransition.css';

interface Props {
  children: React.ReactNode;
  sectionId: string;
  threshold?: number;
}

export default function SmokeTransition({ children, sectionId, threshold = 0.1 }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Don't unobserve so the animation can replay when coming back
            // to the section (optional, can be changed)
          } else {
            // Reset visibility when section is out of view
            // setIsVisible(false); // Uncomment if you want the animation to replay
          }
        });
      },
      { threshold }
    );

    const section = document.getElementById(sectionId);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [sectionId, threshold]);

  return (
    <div className={`smoke-transition ${isVisible ? 'active' : ''}`}>
      <div className={`${isVisible ? 'smoke-in' : ''}`}>
        {children}
      </div>
    </div>
  );
}