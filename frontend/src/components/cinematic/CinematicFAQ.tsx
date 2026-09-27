import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { faqData, faqCategories } from '../../data/faqData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicFAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [openId, setOpenId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal - smooth scroll scrub
      gsap.fromTo(
        '.faq-header-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-header-reveal',
            start: 'top 90%',
            end: 'top 65%',
            scrub: 1.2,
          },
        }
      );

      // Accordion items reveal sequentially with scroll
      gsap.utils.toArray<HTMLElement>('.faq-item-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 75%',
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    // Crucial: refresh ScrollTrigger so sections below adjust their positions without crashing
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
  };

  const filteredFaqs =
    selectedCategory === 'ALL'
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-28 sm:py-36 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Frosted Glassmorphism Panel */}
        <div className="rounded-3xl border border-white/[0.14] bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
          {/* Header */}
          <div className="faq-header-reveal text-center mb-10">
            <span className="block text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-bold mb-3 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              className="font-heading font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            >
              Everything You Need to Know
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Got queries regarding teams, schedule, or rules? Find your answers here.
            </p>
          </div>

          {/* Category Filter */}
          <div className="faq-header-reveal flex flex-wrap items-center justify-center gap-2 mb-10">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenId(null);
                  setTimeout(() => ScrollTrigger.refresh(), 200);
                }}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/25 scale-105'
                    : 'text-slate-300 hover:text-white border border-white/10 hover:border-white/30 bg-white/[0.04] backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="faq-item-reveal border border-white/[0.1] rounded-2xl bg-white/[0.04] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.07]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-heading font-semibold text-white hover:text-amber-300 transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? '400px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 pt-0 text-sm text-slate-300 leading-relaxed border-t border-white/[0.06]">
                      <div className="pt-3">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
