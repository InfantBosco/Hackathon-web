import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['IMAGINE.', 'CREATE.', 'INNOVATE.'];

export const CinematicStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Hardware accelerated GPU words reveal with zero frame lag
      gsap.utils.toArray<HTMLElement>('.story-word').forEach((word) => {
        gsap.fromTo(
          word,
          {
            opacity: 0.1,
            y: isMobile ? 35 : 55,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: word,
              start: isMobile ? 'top 88%' : 'top 85%',
              end: isMobile ? 'top 55%' : 'top 45%',
              scrub: 1.0, // Smooth, zero-lag responsive scrub
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-36 md:py-44 overflow-hidden z-10"
      aria-label="Story"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-6 text-center">
          {words.map((word, i) => (
            <span
              key={i}
              className="story-word transform-gpu will-change-[transform,opacity] font-hacknex font-black uppercase tracking-tight text-center select-none leading-none text-white"
              style={{
                fontSize: 'clamp(2.4rem, 8vw, 6.5rem)',
                textShadow: '0 0 35px rgba(255,255,255,0.15)',
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Subtext */}
        <p className="story-word transform-gpu will-change-[transform,opacity] mt-8 sm:mt-10 text-center text-xs sm:text-sm text-amber-400 font-mono uppercase tracking-[0.3em]">
          OCT 08 — 09, 2026 · COIMBATORE, INDIA
        </p>
      </div>
    </section>
  );
};
