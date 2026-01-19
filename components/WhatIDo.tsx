import React from 'react';
import { Sparkles } from 'lucide-react';

const WhatIDo: React.FC = () => {
  return (
    <section id="what-i-do" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">What I <span className="text-primary">Do</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Driven by Purpose</span>
            </div>

            <div className="space-y-8 text-lg text-gray-400 leading-relaxed">
              <p>
                I build with <span className="text-white font-bold">precision</span> and logic. For me, engineering isn't just about writing code, it's about <span className="text-white font-bold">architecting scalable systems</span> that solve complex problems efficiently.
              </p>

              <p>
                With a strong foundation in <span className="text-white font-bold">backend development</span> and distributed systems, I've learned that the most robust solutions come from deeply understanding the data flow and optimizing for performance, security, and reliability.
              </p>

              <p>
                Whether it's designing high-frequency trading engines, automating critical data pipelines, or building resilient cloud infrastructure, I'm committed to <span className="text-white font-bold">engineering excellence</span> that drives tangible business value.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-primary rounded-3xl rotate-3 opacity-20 blur-lg"></div>
            {/* Changed from aspect-[4/3] to aspect-square (1:1) to perfectly fit the 4320x4320px image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
              <img
                src="/assets/WhatIDo.png"
                alt="Working on code"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 right-6 z-20 text-right">
                <div className="w-12 h-1 bg-primary mb-4 ml-auto"></div>
                <p className="text-white font-bold text-xl">Engineering Scalability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;