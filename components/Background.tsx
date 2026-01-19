import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }

      if (blobRef.current) {
        blobRef.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 3000, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-background"></div>

      {/* Moving Grid Pattern - Moves opposite to mouse */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.04] transition-transform duration-100 ease-out will-change-transform"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: 'translate(calc(var(--mouse-x, 0px) * -0.02), calc(var(--mouse-y, 0px) * -0.02))'
        }}
      ></div>

      {/* Ambient Glows - Fixed positions but slight movement */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow transition-transform duration-700 ease-out"
          style={{ transform: 'translate(calc(var(--mouse-x, 0px) * 0.02), calc(var(--mouse-y, 0px) * 0.02))' }}
        ></div>
        <div 
          className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow transition-transform duration-700 ease-out"
          style={{ transform: 'translate(calc(var(--mouse-x, 0px) * 0.03), calc(var(--mouse-y, 0px) * 0.03))' }}
        ></div>
      </div>

      {/* Mouse Follower Blob */}
      <div 
        ref={blobRef}
        className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: '50%', top: '50%' }}
      ></div>
      
      {/* Cinematic Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default Background;