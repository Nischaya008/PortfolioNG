import React from 'react';
import { EXPERIENCE } from '../constants';
import { Building2 } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Career Path</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Professional <span className="text-primary">Experience</span></h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Icon Marker */}
                <div className="absolute left-[20px] md:left-1/2 top-0 md:-translate-x-1/2 w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                  <Building2 size={18} className="text-primary" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 px-4">
                  <div className="bg-card border border-white/10 rounded-2xl px-5 py-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="text-primary text-xs font-bold tracking-wider">{exp.period}</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>{exp.company}</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-sm text-gray-400 leading-relaxed flex items-start gap-2">
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