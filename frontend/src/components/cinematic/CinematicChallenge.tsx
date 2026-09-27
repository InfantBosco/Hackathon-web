import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/siteConfig';
import { domainsData } from '../../data/domainsData';
import { Lock, Clock, Download, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CinematicChallenge: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showNotice, setShowNotice] = useState(false);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.challenge-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 65%',
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePdfDownload = () => {
    if (siteConfig.problemStatementsPdfUrl) {
      window.open(siteConfig.problemStatementsPdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3500);
    }
  };

  return (
    <section ref={sectionRef} id="problem-statements" className="relative py-28 sm:py-36 overflow-hidden z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="challenge-reveal mb-12">
          <span className="block text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
            THE CHALLENGE
          </span>
          <h2
            className="font-heading font-black tracking-tight text-white leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
          >
            Theme & Problem Statements
          </h2>
        </div>

        {/* Theme statement */}
        <div className="challenge-reveal mb-12 max-w-4xl p-8 rounded-3xl bg-[#030712]/75 backdrop-blur-xl border border-white/10 shadow-2xl">
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-heading font-semibold leading-relaxed">
            "Empowering Next-Gen Innovators to Solve Real-World Grand Challenges with AI, Edge Intelligence, and Resilient Systems."
          </p>
        </div>

        {/* Domain tags */}
        <div className="challenge-reveal mb-12">
          <span className="block text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-4">
            CHALLENGE DOMAINS
          </span>
          <div className="flex flex-wrap gap-2.5">
            {domainsData.map((d) => (
              <span
                key={d.id}
                className="px-4 py-2 text-xs font-mono rounded-lg border border-white/10 bg-[#030712]/60 backdrop-blur-md text-slate-300"
              >
                {d.title}
              </span>
            ))}
          </div>
        </div>

        {/* Problem Statement Card */}
        <div className="challenge-reveal p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#030712]/75 backdrop-blur-xl shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading font-bold text-lg text-white">
                    Official Problem Statements
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    <Clock className="w-3 h-3" />
                    To Be Released
                  </span>
                </div>
                <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
                  Detailed problem statements and challenge guidelines will be revealed on Day 1 of the hackathon. Stay tuned!
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                variant="primary"
                onClick={handlePdfDownload}
                leftIcon={<Download className="w-4 h-4" />}
                className="font-royal font-bold text-xs uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300"
              >
                DOWNLOAD PDF
              </Button>
            </div>
          </div>

          {showNotice && (
            <div className="mt-4 p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 flex items-center gap-2 animate-fadeIn">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Problem statements will be unlocked on the event day. Check back soon!</span>
            </div>
          )}
        </div>

        {/* Evaluation Criteria */}
        <div className="challenge-reveal">
          <span className="block text-xs font-mono uppercase tracking-[0.25em] text-slate-400 mb-6">
            HOW YOU WILL BE EVALUATED
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'INNOVATION', desc: 'Originality and uniqueness of the solution', weight: '25%' },
              { label: 'TECHNICAL DEPTH', desc: 'Complexity, architecture, and code quality', weight: '30%' },
              { label: 'IMPACT & VIABILITY', desc: 'Real-world applicability and scalability', weight: '25%' },
              { label: 'PRESENTATION', desc: 'Clarity, demo quality, and pitch effectiveness', weight: '20%' },
            ].map((crit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/[0.08] bg-[#030712]/70 backdrop-blur-md"
              >
                <span className="text-xl font-heading font-black text-amber-400">{crit.weight}</span>
                <h4 className="font-heading font-bold text-sm text-white mt-1 mb-2">{crit.label}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{crit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
