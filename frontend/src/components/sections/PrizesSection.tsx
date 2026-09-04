import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { prizesData } from '../../data/prizesData';
import { Trophy, Award, Gift } from 'lucide-react';

export const PrizesSection: React.FC = () => {
  return (
    <Section id="prizes" variant="secondary">
      <SectionHeader
        badge="PRIZES & AWARDS"
        title={`Grand Prize Pool ${prizesData.totalPool}`}
        subtitle="Compete for cash rewards, incubation opportunities, sponsor credits, and national recognition."
      />

      {/* Trophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {prizesData.tiers.map((tier) => (
          <GlassCard key={tier.id} glowColor={tier.glow} className="flex flex-col justify-between relative group">
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
                <Trophy className={`w-8 h-8 ${tier.glow === 'cyan' ? 'text-[var(--color-accent-cyan)]' : tier.glow === 'purple' ? 'text-[var(--color-accent-purple)]' : 'text-amber-400'}`} />
                <h3 className="text-xl font-heading font-bold text-white">{tier.title}</h3>
              </div>

              <div className="text-3xl font-heading font-black text-[var(--color-accent-cyan)] mb-3">
                {tier.amount}
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {tier.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--color-border-subtle)] text-xs font-mono text-[var(--color-text-muted)] flex items-center justify-between">
              <span>PRIZE DETAILS TBD</span>
              <Award className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Special Track Awards List */}
      <div className="max-w-2xl mx-auto p-6 glass-panel rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] text-center">
        <h4 className="text-base font-heading font-bold text-white mb-3 flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 text-[var(--color-accent-cyan)]" />
          <span>Special Category Track Awards</span>
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {prizesData.specialTracks.map((track) => (
            <Badge key={track} variant="outline">
              {track}
            </Badge>
          ))}
        </div>
      </div>
    </Section>
  );
};
