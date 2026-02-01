import React from 'react';
import { EXPERIENCE } from '../constants';
import { Building2 } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Professional <span className="text-primary">Experience</span></h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2"></div>

          <div className="space-y-8 sm:space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-6 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Icon Marker */}
                <div className="absolute left-[20px] md:left-1/2 top-0 md:-translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                  <Building2 size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                </div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-14 md:ml-0 md:w-1/2 px-2 sm:px-4">
                  <div className="bg-card border border-white/10 rounded-2xl px-4 sm:px-5 py-5 sm:py-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="text-primary text-xs font-bold tracking-wider">{exp.period}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs sm:text-sm text-gray-400">
                        <span>{exp.company}</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-xs sm:text-sm text-gray-400 leading-relaxed flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0"></span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Empty space for alternate side */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;