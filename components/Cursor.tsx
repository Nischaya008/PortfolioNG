import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Use refs for direct DOM manipulation to avoid re-renders
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // Track positions with refs
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Only show cursor on devices with fine pointers (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update main dot instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, input, select, textarea, .cursor-pointer');
      setIsHovering(!!isLink);
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only set to false if we're not moving into another hoverable element (handled by over/enter)
      // Standard event bubbling makes this tricky, but for simple hover states:
      setIsHovering(false);
    };
    
    // Improved hover detection using capture to catch events early
    // and using mouseover/out for bubbling support
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    // document.addEventListener('mouseout', onMouseOut, { passive: true }); // Often causes flickering, rely on mouseover bubbling

    // Animation Loop
    let rafId: number;
    
    const animate = () => {
      // Lerp for smooth follower delay
      // Lower factor = more delay/lag. 0.1 to 0.2 is usually good.
      const lerp = 0.15;
      
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerp;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerp;
      
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      // document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main Dot - moves instantly */}
      <div 
        ref={cursorRef}
        className="absolute top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full will-change-transform"
        style={{ transform: 'translate3d(0,0,0) translate(-50%, -50%)' }} // Initial verify
      />
      
      {/* Follower Ring - moves smoothly */}
      <div 
        ref={followerRef}
        className={`absolute top-0 left-0 border border-primary rounded-full will-change-transform transition-[width,height,background-color,border-color,opacity] duration-300 ease-out 
          ${isHovering 
            ? 'w-12 h-12 bg-primary/10 border-transparent opacity-100' 
            : 'w-8 h-8 opacity-50'
          }`}
         style={{ transform: 'translate3d(0,0,0) translate(-50%, -50%)' }}
      />
    </div>
  );
};

export default Cursor;