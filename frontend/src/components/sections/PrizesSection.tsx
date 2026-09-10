import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { prizesData } from '../../data/prizesData';
import { Trophy, Award } from 'lucide-react';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';

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
          {prizesData.tiers.map((tier) => {
            const isGold = tier.glow === 'gold';
            const isSilver = tier.glow === 'silver';
            const isBronze = tier.glow === 'bronze';
            const isPlatinum = tier.glow === 'platinum';

            // Card Height & Stacking Order for Desktop Podium Baseline
            const cardHeightClass = isGold
              ? 'md:h-[430px]'
              : isSilver
              ? 'md:h-[390px]'
              : isBronze
              ? 'md:h-[370px]'
              : 'md:h-[335px]';

            // Static Border & White Hover Glow Effect across all 5 boxes
            const staticBorderClass = isGold
              ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
              : isSilver
              ? 'border-slate-300/40 shadow-[0_0_15px_rgba(203,213,225,0.15)]'
              : isBronze
              ? 'border-amber-700/40 shadow-[0_0_15px_rgba(205,127,50,0.15)]'
              : isPlatinum
              ? 'border-slate-500/35 shadow-md'
              : 'border-zinc-600/35 shadow-md';

            // White Hover Glow Effect applied to all 5 boxes
            const hoverEffectClass = 'hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.7),0_0_60px_rgba(255,255,255,0.35)] hover:-translate-y-2 group-hover:border-white';

            // Rank Badge Circle (Gold -> Silver -> Bronze -> Platinum -> Titanium)
            const rankCircleClass = isGold
              ? 'bg-amber-950/60 border-amber-400 text-amber-300'
              : isSilver
              ? 'bg-slate-900/80 border-slate-300 text-slate-100'
              : isBronze
              ? 'bg-[#2A1B0E]/80 border-amber-600 text-[#E5A869]'
              : isPlatinum
              ? 'bg-slate-900/90 border-slate-400 text-slate-300'
              : 'bg-zinc-900/90 border-zinc-500 text-zinc-400';

            // Amount Text Color
            const amountColorClass = isGold
              ? 'text-amber-300'
              : isSilver
              ? 'text-slate-100'
              : isBronze
              ? 'text-[#E5A869]'
              : isPlatinum
              ? 'text-slate-200'
              : 'text-zinc-300';

            return (
              <ContainerScrollBox key={tier.id} className="w-full h-full relative group">
                {/* Outer White Soft Glow Aura on Hover */}
                <div className="absolute -inset-1 rounded-2xl bg-white/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <GlassCard
                  glowColor="none"
                  className={`flex flex-col justify-between relative group border bg-[#0b0c13]/90 backdrop-blur-xl transition-all duration-300 ease-out ${staticBorderClass} ${hoverEffectClass} ${cardHeightClass} min-h-[300px] overflow-hidden p-5 sm:p-6 text-left`}
                >
                  {/* Inner White Top Radial Ambient Glow on Hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                  {/* Top Ambient Glow Effects */}
                  {isGold && (
                    <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
                  )}
                  {isSilver && (
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-300/15 blur-2xl pointer-events-none" />
                  )}

                  <div>
                    {/* Header: Centered Rank Circle */}
                    <div className="flex items-center justify-center mb-5">
                      <div className={`w-11 h-11 rounded-full border flex items-center justify-center font-heading font-black text-lg shadow-sm ${rankCircleClass}`}>
                        {tier.rank}
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
                              ? 'text-slate-200 drop-shadow-[0_0_8px_rgba(226,232,240,0.6)]'
                              : 'text-amber-600 drop-shadow-[0_0_8px_rgba(205,127,50,0.6)]'
                          }`}
                        />
                      ) : (
                        <Award
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isPlatinum ? 'text-slate-300' : 'text-zinc-400'
                          }`}
                        />
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
              </ContainerScrollBox>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
