import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { prizesData } from '../../data/prizesData';
import { Trophy } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

export const PrizesSection: React.FC = () => {
  return (
    <Section id="prizes" variant="secondary">
      <SectionHeader
        badge="PRIZES & AWARDS"
        title={`Grand Prize Pool ${prizesData.totalPool}`}
        subtitle="Compete for cash rewards, incubation opportunities, sponsor credits, and national recognition."
      />

      {/* Trophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {prizesData.tiers.map((tier, idx) => {
          const isGold = tier.glow === 'gold';
          const isSilver = tier.glow === 'silver';

          // Hover Glow & Border Theme
          const hoverBorderClass = isGold
            ? 'hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]'
            : isSilver
            ? 'hover:border-slate-300/80 hover:shadow-[0_0_35px_rgba(203,213,225,0.35)]'
            : 'hover:border-amber-600/80 hover:shadow-[0_0_35px_rgba(217,119,6,0.35)]';

          // Badge Styling
          const badgeClass = isGold
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
            : isSilver
            ? 'bg-slate-300/15 text-slate-200 border-slate-300/40 shadow-[0_0_12px_rgba(203,213,225,0.25)]'
            : 'bg-amber-900/30 text-amber-500 border-amber-700/50 shadow-[0_0_12px_rgba(217,119,6,0.25)]';

          // Rank Circle Badge
          const rankCircleClass = isGold
            ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
            : isSilver
            ? 'bg-slate-900/70 border-slate-300/40 text-slate-200'
            : 'bg-amber-950/70 border-amber-700/40 text-amber-500';

          // Trophy Icon Styling
          const trophyColorClass = isGold
            ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]'
            : isSilver
            ? 'text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(203,213,225,0.8)]'
            : 'text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(217,119,6,0.8)]';

          // Amount Text Styling
          const amountColorClass = isGold
            ? 'text-amber-300'
            : isSilver
            ? 'text-slate-100'
            : 'text-amber-500';

          return (
            <FadeIn key={tier.id} delay={idx * 0.15} direction="up">
              <GlassCard
                glowColor={isGold ? 'cyan' : isSilver ? 'purple' : 'none'}
                className={`flex flex-col justify-between relative group border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] ${hoverBorderClass} h-full overflow-hidden p-6 md:p-8`}
              >
                {/* Subtle Ambient Glow Behind Card */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity ${
                    isGold ? 'bg-amber-500' : isSilver ? 'bg-slate-300' : 'bg-amber-700'
                  }`}
                />

                {/* Subtle Sheen Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-heading font-black text-xl transition-colors ${rankCircleClass}`}>
                      {tier.rank}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider border ${badgeClass}`}>
                      {tier.badge}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className={`w-8 h-8 transition-all duration-300 ${trophyColorClass}`} />
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-white transition-colors">{tier.title}</h3>
                  </div>

                  <div className={`text-4xl font-heading font-black mb-4 tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] transition-all ${amountColorClass}`}>
                    {tier.amount}
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed group-hover:text-neutral-200 transition-colors">
                    {tier.description}
                  </p>
                </div>
              </GlassCard>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
};
