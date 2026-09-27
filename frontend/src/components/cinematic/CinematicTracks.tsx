import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { domainsData } from '../../data/domainsData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicTracks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTitlePhase, setIsTitlePhase] = useState(true);
  const [revealedWordCount, setRevealedWordCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const titleWords = ['Core', 'Domains', 'Shaping', 'Next-Gen', 'Innovation'];

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        setIsTitlePhase(false);
        setActiveIndex(0);
        return;
      }

      const totalTracks = domainsData.length;
      // Generous runway on mobile so each swipe smoothly advances one domain at a time
      const sectionHeight = isMobile ? 380 : 480;

      const tracker = { progress: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${sectionHeight}vh`,
        pin: true,
        anticipatePin: 1,
        onToggle: (self) => {
          (window as any).__tracksActive = self.isActive;
        },
        onEnter: () => {
          (window as any).__tracksActive = true;
        },
        onLeave: () => {
          (window as any).__tracksActive = false;
        },
        onEnterBack: () => {
          (window as any).__tracksActive = true;
        },
        onLeaveBack: () => {
          (window as any).__tracksActive = false;
        },
      });

      gsap.to(tracker, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${sectionHeight}vh`,
          scrub: 1.2,
        },
        onUpdate: () => {
          const p = tracker.progress;
          const titleThreshold = isMobile ? 0.14 : 0.12;

          if (p < titleThreshold) {
            setIsTitlePhase(true);
            const wordRatio = p / (titleThreshold * 0.85);
            const count = Math.min(
              Math.floor(wordRatio * titleWords.length) + 1,
              titleWords.length
            );
            setRevealedWordCount(count);
          } else {
            setIsTitlePhase(false);
            const domainP = (p - titleThreshold) / (1 - titleThreshold);
            const nextIndex = Math.min(
              Math.floor(domainP * totalTracks),
              totalTracks - 1
            );
            setActiveIndex(nextIndex);
          }
        },
      });
    }, sectionRef);

    return () => {
      (window as any).__tracksActive = false;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="tracks" className="relative overflow-hidden z-10 py-0">
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-16">
        <div className="w-full max-w-5xl mx-auto py-8 relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center">

          {/* PHASE 1: Title Reveal Sequence */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-all duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
              isTitlePhase
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-10 pointer-events-none'
            }`}
          >
            <span className="text-xs sm:text-sm font-mono text-amber-400 font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4 block">
              // CORE INNOVATION TRACKS
            </span>
            <h2
              className="font-heading font-black tracking-tight leading-[1.1] max-w-4xl"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
            >
              {titleWords.map((word, idx) => (
                <span
                  key={idx}
                  className={`inline-block mr-2 sm:mr-4 transition-all duration-300 ${
                    revealedWordCount > idx
                      ? idx === 3
                        ? 'text-amber-400 opacity-100 translate-y-0 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]'
                        : 'text-white opacity-100 translate-y-0'
                      : 'text-white/20 opacity-20 translate-y-2'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h2>
            <p
              className={`text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400 mt-6 sm:mt-8 transition-all duration-500 ${
                revealedWordCount >= titleWords.length
                  ? 'opacity-80 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              Scroll to explore domains ↓
            </p>
          </div>

          {/* PHASE 2: Domains Sequence (Only ONE domain occurs initially; next ones spawn smoothly on scroll) */}
          <div
            className={`w-full transition-all duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
              !isTitlePhase
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
          >
            <div className="relative min-h-[340px] sm:min-h-[380px] flex flex-col justify-center">
              {domainsData.map((domain, i) => (
                <div
                  key={domain.id}
                  className={`absolute inset-0 grid grid-cols-12 gap-4 sm:gap-8 items-center transition-all duration-500 ease-out transform-gpu will-change-[transform,opacity] ${
                    !isTitlePhase && i === activeIndex
                      ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                      : !isTitlePhase && i < activeIndex
                      ? 'opacity-0 -translate-y-8 pointer-events-none scale-95'
                      : 'opacity-0 translate-y-8 pointer-events-none scale-95'
                  }`}
                >
                  {/* Domain Content */}
                  <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm font-mono text-amber-400 font-bold uppercase tracking-[0.25em]">
                        {domain.category}
                      </span>
                      <span className="w-8 sm:w-12 h-[1px] bg-amber-400/40" />

                      {/* Mobile Step Badge */}
                      <span className="md:hidden ml-auto text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                        {domain.number} / 06
                      </span>
                    </div>

                    <h3
                      className="font-heading font-black text-white tracking-tight leading-[1.08] mb-3 sm:mb-6"
                      style={{ fontSize: 'clamp(2rem, 5.5vw, 5.2rem)' }}
                    >
                      {domain.title}
                    </h3>

                    <p className="text-sm sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                      {domain.description}
                    </p>

                    {/* Mobile Progress Dots */}
                    <div className="md:hidden flex items-center gap-1.5 mt-6">
                      {domainsData.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === activeIndex
                              ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                              : 'w-1.5 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Desktop Watermark Number */}
                  <div className="hidden md:flex col-span-4 items-center justify-end select-none pointer-events-none">
                    <span
                      className="font-heading font-black text-white/25 leading-none transition-all duration-500 select-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.8)]"
                      style={{ fontSize: 'clamp(8rem, 16vw, 14rem)' }}
                    >
                      {domain.number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
