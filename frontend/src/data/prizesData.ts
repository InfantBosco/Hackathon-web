export interface PrizeTier {
  id: string;
  rank: string;
  amount: string;
  title: string;
  description: string;
  badge: string;
  glow: 'gold' | 'silver' | 'bronze' | 'platinum' | 'titanium';
  podiumOrder: number;
}

export const prizesData = {
  totalPool: '₹1.5L+',
  tiers: [
    {
      id: '4th-place',
      rank: '04',
      amount: '₹5,000',
      title: '4th Place',
      description: '₹5K Cash Award & Finalist Excellence Certificate.',
      badge: 'PLATINUM',
      glow: 'platinum' as const,
      podiumOrder: 1,
    },
    {
      id: '2nd-place',
      rank: '02',
      amount: '₹50,000',
      title: 'Runner Up',
      description: 'Second Place Trophy, ₹50K Cash Prize & Certificates.',
      badge: 'SILVER',
      glow: 'silver' as const,
      podiumOrder: 2,
    },
    {
      id: '1st-place',
      rank: '01',
      amount: '₹75,000',
      title: 'First Place Winner',
      description: 'Grand Winner Trophy, ₹75K Cash Prize & Incubation.',
      badge: 'GOLD',
      glow: 'gold' as const,
      podiumOrder: 3,
    },
    {
      id: '3rd-place',
      rank: '03',
      amount: '₹25,000',
      title: '2nd Runner Up',
      description: 'Third Place Trophy, ₹25K Cash Prize & Certificates.',
      badge: 'BRONZE',
      glow: 'bronze' as const,
      podiumOrder: 4,
    },
    {
      id: '5th-place',
      rank: '05',
      amount: '₹5,000',
      title: '5th Place',
      description: '₹5K Cash Award & Finalist Excellence Certificate.',
      badge: 'TITANIUM',
      glow: 'titanium' as const,
      podiumOrder: 5,
    },
  ],
};
