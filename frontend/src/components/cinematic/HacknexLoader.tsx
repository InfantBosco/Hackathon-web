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
        <span>{left}</span>
        <span className="text-amber-400/90">/</span>
        <span>{right}</span>
      </>
    );
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 bg-[#080808] text-neutral-300 font-mono select-none"
    >
      {/* Top empty spacer to balance layout */}
      <div className="w-full h-8" />

      {/* Center Minimal Terminal Title */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-mono tracking-tight text-neutral-300 font-normal flex items-center">
          {renderTypedText()}
          <span className="inline-block w-[2px] h-[1.1em] bg-neutral-400 ml-1.5 animate-pulse" />
        </h1>

        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-500 mt-3 sm:mt-4">
          24H NATIONAL LEVEL HACKATHON · KITS COIMBATORE
        </p>
      </div>

      {/* Bottom Right Minimal Percentage Counter */}
      <div className="w-full flex justify-end items-end">
        <span className="text-xs sm:text-sm font-mono text-neutral-500 tabular-nums tracking-wider">
          {progress}%
        </span>
      </div>
    </div>
  );
};
