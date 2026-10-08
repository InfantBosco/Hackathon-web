export interface ProblemStatement {
  code: string;
  title: string;
  category: string;
  domainId: 'agentic' | 'genai' | 'cv' | 'localllms';
  tagColor: 'purple' | 'cyan' | 'warning' | 'success';
  pitch: string;
  highlights: string[];
  skills: string[];
  pdfPage: number;
}

export const problemStatementsData: ProblemStatement[] = [
  {
    code: 'HNX26EPS01',
    title: 'Agentic Legal Assistant',
    category: 'Agentic AI',
    domainId: 'agentic',
    tagColor: 'purple',
    pitch: 'An agentic platform that reasons over legal case documents and supports contract/case review, legal drafting, legal research, and grounded RAG chat, where every fact and citation is verifiable.',
    highlights: [
      'Contract & Case Review with fact verification and source references',
      'Legal drafting for petitions and bail applications with zero invented facts',
      'Legal research connecting laws, judgments, and precedents',
      'Grounded conversational Q&A over retrieved case documents'
    ],
    skills: ['RAG', 'Agent Orchestration', 'Retrieval Eval', 'Prompt Grounding'],
    pdfPage: 1
  },
  {
    code: 'HNX26EPS02',
    title: 'Realtime Multilingual Conversational Bot (Indian Languages)',
    category: 'Generative AI',
    domainId: 'genai',
    tagColor: 'cyan',
    pitch: 'A realtime speech-in / speech-out conversational bot that supports Dravidian languages (Tamil, Telugu, Kannada, Malayalam) plus Hindi and English, with low latency and natural responses.',
    highlights: [
      'Speech → understanding → speech loop in English + 2–3 Indic languages',
      'Automatic language detection and seamless mid-utterance code-switch handling',
      'Ultra-low latency from end of user speech to start of bot audio'
    ],
    skills: ['Multilingual ASR/TTS', 'Language ID', 'Low-Resource NLP', 'Latency Engineering'],
    pdfPage: 3
  },
  {
    code: 'HNX26EPS03',
    title: 'Live Translation for Indic Languages',
    category: 'Generative AI',
    domainId: 'genai',
    tagColor: 'cyan',
    pitch: 'Build a live translation system for Hindi, Tamil, Telugu, Kannada, Malayalam and English with real-time streaming captions and optional synthetic voice cloning.',
    highlights: [
      'Real-time streaming translation between English and Indic language pairs',
      'Optional cross-lingual voice cloning preserving the speaker’s own voice',
      'Stable live captions that update smoothly without flickering or late rewrites'
    ],
    skills: ['Streaming ASR', 'Machine Translation', 'Voice Cloning', 'TTS'],
    pdfPage: 4
  },
  {
    code: 'HNX26EPS04',
    title: 'Extreme Bad-Handwriting Digitizing Stack',
    category: 'Generative AI',
    domainId: 'genai',
    tagColor: 'cyan',
    pitch: "A model / agent / software stack that reliably digitizes genuinely bad handwriting (doctor's-scrawl level: cramped, inconsistent, crossed-out words, margin notes, mixed scripts) into clean, editable text.",
    highlights: [
      'Hybrid pipeline combining handwriting OCR with vision-language models',
      'LLM post-correction with layout and context preservation',
      'Explicit uncertainty flagging for illegible regions rather than hallucinating'
    ],
    skills: ['OCR / HTR', 'Vision-Language Models', 'LLM Post-Correction', 'Layout Analysis'],
    pdfPage: 6
  },
  {
    code: 'HNX26EPS05',
    title: 'Multi-Stream Video Intelligence with Conversational Query',
    category: 'Computer Vision',
    domainId: 'cv',
    tagColor: 'warning',
    pitch: 'Plug in multiple CCTV streams; the system continuously detects and indexes events across all cameras, and exposes a chat interface where a user queries events and receives camera, timestamp, and visual evidence.',
    highlights: [
      'Open-vocabulary natural language search across multi-camera streams',
      'Grounded localized answers with camera ID, timestamp, and verified clip',
      'Clarify-once persistent memory for camera and area referents across restarts'
    ],
    skills: ['Video Decoding', 'Open-Vocab Detection', 'Temporal Indexing', 'Multi-Object Tracking'],
    pdfPage: 7
  },
  {
    code: 'HNX26EPS06',
    title: '3D Scene Generation from Blueprints and Room Video',
    category: 'Computer Vision',
    domainId: 'cv',
    tagColor: 'warning',
    pitch: 'Turn a 2D description of a static space (architectural blueprint/floor plan or room video) into a navigable 3D model, generating plausible completions for unobserved regions.',
    highlights: [
      'Mode A: Floor plan / blueprint → 3D model with accurate dimensions and openings',
      'Mode B: Room walkthrough video → 3D mesh, point cloud, or Gaussian splat',
      'Clear visual separation between observed geometry and generatively completed regions'
    ],
    skills: ['3D Vision', 'Structure-from-Motion', 'Gaussian Splatting', 'Generative Inpainting'],
    pdfPage: 9
  },
  {
    code: 'HNX26EPS07',
    title: '4D Scene Reconstruction and a Traversable Video Format',
    category: 'Computer Vision',
    domainId: 'cv',
    tagColor: 'warning',
    pitch: 'Take a video and turn it into a 4D representation: a 3D scene that also lives in time. Move with 6 degrees of freedom while dynamic elements play back smoothly in a lightweight player without heavy GPU hardware.',
    highlights: [
      'Dynamic scene reconstruction with true 6-DoF navigation and motion fidelity',
      'Compact traversable video format / codec with high compression',
      'Smooth playback on ordinary laptops (integrated GPU) and mobile browsers'
    ],
    skills: ['Dynamic 3D Reconstruction', 'Gaussian Splatting', 'Video Codecs', 'WebGL / WebGPU'],
    pdfPage: 11
  },
  {
    code: 'HNX26EPS08',
    title: 'On-Device Conversational Stack',
    category: 'Edge AI',
    domainId: 'localllms',
    tagColor: 'success',
    pitch: 'Build a full ASR → LLM → TTS conversation loop that runs entirely on-device, with zero cloud calls and very low compute usage under simulated CPU-only edge resource limits.',
    highlights: [
      'Fully offline voice-in → voice-out conversation loop on CPU-only hardware',
      'Sub-second latency with wake-word and Voice Activity Detection (VAD)',
      'Aggressive model quantization and graceful degradation when resource-constrained'
    ],
    skills: ['Embedded AI', 'Quantization', 'Streaming ASR / TTS', 'Latency Engineering'],
    pdfPage: 13
  }
];
