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

  // Proper innovative title in pristine English
  const titleWords = ['Core', 'Domains', 'Shaping', 'Next-Gen', 'Innovation'];

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile || prefersReduced) {
        // Mobile: Word-by-word scrubbed title reveal as user reaches tracks
        gsap.fromTo(
          '.track-word-mobile',
          { opacity: 0.15, y: 15, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.tracks-mobile-header',
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.0,
            },
          }
        );

        // Mobile: Smooth scrubbed entrance for each domain card
        gsap.utils.toArray<HTMLElement>('.track-card-mobile').forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.1, y: 35, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 65%', scrub: 1.0 },
            }
          );
        });
        return;
      }

      // Desktop: Pinned scroll experience
      const totalTracks = domainsData.length;
      // Streamlined runway (480vh) so title spawns right away and domain arrives smoothly without dead space
      const sectionHeight = 480;

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

      // Smooth scrub tween (scrub: 1.6) ensures responsive, prompt word spawns and seamless domain flow
      gsap.to(tracker, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${sectionHeight}vh`,
          scrub: 1.6,
        },
        onUpdate: () => {
          const p = tracker.progress;
          // Prompt title threshold (0.12): words spawn immediately and domains enter quickly
          const titleThreshold = 0.12;

          if (p < titleThreshold) {
            setIsTitlePhase(true);
            const wordRatio = p / (titleThreshold * 0.85);
            const count = Math.min(
              Math.floor(wordRatio * titleWords.length) + 1,
              titleWords.length
            );
            setRevealedWordCount(count);
          } else {
            // Rapid, smooth handoff to domains
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
    <section ref={sectionRef} id="tracks" className="relative overflow-hidden z-10 py-6 md:py-0">
      {/* Mobile: stacked view with word-by-word title reveal & clear watermark numbers */}
      <div className="md:hidden py-16 px-4 sm:px-6 tracks-mobile-header">
        <span className="block text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
          INNOVATION TRACKS
        </span>
        <h2
          className="font-heading font-black tracking-tight text-white mb-10 leading-tight flex flex-wrap gap-x-2.5 gap-y-1"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
        >
          {titleWords.map((word, idx) => (
            <span
              key={idx}
              className={`track-word-mobile inline-block ${
                idx === 3 ? 'text-amber-400 font-black' : 'text-white'
              }`}
            >
              {word}
            </span>
          ))}
        </h2>
        <div className="space-y-8">
          {domainsData.map((domain) => (
            <div
              key={domain.id}
              className="track-card-mobile pl-5 border-l-2 border-amber-400/50 py-3 relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono text-amber-400 tracking-widest block mb-1.5 font-semibold">
                    {domain.category}
                  </span>
                  <h3
                    className="font-heading font-black text-white mt-1 mb-2"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}
                  >
                    {domain.title}
                  </h3>
                </div>
                <span className="font-heading font-black text-white/25 text-6xl select-none leading-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
                  {domain.number}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-normal mt-2">{domain.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: pinned experience — Title occurs one by one, then domains with more visible transparent numbers */}
      <div className="hidden md:flex min-h-screen items-center px-6 lg:px-16">
        <div className="w-full max-w-5xl mx-auto py-8 relative min-h-[420px] flex items-center justify-center">

          {/* PHASE 1: Title Reveal Sequence (words spawn immediately one by one with scroll) */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-all duration-500 ease-out ${
              isTitlePhase
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-10 pointer-events-none'
            }`}
          >
            <span className="text-xs sm:text-sm font-mono text-amber-400 font-bold uppercase tracking-[0.3em] mb-4 block">
              // CORE INNOVATION TRACKS
            </span>
            <h2
              className="font-heading font-black tracking-tight leading-[1.1] max-w-4xl"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
            >
              {titleWords.map((word, idx) => (
                <span
                  key={idx}
                  className={`inline-block mr-3 sm:mr-4 transition-all duration-400 ${
                    revealedWordCount > idx
                      ? idx === 3
                        ? 'text-amber-400 opacity-100 translate-y-0 blur-0 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]'
                        : 'text-white opacity-100 translate-y-0 blur-0'
                      : 'text-white/20 opacity-20 translate-y-2 blur-[4px]'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h2>
            <p
              className={`text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400 mt-8 transition-all duration-500 ${
                revealedWordCount >= titleWords.length
                  ? 'opacity-80 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              Scroll to explore domains ↓
            </p>
          </div>

          {/* PHASE 2: Domains Sequence (with prominently visible transparent watermark numbers) */}
          <div
            className={`w-full transition-all duration-600 ease-out ${
              !isTitlePhase
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
          >
            <div className="relative min-h-[380px] flex flex-col justify-center">
              {domainsData.map((domain, i) => (
                <div
                  key={domain.id}
                  className={`absolute inset-0 grid grid-cols-12 gap-8 items-center transition-all duration-600 ease-out ${
                    !isTitlePhase && i === activeIndex
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : !isTitlePhase && i < activeIndex
                      ? 'opacity-0 -translate-y-8 pointer-events-none'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  {/* Left: Domain Text */}
                  <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs sm:text-sm font-mono text-amber-400 font-bold uppercase tracking-[0.3em]">
                        {domain.category}
                      </span>
                      <span className="w-12 h-[1px] bg-amber-400/40" />
                    </div>
                    <h3
                      className="font-heading font-black text-white tracking-tight leading-[1.05] mb-6"
                      style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)' }}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                      {domain.description}
                    </p>
                  </div>

                  {/* Right: Transparent Number Watermark (Prominently visible: text-white/25) */}
                  <div className="hidden md:flex col-span-4 items-center justify-end select-none pointer-events-none">
                    <span
                      className="font-heading font-black text-white/25 leading-none transition-all duration-600 select-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.8)]"
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
