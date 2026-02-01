import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Github } from 'lucide-react';
import { Project } from '../types';
import { useCursorPosition } from '../hooks/useCursorPosition';
import { useButtonAccessibility } from '../hooks/useButtonAccessibility';

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
      className="fixed z-[100] pointer-events-none rounded-xl overflow-hidden shadow-2xl border border-white/20 w-48 h-32 sm:w-64 sm:h-40 bg-black hidden sm:block"
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
  const cursorPos = useCursorPosition();
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[][]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  useButtonAccessibility(); // Ensure buttons are always clickable

  // Store button refs
  useEffect(() => {
    buttonRefs.current = PROJECTS.map(() => [null, null]);
  }, []);

  // Global click handler to ensure buttons are always clickable - most aggressive approach
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check ALL project cards, not just the one containing the target
      projectRefs.current.forEach((cardRef, cardIndex) => {
        if (cardRef && cardIndex >= 0 && cardIndex < PROJECTS.length) {
          const buttons = cardRef.querySelectorAll('a[href]');
          buttons.forEach((button) => {
            const rect = button.getBoundingClientRect();
            const buttonEl = button as HTMLAnchorElement;

            // Check if click coordinates are within button bounds (with tolerance)
            if (
              e.clientX >= rect.left - 10 &&
              e.clientX <= rect.right + 10 &&
              e.clientY >= rect.top - 10 &&
              e.clientY <= rect.bottom + 10
            ) {
              // Click is over a button area
              const isDirectClick = target === buttonEl || buttonEl.contains(target);

              if (!isDirectClick) {
                // Not directly on button, so trigger it programmatically
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Force navigation immediately
                const href = buttonEl.href || buttonEl.getAttribute('href');
                if (href) {
                  // Use setTimeout to ensure it happens after event propagation
                  setTimeout(() => {
                    window.open(href, '_blank', 'noopener,noreferrer');
                  }, 0);
                }
              }
            }
          });
        }
      });
    };

    // Use capture phase with highest priority - run FIRST
    const options = { capture: true, passive: false };
    document.addEventListener('click', handleClick, options);
    document.addEventListener('mousedown', handleClick, options);
    document.addEventListener('mouseup', (e) => {
      // Also check on mouseup as fallback
      handleClick(e as any);
    }, options);

    return () => {
      document.removeEventListener('click', handleClick, options);
      document.removeEventListener('mousedown', handleClick, options);
    };
  }, []);

  // Track if user is clicking to pause hover detection
  const isClickingRef = useRef(false);

  // Check hover state continuously using RAF - but skip button areas and check section bounds
  useEffect(() => {
    let rafId: number;
    const checkHoverState = () => {
      // Skip hover detection if user is clicking
      if (isClickingRef.current) {
        rafId = requestAnimationFrame(checkHoverState);
        return;
      }

      if (cursorPos.x > 0 && cursorPos.y > 0) {
        // FIRST: Check if cursor is within the projects section bounds
        let isInSection = false;
        if (sectionRef.current) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          isInSection = (
            cursorPos.x >= sectionRect.left &&
            cursorPos.x <= sectionRect.right &&
            cursorPos.y >= sectionRect.top &&
            cursorPos.y <= sectionRect.bottom
          );
        }

        // If not in section, clear hover and return
        if (!isInSection) {
          setHoveredProject(null);
          rafId = requestAnimationFrame(checkHoverState);
          return;
        }

        // Only proceed if we're in the section
        // First check if we're over a button - if so, skip elementFromPoint
        let isOverButton = false;
        projectRefs.current.forEach((cardRef) => {
          if (cardRef) {
            const buttons = cardRef.querySelectorAll('a[href]');
            buttons.forEach((button) => {
              const rect = button.getBoundingClientRect();
              if (
                cursorPos.x >= rect.left &&
                cursorPos.x <= rect.right &&
                cursorPos.y >= rect.top &&
                cursorPos.y <= rect.bottom
              ) {
                isOverButton = true;
              }
            });
          }
        });

        // Only use elementFromPoint if NOT over a button (to avoid interfering)
        if (!isOverButton) {
          const element = document.elementFromPoint(cursorPos.x, cursorPos.y);
          if (element) {
            // Find which project card contains this element
            const projectCard = element.closest('[data-project-index]');
            if (projectCard && sectionRef.current?.contains(projectCard)) {
              const index = parseInt(projectCard.getAttribute('data-project-index') || '-1');
              if (index >= 0 && index < PROJECTS.length) {
                setHoveredProject(PROJECTS[index]);
              } else {
                setHoveredProject(null);
              }
            } else {
              // Element is not in a project card within our section
              setHoveredProject(null);
            }
          } else {
            setHoveredProject(null);
          }
        } else {
          // Over a button - find which card it belongs to using refs
          let foundProject: Project | null = null;
          projectRefs.current.forEach((ref, index) => {
            if (ref && sectionRef.current?.contains(ref)) {
              const buttons = ref.querySelectorAll('a[href]');
              buttons.forEach((button) => {
                const rect = button.getBoundingClientRect();
                if (
                  cursorPos.x >= rect.left &&
                  cursorPos.x <= rect.right &&
                  cursorPos.y >= rect.top &&
                  cursorPos.y <= rect.bottom
                ) {
                  foundProject = PROJECTS[index];
                }
              });
            }
          });
          setHoveredProject(foundProject);
        }

        // Fallback: check if we're still over any project card using refs (only if in section)
        if (!isOverButton) {
          let foundProject: Project | null = null;
          projectRefs.current.forEach((ref, index) => {
            if (ref && sectionRef.current?.contains(ref)) {
              const rect = ref.getBoundingClientRect();
              if (
                cursorPos.x >= rect.left &&
                cursorPos.x <= rect.right &&
                cursorPos.y >= rect.top &&
                cursorPos.y <= rect.bottom
              ) {
                // Double check we're not in button area
                const buttons = ref.querySelectorAll('a[href]');
                let inButtonArea = false;
                buttons.forEach((button) => {
                  const btnRect = button.getBoundingClientRect();
                  if (
                    cursorPos.x >= btnRect.left &&
                    cursorPos.x <= btnRect.right &&
                    cursorPos.y >= btnRect.top &&
                    cursorPos.y <= btnRect.bottom
                  ) {
                    inButtonArea = true;
                  }
                });
                if (!inButtonArea) {
                  foundProject = PROJECTS[index];
                }
              }
            }
          });
          if (foundProject) {
            setHoveredProject(foundProject);
          }
        }
      } else {
        // Cursor position invalid, clear hover
        setHoveredProject(null);
      }
      rafId = requestAnimationFrame(checkHoverState);
    };

    // Pause hover detection on mousedown, resume on mouseup
    const handleMouseDown = () => {
      isClickingRef.current = true;
    };
    const handleMouseUp = () => {
      setTimeout(() => {
        isClickingRef.current = false;
      }, 100);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    rafId = requestAnimationFrame(checkHoverState);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorPos]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 relative overflow-hidden"
      onMouseLeave={() => {
        // Clear hover when mouse leaves the entire section
        setHoveredProject(null);
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-xs font-medium text-gray-300">Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">Technical <span className="text-primary">Projects</span></h2>
        </div>

        <div className="grid gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              ref={(el) => { projectRefs.current[index] = el; }}
              data-project-index={index}
              className="group relative bg-card p-6 sm:p-8 md:p-12 hover:bg-zinc-900/50 transition-colors duration-500 cursor-none"
              style={{ position: 'relative', zIndex: index + 10 }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => {
                // Clear hover state when mouse leaves
                // The RAF loop will update it if cursor is still over another card
                const element = document.elementFromPoint(cursorPos.x, cursorPos.y);
                if (!element || !element.closest('[data-project-index]')) {
                  setHoveredProject(null);
                }
              }}
            >
              <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Non-interactive content */}
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
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-full border border-white/10 group-hover:border-primary/20 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button container - absolutely positioned to always be on top */}
                <div
                  className="md:col-span-4 flex flex-col sm:flex-row justify-start sm:justify-end gap-3 sm:gap-4"
                  style={{
                    position: 'relative',
                    zIndex: 99999
                  }}
                >
                  <a
                    ref={(el) => {
                      if (buttonRefs.current[index]) {
                        buttonRefs.current[index][0] = el;
                      }
                    }}
                    href={project.github || project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20 bg-black/20 flex items-center justify-center gap-2 hover:bg-white text-white hover:text-black transition-all duration-300 overflow-hidden text-sm sm:text-base"
                    style={{
                      position: 'relative',
                      zIndex: 999999,
                      pointerEvents: 'auto',
                      cursor: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.cursor = 'none';
                    }}
                  >
                    <span className="relative z-10 font-medium">GitHub</span>
                    <Github size={16} className="relative z-10 sm:w-[18px] sm:h-[18px]" />
                  </a>

                  <a
                    ref={(el) => {
                      if (buttonRefs.current[index]) {
                        buttonRefs.current[index][1] = el;
                      }
                    }}
                    href={project.demo || project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-primary text-black font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] text-sm sm:text-base"
                    style={{
                      position: 'relative',
                      zIndex: 999999,
                      pointerEvents: 'auto',
                      cursor: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.cursor = 'none';
                    }}
                  >
                    <span className="relative z-10">Live Demo</span>
                    <ArrowUpRight size={16} className="relative z-10 sm:w-[18px] sm:h-[18px]" />
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