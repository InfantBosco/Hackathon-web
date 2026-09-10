import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { prizesData } from '../../data/prizesData';
import { Trophy, Award } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

export const PrizesSection: React.FC = () => {
  return (
    <Section id="prizes" variant="secondary">
      <SectionHeader
        badge="PRIZES & AWARDS"
        title={`Grand Prize Pool ${prizesData.totalPool}`}
        subtitle="Compete for cash rewards, incubation opportunities, and national recognition across 5 winning ranks."
      />

      {/* 5-Place Podium Container */}
      <div className="max-w-6xl mx-auto pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5 items-end">
          {prizesData.tiers.map((tier, idx) => {
            const isGold = tier.glow === 'gold';
            const isSilver = tier.glow === 'silver';
            const isBronze = tier.glow === 'bronze';

            // Card Height & Stacking Order for Desktop Podium Baseline
            const cardHeightClass = isGold
              ? 'md:h-[430px]'
              : isSilver
              ? 'md:h-[390px]'
              : isBronze
              ? 'md:h-[370px]'
              : 'md:h-[335px]';

            // Hover Glow & Border Styling
            const borderGlowClass = isGold
              ? 'border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:border-amber-300 hover:shadow-[0_0_45px_rgba(245,158,11,0.5)]'
              : isSilver
              ? 'border-slate-300/60 shadow-[0_0_20px_rgba(203,213,225,0.2)] hover:border-slate-200 hover:shadow-[0_0_35px_rgba(203,213,225,0.4)]'
              : isBronze
              ? 'border-amber-700/60 shadow-[0_0_20px_rgba(205,127,50,0.2)] hover:border-amber-500 hover:shadow-[0_0_35px_rgba(205,127,50,0.4)]'
              : 'border-white/15 hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]';

            // Rank Badge Circle
            const rankCircleClass = isGold
              ? 'bg-amber-950/60 border-amber-400 text-amber-300'
              : isSilver
              ? 'bg-slate-900/80 border-slate-300 text-slate-100'
              : isBronze
              ? 'bg-[#2A1B0E]/80 border-amber-600 text-[#E5A869]'
              : 'bg-zinc-900/80 border-white/20 text-slate-300';

            // Badge Pill Tag
            const badgeTagClass = isGold
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : isSilver
              ? 'bg-slate-300/20 text-slate-200 border-slate-300/40'
              : isBronze
              ? 'bg-amber-700/20 text-amber-300 border-amber-600/40'
              : 'bg-white/10 text-slate-300 border-white/20';

            // Amount Text Color
            const amountColorClass = isGold
              ? 'text-amber-300'
              : isSilver
              ? 'text-slate-100'
              : isBronze
              ? 'text-[#E5A869]'
              : 'text-white';

            return (
              <FadeIn key={tier.id} delay={idx * 0.1} direction="up" className="w-full">
                <GlassCard
                  glowColor="none"
                  className={`flex flex-col justify-between relative group border bg-[#0b0c13]/90 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 ${borderGlowClass} ${cardHeightClass} min-h-[300px] overflow-hidden p-5 sm:p-6 text-left`}
                >
                  {/* Subtle Top Ambient Glow for 1st & 2nd Place */}
                  {isGold && (
                    <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
                  )}
                  {isSilver && (
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-300/15 blur-2xl pointer-events-none" />
                  )}

                  <div>
                    {/* Header: Rank Number & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-heading font-black text-base shadow-sm ${rankCircleClass}`}>
                        {tier.rank}
                      </div>
                      <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border ${badgeTagClass}`}>
                        {tier.badge}
                      </div>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-2.5 mb-3">
                      {isGold || isSilver || isBronze ? (
                        <Trophy
                          className={`w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isGold
                              ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]'
                              : isSilver
                              ? 'text-slate-200 drop-shadow-[0_0_8px_rgba(203,213,225,0.6)]'
                              : 'text-amber-600 drop-shadow-[0_0_8px_rgba(205,127,50,0.6)]'
                          }`}
                        />
                      ) : (
                        <Award className="w-5 h-5 shrink-0 text-slate-300 group-hover:scale-110 transition-transform" />
                      )}
                      <h3 className="text-base font-heading font-bold text-white leading-tight">
                        {tier.title}
                      </h3>
                    </div>

                    {/* Cash Prize Amount */}
                    <div className={`text-3xl font-heading font-black mb-3 tracking-tight ${amountColorClass}`}>
                      {tier.amount}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                      {tier.description}
                    </p>
                  </div>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
