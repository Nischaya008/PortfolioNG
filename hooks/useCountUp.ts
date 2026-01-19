import { useState, useEffect } from 'react';

// Easing function for smooth deceleration
const easeOutExpo = (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const useCountUp = (start: number, end: number, duration: number = 2000, shouldStart: boolean = false) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Apply easing
            const easedProgress = easeOutExpo(percentage);

            // Calculate current value based on start and end
            const currentCount = Math.floor(start + (end - start) * easedProgress);

            setCount(currentCount);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure exact end value
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [start, end, duration, shouldStart]);

    return count;
};
