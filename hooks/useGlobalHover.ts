import { useEffect } from 'react';

// Global hover manager that works even when scrolling without mouse movement
let isInitialized = false;
let currentHoveredElement: Element | null = null;

const initGlobalHover = () => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  let lastCursorPos = { x: 0, y: 0 };
  let rafId: number;

  // Track cursor position
  const handleMouseMove = (e: MouseEvent) => {
    lastCursorPos = { x: e.clientX, y: e.clientY };
    updateHoverState(e.clientX, e.clientY);
  };

  // Update hover on scroll
  const handleScroll = () => {
    if (lastCursorPos.x > 0 && lastCursorPos.y > 0) {
      updateHoverState(lastCursorPos.x, lastCursorPos.y);
    }
  };

  // Update hover state by checking what's under cursor and applying classes
  const updateHoverState = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    
    // Remove hover from previous element
    if (currentHoveredElement && currentHoveredElement !== element) {
      currentHoveredElement.classList.remove('cursor-hover-active');
      // Also remove from parent groups
      const parentGroup = currentHoveredElement.closest('.group');
      if (parentGroup) {
        parentGroup.classList.remove('group-hover-active');
      }
    }

    // Add hover to current element
    if (element && element !== currentHoveredElement) {
      currentHoveredElement = element;
      element.classList.add('cursor-hover-active');
      
      // Also add to parent groups
      const parentGroup = element.closest('.group');
      if (parentGroup) {
        parentGroup.classList.add('group-hover-active');
      }
    } else if (!element) {
      // Cursor is not over any element
      if (currentHoveredElement) {
        currentHoveredElement.classList.remove('cursor-hover-active');
        const parentGroup = currentHoveredElement.closest('.group');
        if (parentGroup) {
          parentGroup.classList.remove('group-hover-active');
        }
        currentHoveredElement = null;
      }
    }
  };

  // Continuous hover detection via RAF
  const checkHover = () => {
    if (lastCursorPos.x > 0 && lastCursorPos.y > 0) {
      updateHoverState(lastCursorPos.x, lastCursorPos.y);
    }
    rafId = requestAnimationFrame(checkHover);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('wheel', handleScroll, { passive: true });
  window.addEventListener('touchmove', handleScroll, { passive: true });
  
  rafId = requestAnimationFrame(checkHover);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleScroll);
    window.removeEventListener('touchmove', handleScroll);
    if (rafId) cancelAnimationFrame(rafId);
    isInitialized = false;
  };
};

// Initialize on import
if (typeof window !== 'undefined') {
  initGlobalHover();
}

export const useGlobalHover = () => {
  useEffect(() => {
    // Hook ensures initialization
    if (!isInitialized) {
      initGlobalHover();
    }
  }, []);
};
