import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '../../data/aboutData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const countersStarted = useRef(false);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal animation mapped smoothly to scroll
      gsap.fromTo(
        '.stat-item-box',
        { opacity: 0.1, y: 35 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 90%',
            end: 'top 65%',
            scrub: 1.2,
          },
        }
      );

      // Counter animation triggered when in view
      ScrollTrigger.create({
        trigger: '.stats-container',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (countersStarted.current) return;
          countersStarted.current = true;
          document.querySelectorAll<HTMLElement>('.stat-number').forEach((el) => {
            const end = parseInt(el.dataset.end || '0', 10);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const obj = { val: 0 };
            gsap.to(obj, {
              val: end,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`;
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="relative pt-20 pb-8 sm:pt-28 sm:pb-12 overflow-hidden z-10">
      <div className="stats-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {aboutData.stats.map((stat) => (
            <div
              key={stat.id}
              className="stat-item-box text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
            >
              <span
                className="stat-number block font-heading font-black text-white leading-none mb-2"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
                data-end={stat.end}
                data-prefix={stat.prefix || ''}
                data-suffix={stat.suffix || ''}
              >
                {stat.prefix || ''}0{stat.suffix || ''}
              </span>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
