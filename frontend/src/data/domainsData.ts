export interface DomainItem {
  id: 'genai' | 'agentic' | 'cv' | 'smartinfra';
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
    title: 'CV (Computer Vision)',
    category: 'DOMAIN 03',
    description: 'Engineer real-time visual recognition, spatial AI analytics, object detection & tracking, automated inspection, and video understanding.',
  },
  {
    id: 'smartinfra',
    number: '04',
    title: 'Smart Infra',
    category: 'DOMAIN 04',
    description: 'Build intelligent urban systems, smart energy grids, IoT telemetry, automated traffic management, and resilient connected infrastructure.',
  },
];
