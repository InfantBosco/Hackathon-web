import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Badge } from '../ui/Badge';
import { domainsData, DomainItem } from '../../data/domainsData';
import { ContainerScrollBox } from '../ui/ContainerScrollBox';

export const DomainsSection: React.FC = () => {
  // SVG Paths for the 4 Inward Concave Corner Cutouts matching the exact pinwheel design
  const cardPaths: Record<string, string> = {
    // Top-Left Card (Gen AI): Cutout at Bottom-Right
    genai: 'M 28,0 L 372,0 A 28,28 0 0 1 400,28 L 400,192 A 68,68 0 0 0 332,260 L 28,260 A 28,28 0 0 1 0,232 L 0,28 A 28,28 0 0 1 28,0 Z',
    
    // Top-Right Card (Agentic AI): Cutout at Bottom-Left
    agentic: 'M 28,0 L 372,0 A 28,28 0 0 1 400,28 L 400,232 A 28,28 0 0 1 372,260 L 68,260 A 68,68 0 0 0 0,192 L 0,28 A 28,28 0 0 1 28,0 Z',
    
    // Bottom-Left Card (CV): Cutout at Top-Right
    cv: 'M 28,0 L 332,0 A 68,68 0 0 0 400,68 L 400,232 A 28,28 0 0 1 372,260 L 28,260 A 28,28 0 0 1 0,232 L 0,28 A 28,28 0 0 1 28,0 Z',
    
    // Bottom-Right Card (Smart Infra): Cutout at Top-Left
    smartinfra: 'M 68,0 L 372,0 A 28,28 0 0 1 400,28 L 400,232 A 28,28 0 0 1 372,260 L 28,260 A 28,28 0 0 1 0,232 L 0,68 A 68,68 0 0 0 68,0 Z',
  };

  // Card specific layout adjustments with Google 4-Color identity styling
  const cardLayouts: Record<string, { headerClass?: string; contentClass?: string; badgeClass?: string; numberClass?: string; strokeColor?: string; badgeVariant?: 'cyan' | 'purple' | 'warning' | 'success' }> = {
    genai: {
      contentClass: 'pr-12 sm:pr-16 pb-2',
      strokeColor: 'rgba(66, 133, 244, 0.4)',
      badgeVariant: 'cyan',
    },
    agentic: {
      contentClass: 'pl-12 sm:pl-16 pb-2',
      strokeColor: 'rgba(234, 67, 53, 0.4)',
      badgeVariant: 'purple',
    },
    cv: {
      badgeClass: 'mr-12 sm:mr-16',
      contentClass: 'pr-4',
      strokeColor: 'rgba(251, 188, 5, 0.4)',
      badgeVariant: 'warning',
    },
    smartinfra: {
      numberClass: 'ml-12 sm:ml-16',
      contentClass: 'pl-4',
      strokeColor: 'rgba(52, 168, 83, 0.4)',
      badgeVariant: 'success',
    },
  };

  return (
    <Section id="domains" variant="primary">
      <SectionHeader
        badge="PROBLEM DOMAINS"
        title="Explore Core Focus Areas"
        subtitle="Build impactful technical solutions across 4 vital innovation domains."
      />

      <div className="relative max-w-4xl mx-auto my-6">
        {/* 2x2 Grid Layout with clearance for center emblem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 relative">
          {domainsData.map((domain: DomainItem) => {
            const layout = cardLayouts[domain.id] || {};
            return (
              <ContainerScrollBox key={domain.id}>
                <div
                  className="relative group min-h-[240px] sm:min-h-[260px] flex flex-col justify-between p-7 sm:p-9 cursor-pointer select-none w-full"
                >
                  {/* SVG Background Canvas */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    viewBox="0 0 400 260"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={cardPaths[domain.id]}
                      fill="rgba(12, 12, 16, 0.88)"
                      stroke={layout.strokeColor || "rgba(255, 255, 255, 0.18)"}
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      className="transition-all duration-300 group-hover:stroke-white group-hover:fill-zinc-950"
                    />
                  </svg>

                  {/* Card Foreground Content Header */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    {/* Clean Number without glowing blur background */}
                    <span className={`font-royal font-black text-2xl sm:text-3xl text-slate-100 tracking-wider ${layout.numberClass || ''}`}>
                      {domain.number}
                    </span>
                    <div className={layout.badgeClass || ''}>
                      <Badge variant={layout.badgeVariant || 'cyan'}>{domain.category}</Badge>
                    </div>
                  </div>

                  {/* Card Foreground Content Description */}
                  <div className={`relative z-10 ${layout.contentClass || ''}`}>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                      {domain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      {domain.description}
                    </p>
                  </div>
                </div>
              </ContainerScrollBox>
            );
          })}

          {/* Center HackNEX Emblem Pinned at the Concave Cutout Center */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-zinc-950 border-2 border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex-col items-center justify-center text-center p-3 select-none backdrop-blur-md transition-transform duration-300 hover:scale-110">
            <img
              src="/logomain_svg.png"
              alt="NEXUS Logo"
              className="w-8 h-8 object-contain mb-1"
            />
            <span className="font-heading font-black tracking-tight text-xs lg:text-sm uppercase text-white">
              HACK<span className="text-slate-300">NEX</span>
            </span>
            <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-0.5">
              DOMAINS
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};
