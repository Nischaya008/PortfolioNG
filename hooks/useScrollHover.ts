import { useEffect } from 'react';

// Track cursor position globally
let cursorX = 0;
let cursorY = 0;
let isTracking = false;

const startTracking = () => {
  if (isTracking || typeof window === 'undefined') return;
  isTracking = true;

  const updateCursor = (e: MouseEvent) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  };

  // Track cursor position
  window.addEventListener('mousemove', updateCursor, { passive: true });
  window.addEventListener('mousedown', updateCursor, { passive: true });
  window.addEventListener('mouseup', updateCursor, { passive: true });

  // On scroll, check what's under cursor and trigger hover
  const handleScroll = () => {
    if (cursorX > 0 && cursorY > 0) {
      // Use elementFromPoint to find what's under cursor
      const element = document.elementFromPoint(cursorX, cursorY);
      
      if (element) {
        // Trigger mouseenter on the element
        const enterEvent = new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
          clientX: cursorX,
          clientY: cursorY,
          view: window
        });
        element.dispatchEvent(enterEvent);

        // Also trigger on parent elements that might have hover handlers
        let parent = element.parentElement;
        while (parent && parent !== document.body) {
          parent.dispatchEvent(enterEvent);
          parent = parent.parentElement;
        }
      }
    }
  };

  // Continuous check using RAF
  let rafId: number;
  const continuousCheck = () => {
    if (cursorX > 0 && cursorY > 0) {
      const element = document.elementFromPoint(cursorX, cursorY);
      if (element) {
        // Create a more comprehensive event
        const syntheticEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: cursorX,
          clientY: cursorY,
          view: window,
          relatedTarget: null
        });
        
        // Dispatch to element and all parents
        element.dispatchEvent(syntheticEvent);
        let parent = element.parentElement;
        while (parent && parent !== document.body) {
          parent.dispatchEvent(syntheticEvent);
          parent = parent.parentElement;
        }
      }
    }
    rafId = requestAnimationFrame(continuousCheck);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('wheel', handleScroll, { passive: true });
  window.addEventListener('touchmove', handleScroll, { passive: true });
  
  rafId = requestAnimationFrame(continuousCheck);

  return () => {
    window.removeEventListener('mousemove', updateCursor);
    window.removeEventListener('mousedown', updateCursor);
    window.removeEventListener('mouseup', updateCursor);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleScroll);
    window.removeEventListener('touchmove', handleScroll);
    if (rafId) cancelAnimationFrame(rafId);
    isTracking = false;
  };
};

let cleanup: (() => void) | null = null;

export const useScrollHover = () => {
  useEffect(() => {
    if (!cleanup) {
      cleanup = startTracking();
    }
    return () => {
      // Don't cleanup on unmount, keep it global
    };
  }, []);
};
