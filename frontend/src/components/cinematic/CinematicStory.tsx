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

    const ctx = gsap.context(() => {
      // Words appear slowly and smoothly one by one according to the scroll
      gsap.utils.toArray<HTMLElement>('.story-word').forEach((word) => {
        gsap.fromTo(
          word,
          {
            opacity: 0.08,
            y: 60,
            scale: 0.92,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: word,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 2.0, // Slow, progressive reveal tied to scroll
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
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden z-10"
      aria-label="Story"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center">
          {words.map((word, i) => (
            <span
              key={i}
              className="story-word font-hacknex font-black uppercase tracking-tight text-center select-none leading-none text-white/95"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                textShadow: '0 0 60px rgba(255,255,255,0.12)',
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Subtext */}
        <p className="story-word mt-10 text-center text-xs sm:text-sm text-amber-400/80 font-mono uppercase tracking-[0.3em]">
          OCT 08 — 09, 2026 · COIMBATORE, INDIA
        </p>
      </div>
    </section>
  );
};
