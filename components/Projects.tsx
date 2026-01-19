import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Github } from 'lucide-react';
import { Project } from '../types';

const ProjectPreview: React.FC<{ project: Project; position: { x: number; y: number } }> = ({ project, position }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = project.images || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1200); // Fast slideshow
    return () => clearInterval(interval);
  }, [images]);

  if (!images.length) return null;

  const PREVIEW_WIDTH = 256; // w-64
  const OFFSET = 24;

  // Threshold logic:
  // - Current value is 300.
  // - Increase this value to shift the trigger zone further LEFT (triggers sooner).
  // - Decrease this value to shift the trigger zone further RIGHT (triggers later).
  const EDGE_THRESHOLD = 300;

  const isNearRightEdge = typeof window !== 'undefined' ? position.x > window.innerWidth - PREVIEW_WIDTH - EDGE_THRESHOLD : false;

  const leftPos = isNearRightEdge ? position.x - PREVIEW_WIDTH - OFFSET : position.x + OFFSET;

  return (
    <div
      className="fixed z-[100] pointer-events-none rounded-xl overflow-hidden shadow-2xl border border-white/20 w-64 h-40 bg-black"
      style={{
        left: leftPos,
        top: position.y - 24,
        transform: 'translateY(-50%)'
      }}
    >
      <div className="relative w-full h-full">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-xs font-bold text-white truncate">{project.title}</p>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="work" className="py-24 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-xs font-medium text-gray-300">Selected Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Technical <span className="text-primary">Projects</span></h2>
        </div>

        <div className="grid gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card p-8 md:p-12 hover:bg-zinc-900/50 transition-colors duration-500 cursor-none"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid md:grid-cols-12 gap-8 items-center pointer-events-none">

                <div className="md:col-span-1 hidden md:block">
                  <span className="text-5xl font-bold text-white/5 group-hover:text-primary/20 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{project.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span className="text-xs text-gray-500">{project.year}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-full border border-white/10 group-hover:border-primary/20 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex justify-end gap-4">
                  <a
                    href={project.github || project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative px-5 py-3 rounded-full border border-white/20 bg-black/20 flex items-center gap-2 hover:bg-white text-white hover:text-black transition-all duration-300 pointer-events-auto cursor-none overflow-hidden"
                  >
                    <span className="relative z-10 font-medium">GitHub</span>
                    <Github size={18} className="relative z-10" />
                  </a>

                  <a
                    href={project.demo || project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative px-5 py-3 rounded-full bg-primary text-black font-bold flex items-center gap-2 hover:scale-105 transition-all duration-300 pointer-events-auto cursor-none shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]"
                  >
                    <span className="relative z-10">Live Demo</span>
                    <ArrowUpRight size={18} className="relative z-10" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {hoveredProject && <ProjectPreview project={hoveredProject} position={cursorPos} />}
    </section>
  );
};

export default Projects;