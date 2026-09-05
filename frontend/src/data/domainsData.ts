export interface DomainItem {
  id: 'food' | 'water' | 'healthcare' | 'energy';
  title: string;
  category: string;
  description: string;
}

export const domainsData: DomainItem[] = [
  {
    id: 'food',
    title: 'Food & Agriculture Tech',
    category: 'DOMAIN 01',
    description: 'Innovate precision farming, sustainable food distribution, supply chain tracking, and smart agricultural automation.',
  },
  {
    id: 'water',
    title: 'Water & Environmental Conservation',
    category: 'DOMAIN 02',
    description: 'Build smart water management systems, purification telemetry, flood monitoring, and aquatic ecosystem preservation.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Bio-Tech',
    category: 'DOMAIN 03',
    description: 'Develop AI medical diagnostics, patient care telemetry, wearable health monitors, and emergency medical response systems.',
  },
  {
    id: 'energy',
    title: 'Clean Energy & Smart Power',
    category: 'DOMAIN 04',
    description: 'Create renewable energy optimization, smart grid intelligence, battery management systems, and carbon reduction tech.',
  },
];
