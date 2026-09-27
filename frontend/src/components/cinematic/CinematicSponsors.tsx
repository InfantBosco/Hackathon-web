import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sponsorsData } from '../../data/sponsorsData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicSponsors: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sponsor-reveal-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.sponsor-card',
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sponsors" className="relative py-28 sm:py-36 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sponsor-reveal-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-semibold mb-4">
            OUR SPONSORS & PARTNERS
          </span>
          <h2
            className="font-heading font-black tracking-tight text-white"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Backed by Tech Leaders
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto mt-2">
            Empowering student innovators with infrastructure, mentorship, and industry access.
          </p>
        </div>

        {/* Sponsor logos shown cleanly with sleek hover and staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sponsorsData.map((sponsor) => {
            const isCover = sponsor.imageFit === 'cover';
            const cardContent = (
              <div
                className={`w-full flex items-center justify-center min-h-[220px] md:min-h-[240px] h-[220px] md:h-[240px] border border-white/20 ${
                  isCover ? 'bg-black p-0' : 'bg-white p-5 sm:p-6'
                } backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-400 group-hover:border-amber-400/80 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] group-hover:-translate-y-2 cursor-pointer overflow-hidden relative isolate`}
              >
                <img
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  className={`w-full h-full ${
                    isCover
                      ? 'object-cover scale-105 group-hover:scale-110'
                      : 'object-contain group-hover:scale-105'
                  } ${sponsor.filterClass || ''} transition-transform duration-400 ease-out`}
                />
              </div>
            );

            return (
              <div key={sponsor.id} className="sponsor-card flex flex-col items-center group">
                {sponsor.websiteUrl ? (
                  <a
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="w-full">{cardContent}</div>
                )}
                <span className="text-sm md:text-base font-heading font-bold text-white tracking-wide mt-3 text-center transition-colors group-hover:text-amber-300">
                  {sponsor.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
