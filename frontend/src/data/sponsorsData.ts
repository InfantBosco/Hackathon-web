export interface SponsorItem {
  id: string;
  name: string;
  category: 'TITLE SPONSOR' | 'GOLD SPONSOR' | 'COMMUNITY PARTNER';
  placeholderText: string;
}

export const sponsorsData: SponsorItem[] = [
  { id: '1', name: 'Sponsor Placeholder 1', category: 'TITLE SPONSOR', placeholderText: 'TITLE SPONSOR TBD' },
  { id: '2', name: 'Sponsor Placeholder 2', category: 'GOLD SPONSOR', placeholderText: 'GOLD SPONSOR TBD' },
  { id: '3', name: 'Sponsor Placeholder 3', category: 'GOLD SPONSOR', placeholderText: 'GOLD SPONSOR TBD' },
  { id: '4', name: 'Sponsor Placeholder 4', category: 'COMMUNITY PARTNER', placeholderText: 'COMMUNITY PARTNER TBD' },
  { id: '5', name: 'Sponsor Placeholder 5', category: 'COMMUNITY PARTNER', placeholderText: 'COMMUNITY PARTNER TBD' },
  { id: '6', name: 'Sponsor Placeholder 6', category: 'COMMUNITY PARTNER', placeholderText: 'COMMUNITY PARTNER TBD' },
];
