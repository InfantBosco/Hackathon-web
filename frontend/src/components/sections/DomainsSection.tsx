import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { BentoGrid, BentoCard } from '../ui/BentoGrid';
import { Badge } from '../ui/Badge';
import { domainsData } from '../../data/domainsData';
import { Cpu, ShieldCheck, DollarSign, Activity, Globe, Leaf } from 'lucide-react';

export const DomainsSection: React.FC = () => {
  const domainIcons: Record<string, React.ReactNode> = {
    'ai-ml': <Cpu className="w-8 h-8 text-[var(--color-accent-cyan)]" />,
    cybersecurity: <ShieldCheck className="w-8 h-8 text-[var(--color-accent-purple)]" />,
    fintech: <DollarSign className="w-8 h-8 text-[var(--color-accent-purple)]" />,
    healthtech: <Activity className="w-8 h-8 text-[var(--color-accent-cyan)]" />,
    web3: <Globe className="w-8 h-8 text-[var(--color-accent-purple)]" />,
    sustainability: <Leaf className="w-8 h-8 text-[var(--color-accent-cyan)]" />,
  };

  return (
    <Section id="domains" variant="primary">
      <SectionHeader
        badge="DOMAIN TRACKS"
        title="Explore Problem Domains"
        subtitle="Choose your focus area and build game-changing technical solutions across 6 frontier tracks."
      />

      <BentoGrid>
        {domainsData.map((domain) => (
          <BentoCard
            key={domain.id}
            colSpan={domain.colSpan}
            rowSpan={domain.rowSpan}
            className="group"
          >
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-cyan)] transition-colors">
                  {domainIcons[domain.id]}
                </div>
                <Badge variant={domain.glow}>{domain.category}</Badge>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-[var(--color-accent-cyan)] transition-colors mb-2">
                  {domain.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="text-xs font-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <span>MOCK TRACK CONTENT</span>
                <span className="text-[var(--color-accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE →</span>
              </div>
            </div>
          </BentoCard>
        ))}
      </BentoGrid>
    </Section>
  );
};
