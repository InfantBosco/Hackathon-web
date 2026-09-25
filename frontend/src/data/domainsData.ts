export interface DomainItem {
  id: 'genai' | 'agentic' | 'cv' | 'localllms';
  number: string;
  title: string;
  category: string;
  description: string;
}

export const domainsData: DomainItem[] = [
  {
    id: 'genai',
    number: '01',
    title: 'Gen AI',
    category: 'DOMAIN 01',
    description: 'Innovate next-gen LLM applications, multimodal models, neural code synthesis, intelligent RAG pipelines, and creative generative media.',
  },
  {
    id: 'agentic',
    number: '02',
    title: 'Agentic AI',
    category: 'DOMAIN 02',
    description: 'Develop autonomous AI agents, multi-agent orchestrations, self-executing workflows, task automation, and intelligent reasoning systems.',
  },
  {
    id: 'cv',
    number: '03',
    title: 'Computer Vision',
    category: 'DOMAIN 03',
    description: 'Engineer real-time visual recognition, spatial AI analytics, object detection & tracking, automated inspection, and video understanding.',
  },
  {
    id: 'localllms',
    number: '04',
    title: 'EDGE AI',
    category: 'DOMAIN 04',
    description: 'Build intelligent systems that bring AI closer to where data is generated. Explore on-device inference, edge computing, lightweight AI models, computer vision, and real-time decision-making to create solutions that are fast, efficient, privacy-aware, and capable of operating with limited connectivity.',
  },
];
