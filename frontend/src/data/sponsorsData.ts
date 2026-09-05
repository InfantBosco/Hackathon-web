export interface SponsorItem {
  id: string;
  name: string;
  category: 'TITLE SPONSOR' | 'GOLD SPONSOR' | 'COMMUNITY PARTNER';
  placeholderText: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export const sponsorsData: SponsorItem[] = [
  {
    id: '1',
    name: 'Reflex Labs',
    category: 'TITLE SPONSOR',
    placeholderText: 'TITLE SPONSOR',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1788603159/esj3daiyfgzlrdja6aqy.jpg',
    websiteUrl: 'https://www.reflexlabs.ai/',
  },
  { id: '2', name: 'Sponsor Placeholder 2', category: 'GOLD SPONSOR', placeholderText: 'GOLD SPONSOR TBD' },
  { id: '3', name: 'Sponsor Placeholder 3', category: 'COMMUNITY PARTNER', placeholderText: 'COMMUNITY PARTNER TBD' },
];
