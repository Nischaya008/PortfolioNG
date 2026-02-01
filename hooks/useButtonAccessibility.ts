import { useEffect, useRef } from 'react';

// Hook to ensure buttons are always clickable by monitoring and fixing z-index/pointer-events
export const useButtonAccessibility = () => {
  useEffect(() => {
    const ensureButtonsClickable = () => {
      // Find all project card buttons
      const projectCards = document.querySelectorAll('[data-project-index]');
      
      projectCards.forEach((card) => {
        const buttons = card.querySelectorAll('a[href]');
        
        buttons.forEach((button) => {
          const htmlButton = button as HTMLElement;
          
          // Force pointer-events and z-index with !important
          htmlButton.style.setProperty('pointer-events', 'auto', 'important');
          htmlButton.style.setProperty('position', 'relative', 'important');
          htmlButton.style.setProperty('z-index', '999999', 'important');
          
          // Ensure parent container also allows pointer events
          const buttonContainer = htmlButton.closest('.md\\:col-span-4') as HTMLElement;
          if (buttonContainer) {
            buttonContainer.style.setProperty('pointer-events', 'auto', 'important');
            buttonContainer.style.setProperty('position', 'relative', 'important');
            buttonContainer.style.setProperty('z-index', '999998', 'important');
          }
          
          // Also ensure the card itself doesn't block
          const card = htmlButton.closest('[data-project-index]') as HTMLElement;
          if (card) {
            card.style.setProperty('pointer-events', 'auto', 'important');
          }
        });
      });
    };

    // Run immediately
    ensureButtonsClickable();

    // Run on scroll and resize
    const handleScroll = () => {
      requestAnimationFrame(ensureButtonsClickable);
    };

    // Run periodically to catch any changes
    const interval = setInterval(ensureButtonsClickable, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      requestAnimationFrame(ensureButtonsClickable);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);
};
