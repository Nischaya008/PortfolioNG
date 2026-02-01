import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

// Global cursor position state
let globalCursorPosition: CursorPosition = { x: 0, y: 0 };
let lastKnownPosition: CursorPosition = { x: 0, y: 0 };
let isTracking = false;

// Listeners for cursor position updates
const listeners = new Set<(pos: CursorPosition) => void>();

const updateCursorPosition = (x: number, y: number) => {
  globalCursorPosition = { x, y };
  lastKnownPosition = { x, y };
  listeners.forEach(listener => listener(globalCursorPosition));
};

const startGlobalTracking = () => {
  if (isTracking || typeof window === 'undefined') return;
  isTracking = true;

  // Track on mouse move
  const handleMouseMove = (e: MouseEvent) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  // Track on scroll - use last known position
  const handleScroll = () => {
    // On scroll, the cursor position in viewport coordinates doesn't change
    // but we maintain the last known position
  };

  // Also track on any mouse activity
  const handleMouseActivity = (e: MouseEvent) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('wheel', handleScroll, { passive: true });
  window.addEventListener('touchmove', handleScroll, { passive: true });
  window.addEventListener('mousedown', handleMouseActivity, { passive: true });
  window.addEventListener('mouseup', handleMouseActivity, { passive: true });
  window.addEventListener('click', handleMouseActivity, { passive: true });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleScroll);
    window.removeEventListener('touchmove', handleScroll);
    window.removeEventListener('mousedown', handleMouseActivity);
    window.removeEventListener('mouseup', handleMouseActivity);
    window.removeEventListener('click', handleMouseActivity);
    isTracking = false;
  };
};

// Initialize tracking once
let cleanup: (() => void) | null = null;
if (typeof window !== 'undefined') {
  cleanup = startGlobalTracking();
}

export const useCursorPosition = () => {
  const [position, setPosition] = useState<CursorPosition>(globalCursorPosition);

  useEffect(() => {
    const listener = (pos: CursorPosition) => {
      setPosition(pos);
    };
    
    listeners.add(listener);
    setPosition(globalCursorPosition);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return position;
};

// Export function to get current cursor position synchronously
export const getCursorPosition = (): CursorPosition => globalCursorPosition;
