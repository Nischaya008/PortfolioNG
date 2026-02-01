import React from 'react';
import { Home, Briefcase, User, Mail, Award } from 'lucide-react';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-[100] w-auto max-w-[95vw] sm:max-w-[90vw] pointer-events-auto mobile-navbar"
    >
      <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-full px-3 py-3 sm:px-4 sm:py-2 md:py-3 shadow-2xl shadow-black/50 pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-1 md:gap-2 lg:gap-4 overflow-x-auto no-scrollbar pointer-events-auto">
          <button
            onClick={(e) => {
              // Only stop propagation on mobile to prevent click-through
              if (window.innerWidth < 425) {
                e.stopPropagation();
              }
              scrollTo('hero');
            }}
            className="group relative px-4 py-2.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-primary text-black font-semibold transition-all hover:scale-105 pointer-events-auto touch-manipulation mobile-nav-button"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Home size={18} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
              <span className="hidden md:block text-xs sm:text-sm">Home</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              if (window.innerWidth < 425) {
                e.stopPropagation();
              }
              scrollTo('experience');
            }}
            className="group relative px-4 py-2.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all pointer-events-auto touch-manipulation mobile-nav-button"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Briefcase size={18} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
              <span className="hidden md:block text-xs sm:text-sm">Experience</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              if (window.innerWidth < 425) {
                e.stopPropagation();
              }
              scrollTo('work');
            }}
            className="group relative px-4 py-2.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all pointer-events-auto touch-manipulation mobile-nav-button"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Award size={18} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
              <span className="hidden md:block text-xs sm:text-sm">Work</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              if (window.innerWidth < 425) {
                e.stopPropagation();
              }
              scrollTo('skills');
            }}
            className="group relative px-4 py-2.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all pointer-events-auto touch-manipulation mobile-nav-button"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <User size={18} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
              <span className="hidden md:block text-xs sm:text-sm">Skills</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              if (window.innerWidth < 425) {
                e.stopPropagation();
              }
              scrollTo('contact');
            }}
            className="group relative px-4 py-2.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all pointer-events-auto touch-manipulation mobile-nav-button"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden md:block text-xs sm:text-sm">Contact</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;