import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '../../data/aboutData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicAbout: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading words reveal one by one smoothly with scroll
      gsap.fromTo(
        '.about-word',
        { opacity: 0.1, y: 35, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 85%',
            end: 'top 48%',
            scrub: 1.8,
          },
        }
      );

      // Other content appears slowly and smoothly according to the scroll
      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 sm:py-36 md:py-44 overflow-hidden z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <span className="about-reveal block text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold mb-6">
          {aboutData.badge}
        </span>

        {/* Editorial Heading with word-by-word scroll reveal */}
        <h2
          className="about-heading font-heading font-black tracking-tight text-white leading-[1.08] mb-10 max-w-4xl"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
        >
          {aboutData.title.split(' ').map((word, i) => (
            <span key={i} className="about-word inline-block mr-2.5">
              {word}
            </span>
          ))}
        </h2>

        {/* Two Column Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Main Description */}
          <div className="md:col-span-7">
            <p className="about-reveal text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-6">
              {aboutData.description}
            </p>
            <p className="about-reveal text-base sm:text-lg text-slate-400 leading-relaxed">
              {aboutData.agenda}
            </p>
          </div>

          {/* Side Highlights */}
          <div className="md:col-span-5">
            <div className="about-reveal space-y-4 md:pl-8 md:border-l md:border-white/10 bg-white/[0.02] md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none">
              <span className="block text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-3">
                WHY PARTICIPATE
              </span>
              {aboutData.whyParticipate.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                  <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Metadata */}
            <div className="about-reveal mt-8 pt-6 border-t border-white/[0.08] md:ml-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">MODE</span>
                  <span className="text-sm font-semibold text-white">100% Offline</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">TEAM SIZE</span>
                  <span className="text-sm font-semibold text-white">3 – 4 Members</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">DATES</span>
                  <span className="text-sm font-semibold text-white">Oct 8 – 9, 2026</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">VENUE</span>
                  <span className="text-sm font-semibold text-white">KITS, Coimbatore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
