import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Card } from '../ui/Card';
import { sponsorsData } from '../../data/sponsorsData';
import { Building2, Mail } from 'lucide-react';

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
            className="flex flex-col items-center justify-center p-8 text-center min-h-[140px] border-red-500/20 shadow-[0_0_15px_rgba(255,30,66,0.15)]"
          >
            <Building2 className="w-8 h-8 text-white mb-2" />
            <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
              {sponsor.placeholderText}
            </span>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center text-center mt-8 text-xs font-mono text-slate-300 space-y-1.5">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <span>Interested in sponsoring HackNEX 2026? Contact</span>
          <span className="inline-flex items-center gap-1 font-semibold text-white">
            <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
            NEXUS
          </span>
          <span>Club organizers.</span>
        </div>

        <div className="text-xs font-mono text-slate-300 flex items-center justify-center gap-1.5 pt-1">
          <Mail className="w-3.5 h-3.5 text-white shrink-0" />
          <span>Contact us : </span>
          <a
            href="mailto:nexus-karunya@karunya.edu.in"
            className="text-white font-semibold underline hover:text-slate-200 transition-colors"
          >
            nexus-karunya@karunya.edu.in
          </a>
        </div>
      </div>
    </Section>
  );
};
