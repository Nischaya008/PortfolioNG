import React from 'react';

const Logo: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="absolute top-6 left-6 sm:left-12 z-50 flex items-center">
      <a
        href="/"
        onClick={handleClick}
        className="relative group cursor-none flex items-center"
      >
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          {/* Orbiting Ring and Dot */}
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-medium">
            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(0,255,136,0.8)]"></div>
          </div>

          {/* Inner Content */}
          <div className="absolute inset-2 bg-card/95 backdrop-blur-sm border border-primary/30 group-hover:border-primary/50 transition-all duration-300 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm sm:text-base tracking-tighter">NG</span>
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-l border-t border-primary/40 rounded-tl"></div>
          <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-r border-b border-primary/40 rounded-br"></div>

          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75"></div>
        </div>
      </a>
    </div>
  );
};

export default Logo;
