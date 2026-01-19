import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';
import { useCountUp } from '../hooks/useCountUp';

const StatItem: React.FC<{ start: number; end: number; suffix: string; prefix?: string; label: string; shouldStart: boolean; isK?: boolean }> = ({ start, end, suffix, prefix = "", label, shouldStart, isK = false }) => {
  const count = useCountUp(start, end, 2000, shouldStart);

  const displayValue = isK ? Math.floor(count / 1000) + "k" : count;

  return (
    <div>
      <div className="text-4xl font-bold text-white mb-2">
        <span className="text-primary">{prefix}</span>
        {displayValue}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-sm text-gray-500 uppercase tracking-widest">{label}</p>
    </div>
  );
};

const Skills: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 bg-[#080808]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Technical <span className="text-primary">Strengths</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            A comprehensive toolset for building robust, scalable digital solutions.
          </p>
        </div>

        {/* Updated Grid Layout for better handling of 5 items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className="p-8 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:transform hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                {skill.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{skill.category}</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-mono">
                {skill.items}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10" ref={statsRef}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatItem start={20} end={11} suffix="th" label="AIR - Naukri Campus Track" shouldStart={isInView} />
            <StatItem start={200000} end={145000} prefix="<" suffix="" isK={true} label="LeetCode Global Rank" shouldStart={isInView} />
            <StatItem start={1500} end={1950} suffix="+" label="GeeksForGeeks Score" shouldStart={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;