import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HacknexLoaderProps {
  onComplete: () => void;
}

export const HacknexLoader: React.FC<HacknexLoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'hacknex/hackathon';

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';

    // Typewriter effect for "hacknex/hackathon"
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayText(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typeInterval);
      }
    }, 70);

    // Smooth counter from 0 to 100%
    const counterObj = { val: 0 };
    const tween = gsap.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.floor(counterObj.val));
      },
      onComplete: () => {
        // Hold at 100% briefly then smoothly fade out
        gsap.delayedCall(0.25, () => {
          if (!loaderRef.current) {
            document.body.style.overflow = '';
            onComplete();
            return;
          }

          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              document.body.style.overflow = '';
              onComplete();
            },
          });
        });
      },
    });

    return () => {
      clearInterval(typeInterval);
      tween.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Split displayed text to highlight the slash '/' in amber
  const renderTypedText = () => {
    if (!displayText.includes('/')) {
      return <span>{displayText}</span>;
    }
    const [left, right] = displayText.split('/');
    return (
      <>
        <span className="text-white">{left}</span>
        <span className="text-amber-400 font-bold">/</span>
        <span className="text-white">{right}</span>
      </>
    );
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-10 bg-[#030712] text-white font-mono select-none overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 45%, rgba(245, 158, 11, 0.09) 0%, transparent 60%),
          linear-gradient(to bottom, #030712, #02040a)
        `,
      }}
    >
      {/* Top spacer */}
      <div className="w-full h-8" />

      {/* Center: Logo Symbol + Terminal Title */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        {/* Official Colorful Nexus Hexagon Symbol */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full blur-xl bg-amber-400/20 scale-125 pointer-events-none" />
          <img
            src="/logomain_svg.png"
            alt="HackNEX Logo"
            className="relative h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.35)] animate-[pulse_3s_ease-in-out_infinite]"
          />
        </div>

        {/* Minimal Terminal Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-mono tracking-tight text-white font-normal flex items-center">
          {renderTypedText()}
          <span className="inline-block w-[2px] h-[1.1em] bg-amber-400 ml-1.5 animate-pulse" />
        </h1>

        {/* Subtitle in website amber accent */}
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-amber-400/80 mt-3 sm:mt-4 font-medium">
          24H NATIONAL LEVEL HACKATHON · KITS COIMBATORE
        </p>
      </div>

      {/* Bottom Right Percentage Counter in website amber */}
      <div className="w-full flex justify-end items-end">
        <span className="text-xs sm:text-sm font-mono text-amber-400 font-semibold tabular-nums tracking-wider drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
          {progress}%
        </span>
      </div>
    </div>
  );
};
