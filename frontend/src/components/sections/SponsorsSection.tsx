import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { sponsorsData } from '../../data/sponsorsData';
import { Building2 } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  return (
    <Section id="sponsors" variant="primary">
      <SectionHeader
        badge="OUR SPONSORS & PARTNERS"
        title="Backed by Tech Leaders"
        subtitle="Empowering student innovators with infrastructure, mentorship, and cloud credits."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {sponsorsData.map((sponsor) => (
          <Card
            key={sponsor.id}
            variant="hoverGlow"
            className="flex flex-col items-center justify-center p-8 text-center min-h-[140px]"
          >
            <Building2 className="w-8 h-8 text-[var(--color-text-muted)] mb-2" />
            <span className="text-xs font-mono font-semibold tracking-wider text-[var(--color-text-muted)] uppercase">
              {sponsor.placeholderText}
            </span>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 text-xs font-mono text-[var(--color-text-muted)]">
        Interested in sponsoring HackNEX 2026? Contact NEXUS Club organizers.
      </div>
    </Section>
  );
};
