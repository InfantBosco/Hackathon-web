import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { prizesData } from '../../data/prizesData';
import { Trophy, Award } from 'lucide-react';
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
        {prizesData.tiers.map((tier, idx) => (
          <FadeIn key={tier.id} delay={idx * 0.15} direction="up">
            <GlassCard glowColor={tier.glow} className="flex flex-col justify-between relative group border-red-500/25 shadow-[0_0_20px_rgba(255,30,66,0.25)] hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(255,30,66,0.4)] h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center font-heading font-black text-xl text-white">
                    {tier.rank}
                  </div>
                  <Badge variant={tier.glow === 'cyan' ? 'cyan' : tier.glow === 'purple' ? 'purple' : 'outline'}>
                    {tier.badge}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-heading font-bold text-white">{tier.title}</h3>
                </div>

                <div className="text-3xl font-heading font-black text-white mb-3">
                  {tier.amount}
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-[var(--color-text-muted)] flex items-center justify-between">
                <span>PRIZE DETAILS TBD</span>
                <Award className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
