import React from 'react';
import { Section } from '../layout/Section';
import { Trophy, Award } from 'lucide-react';
import { prizesData } from '../../data/prizesData';
import { cn } from '../../lib/utils';

export const PrizesSection: React.FC = () => {
  const prizeCards = [
    {
      id: '4th-place',
      rank: '04',
      title: '4th Place',
      amount: '₹5,000',
      icon: Award,
      iconColor: 'text-white/80 group-hover:text-slate-200',
      amountColor: 'text-white',
      badgeBorder: 'border-white/20 text-white/90 bg-white/5 group-hover:border-slate-300 group-hover:shadow-[0_0_15px_rgba(203,213,225,0.35)]',
      cardClass: 'border-white/10 hover:border-slate-300 hover:shadow-[0_0_30px_rgba(203,213,225,0.45),0_0_60px_rgba(148,163,184,0.2)] min-h-[250px] lg:min-h-[290px] order-4 lg:order-1',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(203,213,225,0.12)_0%,transparent_70%)]',
    },
    {
      id: '2nd-place',
      rank: '02',
      title: 'Runner Up',
      amount: '₹50,000',
      icon: Trophy,
      iconColor: 'text-white group-hover:text-slate-100',
      amountColor: 'text-white',
      badgeBorder: 'border-white/30 text-white bg-white/5 group-hover:border-slate-200 group-hover:shadow-[0_0_15px_rgba(248,250,252,0.4)]',
      cardClass: 'border-white/15 hover:border-slate-100 hover:shadow-[0_0_35px_rgba(248,250,252,0.5),0_0_70px_rgba(226,232,240,0.25)] min-h-[290px] lg:min-h-[345px] order-2 lg:order-2',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(248,250,252,0.15)_0%,transparent_70%)]',
    },
    {
      id: '1st-place',
      rank: '01',
      title: 'First Place Winner',
      amount: '₹75,000',
      icon: Trophy,
      iconColor: 'text-amber-400 group-hover:text-amber-300',
      amountColor: 'text-amber-400 group-hover:text-amber-300',
      badgeBorder: 'border-amber-400/80 text-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.2)] group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.45)]',
      cardClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.55),0_0_80px_rgba(245,158,11,0.25)] min-h-[340px] lg:min-h-[395px] order-1 lg:order-3 shadow-[0_0_25px_rgba(245,158,11,0.1)]',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18)_0%,transparent_70%)]',
    },
    {
      id: '3rd-place',
      rank: '03',
      title: '2nd Runner Up',
      amount: '₹25,000',
      icon: Trophy,
      iconColor: 'text-amber-500 group-hover:text-amber-400',
      amountColor: 'text-amber-500 group-hover:text-amber-400',
      badgeBorder: 'border-amber-600/50 text-amber-400 bg-amber-600/10 group-hover:border-[#E5A869] group-hover:shadow-[0_0_15px_rgba(229,168,105,0.4)]',
      cardClass: 'border-amber-700/30 hover:border-[#E5A869] hover:shadow-[0_0_35px_rgba(229,168,105,0.5),0_0_70px_rgba(205,127,50,0.25)] min-h-[280px] lg:min-h-[330px] order-3 lg:order-4',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(229,168,105,0.15)_0%,transparent_70%)]',
    },
    {
      id: '5th-place',
      rank: '05',
      title: '5th Place',
      amount: '₹5,000',
      icon: Award,
      iconColor: 'text-white/80 group-hover:text-zinc-300',
      amountColor: 'text-white',
      badgeBorder: 'border-white/20 text-white/90 bg-white/5 group-hover:border-zinc-400 group-hover:shadow-[0_0_15px_rgba(161,161,170,0.35)]',
      cardClass: 'border-white/10 hover:border-zinc-400 hover:shadow-[0_0_30px_rgba(161,161,170,0.45),0_0_60px_rgba(113,113,122,0.2)] min-h-[250px] lg:min-h-[290px] order-5 lg:order-5',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(161,161,170,0.12)_0%,transparent_70%)]',
    },
  ];

  return (
    <Section id="prizes" variant="primary">
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full text-xs font-mono font-medium tracking-[0.2em] text-zinc-300 border border-white/20 bg-white/5 backdrop-blur-sm uppercase">
          PRIZES & AWARDS
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight mt-4 mb-12 sm:mb-16">
          Grand Prize Pool {prizesData.totalPool}
        </h2>
      </div>

      {/* 5-Column Stepped Podium Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4.5 xl:gap-5 items-end max-w-7xl mx-auto px-4 sm:px-6">
        {prizeCards.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.id}
              className={cn(
                'group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-[#0c0d14]/85 backdrop-blur-md border flex flex-col transition-all duration-300 hover:-translate-y-2 overflow-hidden',
                tier.cardClass
              )}
            >
              {/* Inner Radial Ambient Glow on Hover */}
              <div
                className={cn(
                  'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl sm:rounded-3xl',
                  tier.innerGlow
                )}
              />

              {/* Top: Rank Circle */}
              <div className="relative z-10 flex justify-center w-full mb-6 sm:mb-7">
                <div
                  className={cn(
                    'w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center font-heading font-bold text-sm tracking-wider select-none transition-all duration-300',
                    tier.badgeBorder
                  )}
                >
                  {tier.rank}
                </div>
              </div>

              {/* Directly below numbers: Title, Amount */}
              <div className="relative z-10 text-left w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={cn('w-4 h-4 shrink-0 transition-colors duration-300', tier.iconColor)} />
                  <span className="font-heading font-bold text-white text-sm sm:text-base">
                    {tier.title}
                  </span>
                </div>

                <div className={cn('text-2xl sm:text-3xl xl:text-4xl font-heading font-black tracking-tight transition-colors duration-300', tier.amountColor)}>
                  {tier.amount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
