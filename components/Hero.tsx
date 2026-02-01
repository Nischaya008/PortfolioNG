import React, { useState } from 'react';
import { Download, ArrowRight, MapPin, MessageSquare, Mail, Linkedin, Bot } from 'lucide-react';
import { RESUME_LINK, LINKEDIN } from '../constants';

const ResumePDF = "/assets/Resume_NG.pdf";

interface HeroProps {
  openChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ openChat }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-12 pb-16">
      {/* Location Badge - Top Right (only on screens < 1155px) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 md:right-12 z-50 lg:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
          <MapPin size={14} className="text-primary" />
          <span className="text-xs sm:text-sm text-gray-300">Chandigarh, IN</span>
        </div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Text Content - Shifted Up via pt reduction on section and mt adjustments */}
          <div className="flex-1 text-left w-full lg:w-auto mt-12 sm:mt-14 lg:-mt-8">
            {/* Location Badge - Desktop (only on screens >= 1155px) */}
            <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs sm:text-sm text-gray-300">Chandigarh, IN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Hi, I'm Nischaya.
              <span className="block mt-2 text-gray-400 font-normal text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                Building <span className="text-primary">scalable services</span> & <span className="text-primary">distributed systems</span>.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Software Engineer specializing in Backend and Full-Stack development.
              Skilled in C++, Python, and Cloud Architecture with a passion for high-performance computing.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href={ResumePDF}
                download="Resume_NG.pdf"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-none text-center sm:text-left justify-center sm:justify-start flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download Resume <Download size={18} />
                </span>
              </a>

              {/* Contact Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsContactOpen(true)}
                onMouseLeave={() => setIsContactOpen(false)}
              >
                <button
                  className={`
                    px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-bold rounded-full 
                    hover:bg-white/5 transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-sm cursor-none 
                    justify-center sm:justify-start w-full sm:w-auto
                    ${isContactOpen ? 'bg-white/10' : ''}
                  `}
                >
                  Let's Chat <ArrowRight size={18} className={`transition-transform duration-300 ${isContactOpen ? 'rotate-90' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`
                    absolute left-full top-0 ml-4 w-full sm:w-56 bg-[#0a0a0a] border border-white/10 
                    rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-left
                    ${isContactOpen ? 'opacity-100 translate-x-0 visible' : 'opacity-0 -translate-x-4 invisible'}
                    z-50
                  `}
                >
                  <div className="p-1">
                    <button
                      onClick={() => {
                        openChat();
                        setIsContactOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-none group/item"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover/item:bg-primary group-hover/item:text-black transition-colors">
                        <Bot size={18} />
                      </div>
                      <div>
                        <span className="block font-semibold">Talk to NisBot</span>
                        <span className="text-[10px] opacity-50">AI Assistant (Instant)</span>
                      </div>
                    </button>

                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=nischayagarg008@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-none group/item"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="block font-semibold">Email Me</span>
                        <span className="text-[10px] opacity-50">Get in touch</span>
                      </div>
                    </a>

                    <a
                      href={LINKEDIN}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-none group/item"
                    >
                      <div className="p-2 bg-[#0077b5]/10 rounded-lg text-[#0077b5] group-hover/item:bg-[#0077b5] group-hover/item:text-white transition-colors">
                        <Linkedin size={18} />
                      </div>
                      <div>
                        <span className="block font-semibold">LinkedIn</span>
                        <span className="text-[10px] opacity-50">Connect professionally</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Profile Image / Graphic - Shifted Left via marginRight/gap adjustments */}
          <div className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-96 lg:h-96 lg:mr-8">
            {/* Rotating border animation */}
            <div className="absolute inset-0 border-2 border-primary/30 rounded-[2rem] animate-spin-medium"></div>

            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-900 border-2 border-white/10 rotate-6">
              <img
                src="/assets/Hero_Pic5.jpeg"
                alt="Nischaya Garg"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Floating Badges */}
            <div className="absolute bottom-4 -left-8 sm:-left-16 bg-card/90 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Open to Work</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -left-12 sm:-left-20 transform -translate-y-1/2 bg-card/90 backdrop-blur-md border border-white/10 p-2 sm:p-3 rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🔥</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-white">Problem Solving</p>
                  <p className="text-[9px] sm:text-xs text-gray-400">550+ Day Streak</p>
                </div>
              </div>
            </div>

            <div className="absolute top-8 -right-4 sm:-right-8 bg-card/90 backdrop-blur-md border border-white/10 p-2 sm:p-3 rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-2">

                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-white">AIR 11</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">Naukri Campus Track</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator - Updated Animation */}
      <div className="absolute bottom-20 sm:bottom-40 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-1.5 bg-primary rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;