import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../../data/siteConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const TwistingTitleTimer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const activeViewRef = useRef<'title' | 'timer'>('title');
  const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  // Live countdown calculation
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(siteConfig.eventStartDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsCompleted(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const headlineLetters = [
    { char: 'H', isGoogleX: false },
    { char: 'A', isGoogleX: false },
    { char: 'C', isGoogleX: false },
    { char: 'K', isGoogleX: false },
    { char: 'N', isGoogleX: false },
    { char: 'E', isGoogleX: false },
    { char: 'X', isGoogleX: true },
  ];

  const timerCards = [
    {
      label: 'DAYS',
      value: formatNumber(timeLeft.days),
      borderClass: 'border-[#4285F4]/60 shadow-[0_0_25px_rgba(66,133,244,0.3)]',
      labelColor: 'text-[#4285F4]',
    },
    {
      label: 'HOURS',
      value: formatNumber(timeLeft.hours),
      borderClass: 'border-[#EA4335]/60 shadow-[0_0_25px_rgba(234,67,53,0.3)]',
      labelColor: 'text-[#EA4335]',
    },
    {
      label: 'MINUTES',
      value: formatNumber(timeLeft.minutes),
      borderClass: 'border-[#FBBC05]/60 shadow-[0_0_25px_rgba(251,188,5,0.3)]',
      labelColor: 'text-[#FBBC05]',
    },
    {
      label: 'SECONDS',
      value: formatNumber(timeLeft.seconds),
      borderClass: 'border-[#34A853]/60 shadow-[0_0_25px_rgba(52,168,83,0.3)]',
      labelColor: 'text-[#34A853]',
    },
  ];

  // 3D Twist Transition Loop: 3s Title <-> 3s Timer
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!containerRef.current) return;

    // Initial setup: Title face is active and upright; Timer face is flipped away
    gsap.set('.twist-char', { rotateX: 0, opacity: 1, y: 0 });
    gsap.set('.twist-title-sub', { opacity: 1, y: 0 });

    gsap.set('.twist-timer-card', { rotateX: 90, opacity: 0, y: 20 });
    gsap.set('.twist-timer-sub', { opacity: 0, y: 10 });
    gsap.set('.twist-timer-colon', { opacity: 0 });

    const triggerFlip = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const current = activeViewRef.current;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          activeViewRef.current = current === 'title' ? 'timer' : 'title';
          // Next flip after exactly 3 seconds!
          timerTimeoutRef.current = setTimeout(triggerFlip, 3000);
        },
      });

      if (current === 'title') {
        // Transition: HACKNEX Title twists out -> Timer twists in
        if (prefersReduced) {
          tl.to(['.twist-char', '.twist-title-sub'], { opacity: 0, duration: 0.3 })
            .to(['.twist-timer-card', '.twist-timer-sub', '.twist-timer-colon'], { opacity: 1, duration: 0.3 });
          return;
        }

        // 1. Title letters twist out with staggered 3D wave
        tl.to('.twist-char', {
          rotateX: -90,
          opacity: 0,
          y: -25,
          stagger: 0.035,
          duration: 0.38,
          ease: 'power2.in',
        }, 0)
        .to('.twist-title-sub', {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: 'power2.in',
        }, 0.1);

        // 2. Timer cards twist into view with responsive bounce
        tl.fromTo(
          '.twist-timer-card',
          { rotateX: 90, opacity: 0, y: 25 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            stagger: 0.045,
            duration: 0.45,
            ease: 'back.out(1.4)',
          },
          0.22
        )
        .fromTo(
          '.twist-timer-colon',
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
          0.3
        )
        .fromTo(
          '.twist-timer-sub',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.35
        );
      } else {
        // Transition: Timer twists out -> HACKNEX Title twists in
        if (prefersReduced) {
          tl.to(['.twist-timer-card', '.twist-timer-sub', '.twist-timer-colon'], { opacity: 0, duration: 0.3 })
            .to(['.twist-char', '.twist-title-sub'], { opacity: 1, duration: 0.3 });
          return;
        }

        // 1. Timer cards twist out
        tl.to('.twist-timer-card', {
          rotateX: -90,
          opacity: 0,
          y: -25,
          stagger: 0.035,
          duration: 0.35,
          ease: 'power2.in',
        }, 0)
        .to(['.twist-timer-colon', '.twist-timer-sub'], {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: 'power2.in',
        }, 0.05);

        // 2. Title letters twist back with staggered spring
        tl.fromTo(
          '.twist-char',
          { rotateX: 90, opacity: 0, y: 25 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            stagger: 0.035,
            duration: 0.45,
            ease: 'back.out(1.4)',
          },
          0.2
        )
        .fromTo(
          '.twist-title-sub',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.35
        );
      }
    };

    // Initial 3-second hold before the first twist
    timerTimeoutRef.current = setTimeout(triggerFlip, 3000);

    return () => {
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
    };
  }, []);

  const handleManualFlip = () => {
    if (isAnimatingRef.current) return;
    if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);

    const current = activeViewRef.current;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        activeViewRef.current = current === 'title' ? 'timer' : 'title';
        timerTimeoutRef.current = setTimeout(() => {
          // Restart loop
          const loopTl = gsap.timeline({
            onComplete: () => {
              activeViewRef.current = activeViewRef.current === 'title' ? 'timer' : 'title';
            },
          });
          if (activeViewRef.current === 'title') {
            loopTl.to('.twist-char', { rotateX: -90, opacity: 0, y: -25, stagger: 0.035, duration: 0.38 })
              .to('.twist-timer-card', { rotateX: 0, opacity: 1, y: 0, stagger: 0.045, duration: 0.45 }, 0.22);
          } else {
            loopTl.to('.twist-timer-card', { rotateX: -90, opacity: 0, y: -25, stagger: 0.035, duration: 0.35 })
              .to('.twist-char', { rotateX: 0, opacity: 1, y: 0, stagger: 0.035, duration: 0.45 }, 0.2);
          }
        }, 3000);
      },
    });

    if (current === 'title') {
      tl.to('.twist-char', { rotateX: -90, opacity: 0, y: -25, stagger: 0.035, duration: 0.38, ease: 'power2.in' }, 0)
        .to('.twist-title-sub', { opacity: 0, y: -10, duration: 0.25 }, 0.1)
        .fromTo('.twist-timer-card', { rotateX: 90, opacity: 0, y: 25 }, { rotateX: 0, opacity: 1, y: 0, stagger: 0.045, duration: 0.45, ease: 'back.out(1.4)' }, 0.22)
        .fromTo('.twist-timer-colon', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.3)
        .fromTo('.twist-timer-sub', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, 0.35);
    } else {
      tl.to('.twist-timer-card', { rotateX: -90, opacity: 0, y: -25, stagger: 0.035, duration: 0.35, ease: 'power2.in' }, 0)
        .to(['.twist-timer-colon', '.twist-timer-sub'], { opacity: 0, y: -10, duration: 0.25 }, 0.05)
        .fromTo('.twist-char', { rotateX: 90, opacity: 0, y: 25 }, { rotateX: 0, opacity: 1, y: 0, stagger: 0.035, duration: 0.45, ease: 'back.out(1.4)' }, 0.2)
        .fromTo('.twist-title-sub', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, 0.35);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleManualFlip}
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-3 select-none cursor-pointer group min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
      style={{ perspective: '1200px' }}
      title="Click to toggle Title / Countdown Timer"
    >
      {/* FACE 1: HACKNEX 2026 TITLE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transform-gpu pointer-events-auto px-2">
        <h1
          className="font-hacknex font-black uppercase leading-[0.9] text-center flex items-center justify-center flex-nowrap whitespace-nowrap select-none max-w-full"
          style={{
            fontSize: 'clamp(1.75rem, 7.5vw, 6.5rem)',
            transformStyle: 'preserve-3d',
          }}
        >
          {headlineLetters.map((item, idx) => (
            <span
              key={idx}
              className={`twist-char inline-block will-change-transform transform-gpu ${
                item.isGoogleX
                  ? 'text-google-x drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : 'text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                transformOrigin: '50% 50% -20px',
              }}
            >
              {item.char}
            </span>
          ))}
        </h1>

        <span className="twist-title-sub text-amber-400 font-mono text-xs sm:text-base md:text-xl tracking-[0.35em] font-semibold mt-1">
          2026
        </span>
      </div>

      {/* FACE 2: LIVE COUNTDOWN TIMER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transform-gpu pointer-events-auto">
        {isCompleted ? (
          <div className="twist-timer-card glass-panel px-8 py-4 rounded-2xl text-center text-xl sm:text-2xl font-heading font-black text-amber-400 border border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.35)]">
            HACKNEX 2026 IS LIVE!
          </div>
        ) : (
          <>
            <div
              className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 max-w-full px-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {timerCards.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <div
                    className={`twist-timer-card min-w-[62px] sm:min-w-[90px] md:min-w-[110px] p-2 sm:p-3 md:p-3.5 rounded-2xl bg-zinc-950/90 backdrop-blur-md border flex flex-col items-center justify-center transition-all ${item.borderClass}`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transformOrigin: '50% 50% -20px',
                    }}
                  >
                    <span className="text-xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-white font-mono drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                      {item.value}
                    </span>
                    <span
                      className={`text-[8px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest mt-0.5 sm:mt-1 ${item.labelColor}`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Pulsing colon divider between cards */}
                  {idx < timerCards.length - 1 && (
                    <span className="twist-timer-colon text-amber-400/80 font-mono font-black text-lg sm:text-2xl md:text-3xl select-none">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <span className="twist-timer-sub text-amber-400 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-semibold mt-2.5 uppercase drop-shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              EVENT COUNTDOWN · OCTOBER 8, 2026
            </span>
          </>
        )}
      </div>
    </div>
  );
};
