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
    title: 'Local LLM',
    category: 'DOMAIN 04',
    description: 'Build private, efficient, and offline-capable AI systems using open-source models running locally. Innovate with on-device inference, lightweight quantized models, privacy-preserving pipelines, and specialized local AI solutions.',
  },
];
