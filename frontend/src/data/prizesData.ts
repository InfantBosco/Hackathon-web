export interface PrizeTier {
  id: string;
  rank: string;
  amount: string;
  title: string;
  description: string;
  badge: string;
  glow: 'cyan' | 'purple' | 'none';
}

export const prizesData = {
  totalPool: '₹1.5L+',
  tiers: [
    {
      id: '1st-place',
      rank: '01',
      amount: 'TBD',
      title: 'First Place Winner',
      description: 'Grand Winner Trophy, Cash Prize, Incubation Opportunities & Winner Certificates.',
      badge: 'CHAMPION',
      glow: 'cyan',
    },
    {
      id: '2nd-place',
      rank: '02',
      amount: 'TBD',
      title: 'Runner Up',
      description: 'Second Place Trophy, Cash Prize, Sponsor Credits & Runner-Up Certificates.',
      badge: 'RUNNER UP',
      glow: 'purple',
    },
    {
      id: '3rd-place',
      rank: '03',
      amount: 'TBD',
      title: 'Second Runner Up',
      description: 'Third Place Trophy, Cash Prize & Excellence Certificates.',
      badge: 'FINALIST',
      glow: 'none',
    },
  ] as PrizeTier[],
  specialTracks: [
    'Best All-Women Team',
    'Best AI Innovation',
    'Best Freshman Team',
    'Best Open Source Contribution',
  ],
};
