import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Badge } from '../ui/Badge';
import { domainsData, DomainItem } from '../../data/domainsData';
import { Utensils, Droplets, HeartPulse, Zap } from 'lucide-react';

export const DomainsSection: React.FC = () => {
  const domainIcons: Record<string, React.ReactNode> = {
    food: <Utensils className="w-6 h-6 text-white" />,
    water: <Droplets className="w-6 h-6 text-white" />,
    healthcare: <HeartPulse className="w-6 h-6 text-white" />,
    energy: <Zap className="w-6 h-6 text-white" />,
  };

  // SVG Paths for the 4 Inward Concave Corner Cutouts matching the exact pinwheel design
  const cardPaths: Record<string, string> = {
    // Top-Left Card (Food): Cutout at Bottom-Right
    food: 'M 28,0 L 372,0 A 28,28 0 0 1 400,28 L 400,192 A 68,68 0 0 0 332,260 L 28,260 A 28,28 0 0 1 0,232 L 0,28 A 28,28 0 0 1 28,0 Z',
    
    // Top-Right Card (Water): Cutout at Bottom-Left
    water: 'M 28,0 L 372,0 A 28,28 0 0 1 400,28 L 400,232 A 28,28 0 0 1 372,260 L 68,260 A 68,68 0 0 0 0,192 L 0,28 A 28,28 0 0 1 28,0 Z',
    
    // Bottom-Left Card (Healthcare): Cutout at Top-Right
    healthcare: 'M 28,0 L 332,0 A 68,68 0 0 0 400,68 L 400,232 A 28,28 0 0 1 372,260 L 28,260 A 28,28 0 0 1 0,232 L 0,28 A 28,28 0 0 1 28,0 Z',
    
    // Bottom-Right Card (Energy): Cutout at Top-Left
    energy: 'M 68,0 L 372,0 A 28,28 0 0 1 400,28 L 400,232 A 28,28 0 0 1 372,260 L 28,260 A 28,28 0 0 1 0,232 L 0,68 A 68,68 0 0 0 68,0 Z',
  };

  return (
    <Section id="domains" variant="primary">
      <SectionHeader
        badge="PROBLEM DOMAINS"
        title="Explore Core Focus Areas"
        subtitle="Build impactful technical solutions across 4 vital innovation domains."
      />

      <div className="relative max-w-4xl mx-auto my-6">
        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
          {domainsData.map((domain: DomainItem) => (
            <div
              key={domain.id}
              className="relative group min-h-[240px] sm:min-h-[260px] flex flex-col justify-between p-7 sm:p-9 cursor-pointer select-none"
            >
              {/* SVG Background Canvas with Clean Subtle Border (Red Glow Removed) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 400 260"
                preserveAspectRatio="none"
              >
                <path
                  d={cardPaths[domain.id]}
                  fill="rgba(12, 12, 16, 0.88)"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-300 group-hover:stroke-white group-hover:fill-zinc-950"
                />
              </svg>

              {/* Card Foreground Content */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
                  {domainIcons[domain.id]}
                </div>
                <Badge variant="cyan">{domain.category}</Badge>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-slate-200 transition-colors mb-2">
                  {domain.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {domain.description}
                </p>
              </div>
            </div>
          ))}

          {/* Center HackNEX Emblem Pinned at the Concave Cutout Center */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-zinc-950 border-2 border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex-col items-center justify-center text-center p-3 select-none backdrop-blur-md transition-transform duration-300 hover:scale-110">
            <img
              src="/logomain_svg.png"
              alt="NEXUS Logo"
              className="w-9 h-9 object-contain mb-1"
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
