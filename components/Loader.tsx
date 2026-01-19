import React, { useEffect, useState } from 'react';

interface LoaderProps {
    onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Total loading time before exit animation starts
        const timer = setTimeout(() => {
            setIsExiting(true);
            // Wait for exit animation to finish before unmounting
            setTimeout(onComplete, 800);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Central Logo Animation */}
            <div className={`relative mb-12 transition-transform duration-700 ${isExiting ? 'scale-150' : 'scale-100'}`}>
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                    {/* Outer Orbiting Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_3s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,255,136,1)]"></div>
                    </div>

                    {/* Inner Orbiting Ring (Counter-rotating) */}
                    <div className="absolute inset-2 rounded-full border border-primary/10 animate-[spin_4s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary/80 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(0,255,136,0.5)]"></div>
                    </div>

                    {/* Core Content */}
                    <div className="absolute inset-4 bg-card/50 backdrop-blur-md border border-primary/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                        {/* Hexagon Shape simulated with clip-path or just use the box for now */}
                        <div className="relative flex items-center justify-center w-full h-full">
                            <span className="text-primary font-bold text-3xl sm:text-4xl tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,136,0.5)] animate-pulse">NG</span>
                        </div>
                    </div>

                    {/* Decorative corners */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-primary/60 rounded-tl"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-primary/60 rounded-br"></div>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl"></div>
                </div>
            </div>

            {/* Text Content */}
            <div className={`text-center transition-all duration-700 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                    Welcome, Visitor!
                </h1>
                <p className="text-lg text-primary/80 font-medium">
                    Let's dive right in
                </p>

                {/* Loading Bar */}
                <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden mx-auto">
                    <div className="w-full h-full bg-primary origin-left animate-[grow_2s_ease-in-out_forwards]"></div>
                </div>

                {/* Loading Dots */}
                <div className="flex gap-2 justify-center mt-4">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-300"></div>
                </div>
            </div>

            <style>{`
        @keyframes grow {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
        </div>
    );
};

export default Loader;
