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
    id: '2',
    name: 'Karimam Global Ventures',
    category: 'GOLD SPONSOR',
    placeholderText: 'GOLD SPONSOR',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1789013093/qdsr0h4nalbvgkicfgky.jpg',
    websiteUrl: 'https://www.karimamglobal.com/',
  },
  {
    id: '1',
    name: 'Reflex Labs',
    category: 'TITLE SPONSOR',
    placeholderText: 'TITLE SPONSOR',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1788603159/esj3daiyfgzlrdja6aqy.jpg',
    websiteUrl: 'https://www.reflexlabs.ai/',
  },
  {
    id: '3',
    name: 'Payanam Foundation',
    category: 'COMMUNITY PARTNER',
    placeholderText: 'COMMUNITY PARTNER',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1789013093/zo5opxfx81wwaxjxibri.jpg',
    websiteUrl: 'https://www.payanamfoundation.org/',
  },
];
