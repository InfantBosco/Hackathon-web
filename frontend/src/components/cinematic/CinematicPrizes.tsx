import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Sparkles, Lock } from 'lucide-react';
import { prizesData } from '../../data/prizesData';

gsap.registerPlugin(ScrollTrigger);

export const CinematicPrizes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const glowThemes: Record<
    string,
    {
      textGradient: string;
      borderColor: string;
      hoverBorder: string;
      auraColor: string;
      rankBg: string;
      rankText: string;
      innerGlow: string;
      accentColor: string;
    }
  > = {
    gold: {
      textGradient: 'from-amber-100 via-yellow-300 to-amber-500',
      borderColor: 'border-amber-400/35',
      hoverBorder: 'hover:border-amber-400/80',
      auraColor: 'bg-amber-500/25',
      rankBg: 'bg-amber-400/15 border-amber-400/40',
      rankText: 'text-amber-300',
      innerGlow: 'bg-gradient-to-b from-amber-400/15 via-transparent to-transparent',
      accentColor: 'text-amber-400',
    },
    silver: {
      textGradient: 'from-white via-slate-200 to-slate-400',
      borderColor: 'border-slate-300/35',
      hoverBorder: 'hover:border-slate-300/80',
      auraColor: 'bg-slate-300/20',
      rankBg: 'bg-slate-300/15 border-slate-300/40',
      rankText: 'text-slate-200',
      innerGlow: 'bg-gradient-to-b from-slate-200/15 via-transparent to-transparent',
      accentColor: 'text-slate-200',
    },
    bronze: {
      textGradient: 'from-amber-400 via-orange-400 to-yellow-600',
      borderColor: 'border-orange-500/35',
      hoverBorder: 'hover:border-orange-500/80',
      auraColor: 'bg-orange-500/20',
      rankBg: 'bg-orange-500/15 border-orange-500/40',
      rankText: 'text-orange-300',
      innerGlow: 'bg-gradient-to-b from-orange-500/15 via-transparent to-transparent',
      accentColor: 'text-orange-400',
    },
    platinum: {
      textGradient: 'from-cyan-100 via-teal-300 to-emerald-400',
      borderColor: 'border-cyan-400/35',
      hoverBorder: 'hover:border-cyan-400/70',
      auraColor: 'bg-cyan-500/20',
      rankBg: 'bg-cyan-400/15 border-cyan-400/40',
      rankText: 'text-cyan-300',
      innerGlow: 'bg-gradient-to-b from-cyan-400/15 via-transparent to-transparent',
      accentColor: 'text-cyan-400',
    },
    titanium: {
      textGradient: 'from-purple-100 via-indigo-300 to-purple-400',
      borderColor: 'border-purple-400/35',
      hoverBorder: 'hover:border-purple-400/70',
      auraColor: 'bg-purple-500/20',
      rankBg: 'bg-purple-400/15 border-purple-400/40',
      rankText: 'text-purple-300',
      innerGlow: 'bg-gradient-to-b from-purple-400/15 via-transparent to-transparent',
      accentColor: 'text-purple-400',
    },
  };

  const prizeLabels: Record<string, string> = {
    '1st-place': '1st Prize',
    '2nd-place': '2nd Prize',
    '3rd-place': '3rd Prize',
    '4th-place': '4th Prize',
    '5th-place': '5th Prize',
  };

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const flippers = gsap.utils.toArray<HTMLElement>('.prize-card-flipper');
      const isDesktop = window.innerWidth >= 1024;

      if (prefersReduced) {
        // If reduced motion, reveal all directly
        gsap.set(flippers, { rotateY: 180 });
        return;
      }

      // Initial state: cards start un-flipped showing the back face ("1st Prize", etc.)
      gsap.set(flippers, { rotateY: 0 });

      if (!isDesktop) {
        // Mobile / Phone: Flip each card 180deg individually as it scrolls into view
        flippers.forEach((flipper) => {
          gsap.fromTo(
            flipper,
            { rotateY: 0 },
            {
              rotateY: 180,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: flipper,
                start: 'top 80%',
                end: 'top 45%',
                scrub: 1.0,
              },
            }
          );
        });
        return;
      }

      // Desktop / Laptop: Pinned horizontal card gallery with initial hold
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Initial Hold: Cards remain resting (unturned) and 100% visible first while user reads
      const initialHold = 1.3;

      // 2. Sequential turn: Turn each card sequentially 180deg to reveal prize money one by one
      flippers.forEach((flipper, index) => {
        tl.to(
          flipper,
          {
            rotateY: 180,
            ease: 'power2.inOut',
            duration: 1,
          },
          initialHold + index * 0.85
        );
      });

      // 3. Trailing hold: User can view all revealed cards before unpinning
      tl.to({}, { duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative min-h-screen flex flex-col justify-center pt-20 lg:pt-16 pb-8 overflow-hidden z-10"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 lg:mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-semibold">
              PRIZES & RECOGNITION
            </span>
          </div>

          <h2
            className="font-heading font-black tracking-tight text-white mb-0.5"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            Grand Prize Pool
          </h2>

          <span
            className="block font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 my-0.5 drop-shadow-[0_0_35px_rgba(245,158,11,0.3)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {prizesData.totalPool}
          </span>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Scroll to reveal prize rewards, prestigious certificates, and internship tracks.
          </p>
        </div>

        {/* All 5 Cards in a Single Row on Desktop (single line layout) */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 lg:gap-3 xl:gap-4"
        >
          {prizesData.tiers.map((tier) => {
            const theme = glowThemes[tier.glow] || glowThemes.gold;
            const isGold = tier.glow === 'gold';
            const isSilver = tier.glow === 'silver';
            const isBronze = tier.glow === 'bronze';
            const prizeLabel = prizeLabels[tier.id] || `${tier.rank} Prize`;

            return (
              <div
                key={tier.id}
                className="relative group h-[380px] sm:h-[400px] lg:h-[400px] w-full"
                style={{ perspective: '1200px' }}
              >
                {/* Outer Glassmorphic Ambient Halo Glow */}
                <div
                  className={`absolute -inset-1 rounded-3xl ${theme.auraColor} blur-xl opacity-30 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`}
                />

                {/* 3D Flipper Element: Rotates 0deg -> 180deg on scroll */}
                <div
                  className="prize-card-flipper relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* FACE 1 (UNTURNED / BACK OF CARD): Shown initially without prize money */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 border ${theme.borderColor} ${theme.hoverBorder} bg-slate-900/50 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.18)] flex flex-col justify-between overflow-hidden transition-colors duration-300`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    {/* Internal subtle gradient sheen */}
                    <div
                      className={`absolute inset-0 ${theme.innerGlow} pointer-events-none opacity-80`}
                    />
                    <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/5 blur-xl pointer-events-none" />

                    {/* Top Row: Rank circle & Trophy/Award Icon */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-heading font-black text-base backdrop-blur-md shadow-inner ${theme.rankBg} ${theme.rankText}`}
                      >
                        {tier.rank}
                      </div>

                      {isGold || isSilver || isBronze ? (
                        <Trophy
                          className={`w-6 h-6 ${
                            isGold
                              ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]'
                              : isSilver
                              ? 'text-slate-200 drop-shadow-[0_0_12px_rgba(226,232,240,0.7)]'
                              : 'text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.7)]'
                          }`}
                        />
                      ) : (
                        <Award className={`w-6 h-6 ${theme.accentColor}`} />
                      )}
                    </div>

                    {/* Middle: Award Title (e.g. 1st Prize / First Place Winner) - NO prize money */}
                    <div className="relative z-10 text-center my-auto py-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 block mb-1.5 font-semibold">
                        {tier.badge} AWARD
                      </span>
                      <h3
                        className={`font-heading font-black tracking-tight text-white mb-1.5 text-2xl lg:text-[1.65rem] drop-shadow-sm`}
                      >
                        {prizeLabel}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mb-6">
                        {tier.title}
                      </p>

                      {/* Locked / Scroll Reveal Insignia Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-inner">
                        <Lock className="w-3 h-3 text-amber-400/90 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                          Scroll To Reveal
                        </span>
                      </div>
                    </div>

                    {/* Bottom glass accent bar */}
                    <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>TEAM PRIZE</span>
                      <span className="text-amber-300/80 font-semibold">HACKNEX '26</span>
                    </div>
                  </div>

                  {/* FACE 2 (TURNED / FRONT OF CARD): Revealed on scroll with Prize Money */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 border ${theme.borderColor} ${theme.hoverBorder} bg-slate-900/65 backdrop-blur-2xl shadow-[0_8px_36px_0_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.22)] flex flex-col justify-between overflow-hidden`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Internal glowing accent */}
                    <div
                      className={`absolute inset-0 ${theme.innerGlow} pointer-events-none opacity-100`}
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                    {/* Top Row: Rank circle & Trophy/Award Icon */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-heading font-black text-base backdrop-blur-md shadow-inner ${theme.rankBg} ${theme.rankText}`}
                      >
                        {tier.rank}
                      </div>

                      {isGold || isSilver || isBronze ? (
                        <Trophy
                          className={`w-6 h-6 ${
                            isGold
                              ? 'text-amber-400 drop-shadow-[0_0_18px_rgba(245,158,11,0.9)]'
                              : isSilver
                              ? 'text-slate-100 drop-shadow-[0_0_14px_rgba(226,232,240,0.8)]'
                              : 'text-orange-400 drop-shadow-[0_0_14px_rgba(251,146,60,0.8)]'
                          }`}
                        />
                      ) : (
                        <Award className={`w-6 h-6 ${theme.accentColor}`} />
                      )}
                    </div>

                    {/* Middle: Revealed Prize Money & Perks */}
                    <div className="relative z-10 my-auto py-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-1">
                        {tier.badge} AWARD
                      </span>
                      <h4 className="font-heading font-bold text-sm text-white mb-2 leading-snug line-clamp-1">
                        {tier.title}
                      </h4>

                      {/* Prize Amount Display */}
                      <span
                        className={`block font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient} mb-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]`}
                        style={{ fontSize: 'clamp(1.9rem, 2.6vw, 2.7rem)', lineHeight: 1.1 }}
                      >
                        {tier.amount}
                      </span>

                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {tier.description}
                      </p>
                    </div>

                    {/* Bottom glass accent bar */}
                    <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>REWARDED</span>
                      <span className="text-amber-300/90 font-semibold">HACKNEX '26</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
