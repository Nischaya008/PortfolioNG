import { useEffect } from 'react';

// Direct hover manager that applies styles programmatically
let cursorX = 0;
let cursorY = 0;
let isInitialized = false;
let rafId: number | null = null;
let styleElement: HTMLStyleElement | null = null;

// Map of element to its original styles (for restoration)
const elementStyles = new WeakMap<Element, Map<string, string>>();

const initDirectHover = () => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  // Create a style element for dynamic CSS
  styleElement = document.createElement('style');
  styleElement.id = 'direct-hover-styles';
  document.head.appendChild(styleElement);

  // Track cursor position
  const updateCursor = (e: MouseEvent) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  };

  window.addEventListener('mousemove', updateCursor, { passive: true });
  window.addEventListener('mousedown', updateCursor, { passive: true });
  window.addEventListener('mouseup', updateCursor, { passive: true });

  // Apply hover styles directly by checking computed styles and class names
  const applyHoverStyles = (element: Element) => {
    if (!(element instanceof HTMLElement)) return;

    const classes = element.className;
    if (typeof classes !== 'string') return;

    const computedStyle = window.getComputedStyle(element);

    // Check for hover border classes (border-white/10 with hover:border-primary/30)
    if (classes.includes('border-white/10') && classes.includes('hover:border-primary')) {
      if (!elementStyles.has(element)) {
        const original = new Map<string, string>();
        original.set('borderColor', computedStyle.borderColor);
        elementStyles.set(element, original);
      }
      element.style.borderColor = 'rgba(0, 255, 136, 0.3)';
    }

    // Check for hover background (bg-card with hover:bg-zinc-900/50)
    if (classes.includes('bg-card') && classes.includes('hover:bg-zinc-900')) {
      if (!elementStyles.has(element)) {
        const original = elementStyles.get(element) || new Map<string, string>();
        original.set('backgroundColor', computedStyle.backgroundColor);
        elementStyles.set(element, original);
      }
      element.style.backgroundColor = 'rgba(39, 39, 42, 0.5)';
    }

    // Check for skills card hover (border-white/5 with hover:border-primary/30)
    if (classes.includes('border-white/5') && classes.includes('hover:border-primary/30')) {
      if (!elementStyles.has(element)) {
        const original = new Map<string, string>();
        original.set('borderColor', computedStyle.borderColor);
        original.set('transform', computedStyle.transform);
        elementStyles.set(element, original);
      }
      element.style.borderColor = 'rgba(0, 255, 136, 0.3)';
      element.style.transform = 'translateY(-4px)';
    }

    // Handle group hover children
    const group = element.closest('.group');
    if (group) {
      // Use a more reliable method - check all children
      const allChildren = group.querySelectorAll('*');
      allChildren.forEach(child => {
        if (!(child instanceof HTMLElement)) return;
        const childClasses = child.className;
        if (typeof childClasses !== 'string') return;

        const childComputed = window.getComputedStyle(child);

        // Group hover text primary
        if (childClasses.includes('group-hover:text-primary') && !childClasses.includes('group-hover:text-primary/20')) {
          if (!elementStyles.has(child)) {
            const original = new Map<string, string>();
            original.set('color', childComputed.color);
            elementStyles.set(child, original);
          }
          child.style.color = '#00ff88';
        }

        // Group hover text primary/20
        if (childClasses.includes('group-hover:text-primary/20')) {
          if (!elementStyles.has(child)) {
            const original = new Map<string, string>();
            original.set('color', childComputed.color);
            elementStyles.set(child, original);
          }
          child.style.color = 'rgba(0, 255, 136, 0.2)';
        }

        // Group hover border
        if (childClasses.includes('group-hover:border-primary/20')) {
          if (!elementStyles.has(child)) {
            const original = new Map<string, string>();
            original.set('borderColor', childComputed.borderColor);
            elementStyles.set(child, original);
          }
          child.style.borderColor = 'rgba(0, 255, 136, 0.2)';
        }

        // Group hover bg primary/20
        if (childClasses.includes('group-hover:bg-primary/20')) {
          if (!elementStyles.has(child)) {
            const original = new Map<string, string>();
            original.set('backgroundColor', childComputed.backgroundColor);
            elementStyles.set(child, original);
          }
          child.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
        }

        // Group hover bg primary (full)
        if (childClasses.includes('group-hover:bg-primary') && !childClasses.includes('group-hover:bg-primary/20')) {
          if (!elementStyles.has(child)) {
            const original = new Map<string, string>();
            original.set('backgroundColor', childComputed.backgroundColor);
            elementStyles.set(child, original);
          }
          child.style.backgroundColor = '#00ff88';
        }
      });
    }
  };

  // Remove hover styles
  const removeHoverStyles = (element: Element) => {
    const original = elementStyles.get(element);
    if (original) {
      original.forEach((value, key) => {
        (element as HTMLElement).style[key as any] = value;
      });
    }

    // Remove from group children
    const group = element.closest('.group');
    if (group) {
      const children = group.querySelectorAll('[class*="group-hover:"]');
      children.forEach(child => {
        const childOriginal = elementStyles.get(child);
        if (childOriginal) {
          childOriginal.forEach((value, key) => {
            (child as HTMLElement).style[key as any] = value;
          });
        }
      });
    }
  };

  let currentElement: Element | null = null;
  let currentGroup: Element | null = null;

  // Check hover continuously
  const checkHover = () => {
    if (cursorX > 0 && cursorY > 0) {
      const element = document.elementFromPoint(cursorX, cursorY);

      // Find hoverable parent (card with hover classes or group)
      let hoverable: Element | null = null;
      let group: Element | null = null;

      if (element) {
        // Check if element itself or any parent has hover classes
        let current: Element | null = element;
        while (current && current !== document.body) {
          const classes = current.className;
          if (typeof classes === 'string') {
            // Check for hover classes
            if (classes.includes('hover:border-primary') ||
              classes.includes('hover:bg-') ||
              classes.includes('hover:border-primary/30')) {
              hoverable = current;
            }
            // Check for group
            if (classes.includes('group')) {
              group = current;
            }
          }
          current = current.parentElement;
        }

        // If no direct hoverable found but we're in a group, use the group
        if (!hoverable && group) {
          hoverable = group;
        }
      }

      // Remove styles from previous element
      if (currentElement && currentElement !== hoverable) {
        removeHoverStyles(currentElement);
        currentElement = null;
      }
      if (currentGroup && currentGroup !== group) {
        // Group changed, styles already removed above
        currentGroup = null;
      }

      // Apply styles to current element
      if (hoverable && hoverable !== currentElement) {
        applyHoverStyles(hoverable);
        currentElement = hoverable;
        if (group) {
          currentGroup = group;
        }
      } else if (!element && currentElement) {
        removeHoverStyles(currentElement);
        currentElement = null;
        currentGroup = null;
      }
    }

    rafId = requestAnimationFrame(checkHover);
  };

  // Also trigger on scroll
  const handleScroll = () => {
    // Force a check
    if (cursorX > 0 && cursorY > 0) {
      checkHover();
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('wheel', handleScroll, { passive: true });

  rafId = requestAnimationFrame(checkHover);

  return () => {
    window.removeEventListener('mousemove', updateCursor);
    window.removeEventListener('mousedown', updateCursor);
    window.removeEventListener('mouseup', updateCursor);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('wheel', handleScroll);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (styleElement) {
      styleElement.remove();
      styleElement = null;
    }
    isInitialized = false;
  };
};

let cleanup: (() => void) | null = null;

export const useDirectHover = () => {
  useEffect(() => {
    if (!cleanup) {
      cleanup = initDirectHover();
    }
    return () => {
      // Keep it global
    };
  }, []);
};
