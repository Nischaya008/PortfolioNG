import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    const hoverableElements = document.querySelectorAll('a, button, input, select, textarea, .cursor-pointer');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main Dot */}
      <div 
        className="absolute w-2.5 h-2.5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out will-change-transform"
        style={{ left: position.x, top: position.y }}
      />
      
      {/* Follower Ring */}
      <div 
        className={`absolute border border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out will-change-transform ${isHovering ? 'w-12 h-12 bg-primary/10 border-transparent' : 'w-8 h-8 opacity-50'}`}
        style={{ left: position.x, top: position.y }}
      />
    </div>
  );
};

export default Cursor;