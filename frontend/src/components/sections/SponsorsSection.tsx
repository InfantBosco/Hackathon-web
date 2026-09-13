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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {sponsorsData.map((sponsor) => {
          const isContain = sponsor.logoUrl?.endsWith('.svg') || sponsor.id === '4';
          const cardContent = (
            <div className="w-full flex items-center justify-center min-h-[200px] md:min-h-[220px] h-[200px] md:h-[220px] border border-white/20 bg-[#0e0e0e]/90 backdrop-blur-md rounded-[var(--radius-lg)] shadow-2xl transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer overflow-hidden relative">
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className={`w-full h-full transition-transform duration-300 ease-out group-hover:scale-105 ${
                  isContain ? 'object-contain p-5 bg-[#0a0a0f]' : 'object-cover'
                }`}
              />
            </div>
          );

          return sponsor.logoUrl ? (
            <div key={sponsor.id} className="flex flex-col items-center group">
              {sponsor.websiteUrl ? (
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  {cardContent}
                </a>
              ) : (
                <div className="w-full">{cardContent}</div>
              )}
              <span className="text-sm md:text-base font-heading font-bold text-white tracking-wide mt-3 text-center transition-colors group-hover:text-slate-200">
                {sponsor.name}
              </span>
            </div>
          ) : (
            <div key={sponsor.id} className="flex flex-col items-center">
              <Card
                variant="hoverGlow"
                className="w-full flex flex-col items-center justify-center p-8 text-center min-h-[200px] md:min-h-[220px] h-[200px] md:h-[220px] border border-white/20 bg-[#0e0e0e]/90 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-white hover:scale-[1.03]"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center mb-3 shadow-inner">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  {sponsor.placeholderText}
                </span>
              </Card>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
