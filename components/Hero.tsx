import React from 'react';
import { Download, ArrowRight, MapPin } from 'lucide-react';
import { RESUME_LINK, EMAIL } from '../constants';
import ResumePDF from '../assets/Resume_NG.pdf';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-12 pb-16">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Text Content - Shifted Up via pt reduction on section and mt adjustments */}
          <div className="flex-1 text-left -mt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs sm:text-sm text-gray-300">Chandigarh, IN</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Hi, I'm Nischaya.
              <span className="block mt-2 text-gray-400 font-normal text-2xl sm:text-4xl lg:text-5xl">
                Building <span className="text-primary">scalable services</span> & <span className="text-primary">distributed systems</span>.
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Software Engineer specializing in Backend and Full-Stack development.
              Skilled in C++, Python, and Cloud Architecture with a passion for high-performance computing.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={ResumePDF}
                download="Resume_NG.pdf"
                className="group relative px-8 py-4 bg-primary text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download Resume <Download size={18} />
                </span>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nischayagarg008@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-sm cursor-none"
              >
                Let's Chat <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Profile Image / Graphic - Shifted Left via marginRight/gap adjustments */}
          <div className="relative flex-shrink-0 w-80 h-80 sm:w-96 sm:h-96 lg:mr-8">
            {/* Rotating border animation */}
            <div className="absolute inset-0 border-2 border-primary/30 rounded-[2rem] animate-spin-medium"></div>

            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-900 border-2 border-white/10 rotate-6">
              <img
                src="../assets/Hero_Pic5.jpeg"
                alt="Nischaya Garg"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Floating Badges */}
            <div className="absolute bottom-4 -left-16 bg-card/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div>
                  <p className="text-sm font-bold text-white">Open to Work</p>
                  <p className="text-xs text-gray-400">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -left-20 transform -translate-y-1/2 bg-card/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-xs font-bold text-white">Problem Solving</p>
                  <p className="text-xs text-gray-400">550+ Day Streak</p>
                </div>
              </div>
            </div>

            <div className="absolute top-8 -right-8 bg-card/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl z-20">
              <div className="flex items-center gap-2">

                <div>
                  <p className="text-xs font-bold text-white">AIR 11</p>
                  <p className="text-[10px] text-gray-400">Naukri Campus Track</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator - Updated Animation */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-1.5 bg-primary rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;