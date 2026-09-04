export interface DomainItem {
  id: string;
  title: string;
  category: string;
  description: string;
  colSpan: 1 | 2 | 3;
  rowSpan: 1 | 2;
  glow: 'cyan' | 'purple';
}

export const domainsData: DomainItem[] = [
  {
    id: 'ai-ml',
    title: 'AI & Generative Intelligence',
    category: 'TRACK 01',
    description: 'Build autonomous agents, LLM pipelines, multimodal applications, and generative AI solutions solving domain-specific challenges.',
    colSpan: 2,
    rowSpan: 1,
    glow: 'cyan',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & DefSec',
    category: 'TRACK 02',
    description: 'Zero-trust architecture, threat detection, cryptosystems, and secure vulnerability intelligence.',
    colSpan: 1,
    rowSpan: 1,
    glow: 'purple',
  },
  {
    id: 'fintech',
    title: 'FinTech & Decentralized Finance',
    category: 'TRACK 03',
    description: 'Next-gen payment rails, fraud detection models, and automated financial analytics.',
    colSpan: 1,
    rowSpan: 1,
    glow: 'purple',
  },
  {
    id: 'healthtech',
    title: 'HealthTech & Bio-Informatics',
    category: 'TRACK 04',
    description: 'AI-assisted medical diagnostics, wearable health telemetry, and patient management platforms.',
    colSpan: 2,
    rowSpan: 1,
    glow: 'cyan',
  },
  {
    id: 'web3',
    title: 'Web3 & Decentralized Protocols',
    category: 'TRACK 05',
    description: 'Smart contract ecosystems, decentralized identity (DID), and cross-chain interoperability.',
    colSpan: 1,
    rowSpan: 1,
    glow: 'purple',
  },
  {
    id: 'sustainability',
    title: 'Sustainability & Open Innovation',
    category: 'TRACK 06',
    description: 'Clean energy optimization, carbon tracking, and open innovation for social impact.',
    colSpan: 2,
    rowSpan: 1,
    glow: 'cyan',
  },
];
