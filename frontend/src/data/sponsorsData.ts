export interface SponsorItem {
  id: string;
  name: string;
  category: 'TITLE SPONSOR' | 'GOLD SPONSOR' | 'COMMUNITY PARTNER';
  placeholderText: string;
  logoUrl?: string;
  websiteUrl?: string;
  imageFit?: 'cover' | 'contain';
  filterClass?: string;
}

export const sponsorsData: SponsorItem[] = [
  {
    id: '1',
    name: 'Reflex Labs',
    category: 'TITLE SPONSOR',
    placeholderText: 'TITLE SPONSOR',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1788603159/esj3daiyfgzlrdja6aqy.jpg',
    websiteUrl: 'https://www.reflexlabs.ai/',
    imageFit: 'cover',
  },
  {
    id: '2',
    name: 'Karimam Global Ventures',
    category: 'GOLD SPONSOR',
    placeholderText: 'GOLD SPONSOR',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1789013093/qdsr0h4nalbvgkicfgky.jpg',
    websiteUrl: 'https://www.karimamglobal.com/',
    filterClass: 'contrast-[1.15] brightness-[1.06] mix-blend-multiply',
  },
  {
    id: '3',
    name: 'Payanam Foundation',
    category: 'COMMUNITY PARTNER',
    placeholderText: 'COMMUNITY PARTNER',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1789013093/zo5opxfx81wwaxjxibri.jpg',
    websiteUrl: 'https://www.payanamfoundation.org/',
    filterClass: 'contrast-[1.2] brightness-[1.08] mix-blend-multiply',
  },
  {
    id: '4',
    name: 'Abstryn',
    category: 'COMMUNITY PARTNER',
    placeholderText: 'COMMUNITY PARTNER',
    logoUrl: 'https://res.cloudinary.com/demc5rxwn/image/upload/v1789321764/dqfjcvdtxx83hvwt4asi.png',
    websiteUrl: 'https://www.abstryn.tech/',
  },
];
