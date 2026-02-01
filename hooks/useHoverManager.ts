import { useEffect } from 'react';

// Global hover manager that works even when scrolling
let cursorX = 0;
let cursorY = 0;
let isInitialized = false;
let rafId: number | null = null;
let hoveredElements = new Set<Element>();

const initHoverManager = () => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  // Track cursor position
  const updateCursor = (e: MouseEvent) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  };

  window.addEventListener('mousemove', updateCursor, { passive: true });
  window.addEventListener('mousedown', updateCursor, { passive: true });
  window.addEventListener('mouseup', updateCursor, { passive: true });

  // Check what's under cursor and apply hover classes
  const checkHover = () => {
    if (cursorX > 0 && cursorY > 0) {
      const element = document.elementFromPoint(cursorX, cursorY);
      
      // Remove hover from all previously hovered elements
      const currentHovered = new Set(hoveredElements);
      currentHovered.forEach(el => {
        if (!element || !el.contains(element)) {
          el.classList.remove('cursor-hover-active');
          const group = el.closest('.group');
          if (group) {
            group.classList.remove('group-hover-active');
          }
          hoveredElements.delete(el);
        }
      });

      // Add hover to current element and its parents
      if (element) {
        let current: Element | null = element;
        const elementsToHover: Element[] = [];

        // Collect element and all relevant parents
        while (current && current !== document.body) {
          if (!hoveredElements.has(current)) {
            elementsToHover.push(current);
          }
          current = current.parentElement;
        }

        // Apply hover classes
        elementsToHover.forEach(el => {
          el.classList.add('cursor-hover-active');
          hoveredElements.add(el);
          
          // Also handle group hover
          const group = el.closest('.group');
          if (group && !hoveredElements.has(group)) {
            group.classList.add('group-hover-active');
            hoveredElements.add(group);
          }
        });

        // Dispatch synthetic events for JavaScript handlers (throttled)
        if (elementsToHover.length > 0) {
          const syntheticEvent = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            clientX: cursorX,
            clientY: cursorY,
            view: window
          });
          element.dispatchEvent(syntheticEvent);
        }
      } else {
        // No element under cursor, clear all
        hoveredElements.forEach(el => {
          el.classList.remove('cursor-hover-active');
          const group = el.closest('.group');
          if (group) {
            group.classList.remove('group-hover-active');
          }
        });
        hoveredElements.clear();
      }
    }

    rafId = requestAnimationFrame(checkHover);
  };

  // Also trigger on scroll
  const handleScroll = () => {
    if (cursorX > 0 && cursorY > 0) {
      // Force a hover check
      checkHover();
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('wheel', handleScroll, { passive: true });
  window.addEventListener('touchmove', handleScroll, { passive: true });

  rafId = requestAnimationFrame(checkHover);

  return () => {
    window.removeEventListener('mousemove', updateCursor);
    window.removeEventListener('mousedown', updateCursor);
    window.removeEventListener('mouseup', updateCursor);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleScroll);
    window.removeEventListener('touchmove', handleScroll);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    hoveredElements.forEach(el => {
      el.classList.remove('cursor-hover-active');
    });
    hoveredElements.clear();
    isInitialized = false;
  };
};

let cleanup: (() => void) | null = null;

export const useHoverManager = () => {
  useEffect(() => {
    if (!cleanup) {
      cleanup = initHoverManager();
    }
    return () => {
      // Keep it global, don't cleanup
    };
  }, []);
};
