import React from 'react';
import { Section } from '../layout/Section';
import { Trophy } from 'lucide-react';
import { prizesData } from '../../data/prizesData';
import { cn } from '../../lib/utils';

export const PrizesSection: React.FC = () => {
  const prizeCards = [
    {
      id: '2nd-place',
      rank: '02',
      title: 'Second Prize',
      amount: '₹95,000',
      icon: Trophy,
      iconColor: 'text-white group-hover:text-slate-100',
      amountColor: 'text-white',
      bulletColor: 'bg-slate-300',
      badgeBorder: 'border-white/40 text-white bg-white/10 group-hover:border-slate-200 group-hover:shadow-[0_0_15px_rgba(248,250,252,0.4)]',
      cardClass: 'border-white/15 hover:border-slate-100 hover:shadow-[0_0_35px_rgba(248,250,252,0.5),0_0_70px_rgba(226,232,240,0.25)] min-h-[380px] lg:min-h-[430px] order-2 lg:order-1',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(248,250,252,0.18)_0%,transparent_70%)]',
      perks: [
        'Cash prize: ₹50,000',
        'Three EC-Council vouchers worth ₹15,000 each: ₹45,000',
        'Total prize value: ₹95,000',
      ],
    },
    {
      id: '1st-place',
      rank: '01',
      title: 'First Prize',
      amount: '₹1,50,000',
      icon: Trophy,
      iconColor: 'text-amber-400 group-hover:text-amber-300',
      amountColor: 'text-amber-400 group-hover:text-amber-300',
      bulletColor: 'bg-amber-400',
      badgeBorder: 'border-amber-400/80 text-amber-300 bg-amber-400/15 shadow-[0_0_15px_rgba(251,191,36,0.3)] group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.45)]',
      cardClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_45px_rgba(245,158,11,0.55),0_0_85px_rgba(245,158,11,0.25)] min-h-[420px] lg:min-h-[480px] order-1 lg:order-2 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative lg:-translate-y-3',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.22)_0%,transparent_70%)]',
      perks: [
        'Cash prize: ₹75,000',
        'Three EC-Council vouchers worth ₹25,000 each: ₹75,000',
        'Total prize value: ₹1,50,000',
      ],
    },
    {
      id: '3rd-place',
      rank: '03',
      title: 'Third Prize',
      amount: '₹70,000',
      icon: Trophy,
      iconColor: 'text-amber-500 group-hover:text-amber-400',
      amountColor: 'text-[#E5A869] group-hover:text-amber-400',
      bulletColor: 'bg-[#E5A869]',
      badgeBorder: 'border-amber-600/60 text-amber-400 bg-amber-600/15 group-hover:border-[#E5A869] group-hover:shadow-[0_0_15px_rgba(229,168,105,0.4)]',
      cardClass: 'border-amber-700/30 hover:border-[#E5A869] hover:shadow-[0_0_35px_rgba(229,168,105,0.5),0_0_70px_rgba(205,127,50,0.25)] min-h-[370px] lg:min-h-[410px] order-3 lg:order-3',
      innerGlow: 'bg-[radial-gradient(ellipse_at_top,rgba(229,168,105,0.18)_0%,transparent_70%)]',
      perks: [
        'Cash prize: ₹25,000, sponsored by ASIR TECH',
        'Three EC-Council vouchers worth ₹15,000 each: ₹45,000',
        'Total prize value: ₹70,000',
      ],
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

      {/* 3-Column Stepped Podium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end max-w-5xl mx-auto px-4 sm:px-6">
        {prizeCards.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.id}
              className={cn(
                'group relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#0c0d14]/85 backdrop-blur-md border flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 overflow-hidden',
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

              <div>
                {/* Top: Rank Circle */}
                <div className="relative z-10 flex justify-center w-full mb-6">
                  <div
                    className={cn(
                      'w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center font-heading font-bold text-base tracking-wider select-none transition-all duration-300',
                      tier.badgeBorder
                    )}
                  >
                    {tier.rank}
                  </div>
                </div>

                {/* Title & Big Amount */}
                <div className="relative z-10 text-left w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={cn('w-4 h-4 shrink-0 transition-colors duration-300', tier.iconColor)} />
                    <span className="font-heading font-bold text-white text-base sm:text-lg">
                      {tier.title}
                    </span>
                  </div>

                  <div className={cn('text-3xl sm:text-4xl font-heading font-black tracking-tight transition-colors duration-300', tier.amountColor)}>
                    {tier.amount}
                  </div>
                </div>
              </div>

              {/* Detailed Perks Breakdown */}
              <div className="relative z-10 w-full mt-6 pt-5 border-t border-white/10">
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {tier.perks.map((perk, idx) => {
                    const isTotal = idx === tier.perks.length - 1;
                    return (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className={cn('mt-1.5 w-1.5 h-1.5 rounded-full shrink-0', tier.bulletColor)} />
                        <span className={isTotal ? 'font-semibold text-white' : 'text-slate-300'}>
                          {perk}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default PrizesSection;
