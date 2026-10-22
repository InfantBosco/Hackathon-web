export interface PrizeTier {
  id: string;
  rank: string;
  amount: string;
  title: string;
  badge: string;
  glow: 'gold' | 'silver' | 'bronze';
  podiumOrder: number;
  perks: string[];
}

export const prizesData = {
  totalPool: '₹3.5L+',
  tiers: [
    {
      id: '2nd-place',
      rank: '02',
      amount: '₹95,000',
      title: 'Second Prize',
      badge: 'SILVER',
      glow: 'silver' as const,
      podiumOrder: 1,
      perks: [
        'Cash prize: ₹50,000',
        'Three EC-Council vouchers worth ₹15,000 each: ₹45,000',
        'Total prize value: ₹95,000',
      ],
    },
    {
      id: '1st-place',
      rank: '01',
      amount: '₹1,50,000',
      title: 'First Prize',
      badge: 'GOLD',
      glow: 'gold' as const,
      podiumOrder: 2,
      perks: [
        'Cash prize: ₹75,000',
        'Three EC-Council vouchers worth ₹25,000 each: ₹75,000',
        'Total prize value: ₹1,50,000',
      ],
    },
    {
      id: '3rd-place',
      rank: '03',
      amount: '₹70,000',
      title: 'Third Prize',
      badge: 'BRONZE',
      glow: 'bronze' as const,
      podiumOrder: 3,
      perks: [
        'Cash prize: ₹25,000, sponsored by ASIR TECH',
        'Three EC-Council vouchers worth ₹15,000 each: ₹45,000',
        'Total prize value: ₹70,000',
      ],
    },
  ],
};
