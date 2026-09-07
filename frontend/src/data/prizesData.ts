export interface PrizeTier {
  id: string;
  rank: string;
  amount: string;
  title: string;
  description: string;
  badge: string;
  glow: 'gold' | 'silver' | 'bronze';
}

export const prizesData = {
  totalPool: '₹1.5L+',
  tiers: [
    {
      id: '1st-place',
      rank: '01',
      amount: '₹75,000',
      title: 'First Place Winner',
      description: 'Grand Winner Trophy, ₹75K Cash Prize, Incubation Opportunities & Winner Certificates.',
      badge: 'CHAMPION',
      glow: 'gold',
    },
    {
      id: '2nd-place',
      rank: '02',
      amount: '₹50,000',
      title: 'Runner Up',
      description: 'Second Place Trophy, ₹50K Cash Prize, Sponsor Credits & Runner-Up Certificates.',
      badge: 'RUNNER UP',
      glow: 'silver',
    },
    {
      id: '3rd-place',
      rank: '03',
      amount: '₹25,000',
      title: 'Second Runner Up',
      description: 'Third Place Trophy, ₹25K Cash Prize & Excellence Certificates.',
      badge: '2ND RUNNER UP',
      glow: 'bronze',
    },
  ] as PrizeTier[],
  specialTracks: [
    'Best All-Women Team',
    'Best AI Innovation',
    'Best Freshman Team',
    'Best Open Source Contribution',
  ],
};
