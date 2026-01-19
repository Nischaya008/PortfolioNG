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
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[90vw]">
      <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => scrollTo('hero')}
            className="group relative px-4 py-2 rounded-full bg-primary text-black font-semibold transition-all hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <Home size={18} />
              <span className="hidden sm:block">Home</span>
            </div>
          </button>

          <button 
            onClick={() => scrollTo('experience')}
            className="group relative px-4 py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <Briefcase size={18} />
              <span className="hidden sm:block">Experience</span>
            </div>
          </button>

          <button 
            onClick={() => scrollTo('work')}
            className="group relative px-4 py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span className="hidden sm:block">Work</span>
            </div>
          </button>

          <button 
            onClick={() => scrollTo('skills')}
            className="group relative px-4 py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="hidden sm:block">Skills</span>
            </div>
          </button>

          <button 
            onClick={() => scrollTo('contact')}
            className="group relative px-4 py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span className="hidden sm:block">Contact</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;