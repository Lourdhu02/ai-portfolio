export type ProjectSlug = 'transformers-ocr' | 'echome' | 'finsentinelai'

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectSection {
  heading: string
  content: string
}

export interface Project {
  slug: ProjectSlug
  title: string
  subtitle: string
  hook: string
  description: string
  tags: string[]
  metrics: ProjectMetric[]
  sections: ProjectSection[]
  github: string
  year: string
}

export const projects: Record<ProjectSlug, Project> = {
  'transformers-ocr': {
    slug: 'transformers-ocr',
    title: 'Transformers-OCR',
    subtitle: 'Industrial OCR at 97% accuracy',
    hook: 'From 82.74% to 97.04% — a production OCR pipeline for government utility automation.',
    description:
      'Transformer-based OCR pipeline using SVTR backbone, custom FocalCTCLoss, and ONNX INT8 quantization for edge deployment.',
    tags: ['PyTorch', 'ONNX', 'AWS Lambda', 'FastAPI'],
    metrics: [
      { label: 'Accuracy', value: '97.04%' },
      { label: 'Inference cost reduction', value: '30%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    sections: [
      {
        heading: 'Problem',
        content:
          'Government utility systems rely on digitizing handwritten and printed meter readings at scale. Existing OCR solutions struggled with character-class imbalance (some digits appear far more frequently than others), motion-blur from handheld capture devices, and low-contrast environments — achieving only 82.74% exact-match accuracy on production datasets. At the required scale, even small accuracy gaps translated to thousands of manual corrections daily.',
      },
      {
        heading: 'Approach',
        content:
          'Built a Transformer-based OCR pipeline using SVTR (a Swin-V2-based regression transformer) as the backbone. The system processes meter images through a custom Feature Rearrangement Module (FRM) that restructures spatial features from the CNN backbone into a sequence suitable for Transformer encoding — bridging convolutional feature extraction with sequence modeling.',
      },
      {
        heading: 'Custom Loss Function',
        content:
          'Designed FocalCTCLoss — a novel combination of focal loss with CTC decoding — to handle severe character-class imbalance. Standard CTC loss was overwhelmed by dominant character classes; the focal modulation down-weights well-classified examples and focuses the gradient on rare but critical characters. This stabilized training and reduced run-to-run variance across multiple random seeds.',
      },
      {
        heading: 'Semantic Guidance',
        content:
          'Added Semantic Guidance Modules to improve robustness in motion-blur and low-contrast environments. The module injects semantic priors during inference — leveraging learned character co-occurrence patterns and context — to maintain accuracy under degraded input conditions without requiring additional training data.',
      },
      {
        heading: 'Deployment',
        content:
          'Deployed via INT8 ONNX quantization on AWS Lambda + FastAPI behind a Docker-based serving stack. Quantization reduced model size by 4x and inference latency by 30% while retaining 97% accuracy. Achieved 99.9% uptime in production. Owned the full lifecycle from labeling specification and data annotation guidelines to production monitoring and alerting.',
      },
    ],
    github: 'https://github.com/Lourdhu02',
    year: '2026',
  },

  echome: {
    slug: 'echome',
    title: 'ECHOME',
    subtitle: 'Cognitive Mirror Engine',
    hook: 'An autonomous agentic AI that mirrors human cognition — three-tier memory, psychometric-adaptive assessment, 70% faster evaluations.',
    description:
      'Autonomous agentic AI with three-tier memory architecture, CAT/IRT psychometric models, and zero-shot voice cloning.',
    tags: ['LangGraph', 'XTTSv2', 'Psychometrics'],
    metrics: [
      { label: 'Assessment time reduction', value: '70%' },
      { label: 'Original assessment time', value: '30 min' },
      { label: 'Optimized assessment time', value: '9 min' },
    ],
    sections: [
      {
        heading: 'Vision',
        content:
          'ECHOME is an autonomous agentic AI system designed to mirror human cognitive processes. Built on LangGraph, it maintains a three-tier memory architecture that enables long-horizon reasoning and adaptive assessment — moving beyond simple chat interactions to genuine understanding. The system operates as a self-funded flagship demonstration of what agentic AI can achieve when grounded in cognitive science principles.',
      },
      {
        heading: 'Three-Tier Memory',
        content:
          'Episodic Memory stores specific interaction sequences and outcomes for pattern recognition across sessions. Semantic Memory maintains structured knowledge graphs for conceptual understanding and relationship mapping. Procedural Memory encodes learned workflows and decision trees for autonomous execution without human intervention. This architecture enables the system to learn from past interactions and apply that learning to novel situations.',
      },
      {
        heading: 'Adaptive Assessment',
        content:
          'Integrated CAT (Computerized Adaptive Testing) and IRT (Item Response Theory) psychometric models with Fisher Information maximization. The system dynamically adjusts assessment difficulty based on real-time performance signals, selecting items that maximize information gain about the user\'s ability level. This reduced assessment time from 30 minutes to 9 minutes — a 70% improvement — while maintaining or improving measurement precision.',
      },
      {
        heading: 'Impact',
        content:
          'Demonstrated that agentic AI systems can perform genuine cognitive tasks — not just pattern matching, but adaptive reasoning that responds to individual user patterns. The 70% reduction in assessment time validates the psychometric integration approach for production adaptive systems. Privacy-first local deployment with XTTSv2 zero-shot voice cloning.',
      },
    ],
    github: 'https://github.com/Lourdhu02/echome',
    year: '2024',
  },

  finsentinelai: {
    slug: 'finsentinelai',
    title: 'FinSentinelAI',
    subtitle: 'Privacy-First Enterprise RAG',
    hook: 'Production-grade RAG for regulated finance — local LLMs, hybrid retrieval, zero data leaves the network.',
    description:
      'Production-grade RAG platform with local LLMs, hybrid retrieval, and JWT-based multi-tenant session isolation for regulated finance.',
    tags: ['Ollama', 'ChromaDB', 'Vision-Language Models'],
    metrics: [
      { label: 'Data sovereignty', value: '100%' },
      { label: 'Deployment', value: 'On-premise' },
      { label: 'Retrieval', value: 'Hybrid (dense + sparse)' },
    ],
    sections: [
      {
        heading: 'Problem',
        content:
          'Financial institutions need intelligent document analysis but cannot send sensitive data to cloud APIs. Regulatory constraints demand complete data sovereignty — every byte must stay on-premise. Existing RAG solutions assume cloud-hosted models, creating a fundamental tension between capability and compliance. Banks and financial services require guaranteed data residency with no exceptions.',
      },
      {
        heading: 'Approach',
        content:
          'Built a production-grade RAG platform that runs entirely locally using Ollama for LLM inference. The system processes PDFs and bank statements through local Vision-Language Models, extracting structured data without any data leaving the network boundary. This includes multi-modal extraction — parsing tables, handwritten fields, and structured documents — all within the customer\'s secure perimeter.',
      },
      {
        heading: 'Hybrid Retrieval',
        content:
          'Combined dense embeddings (sentence-transformers) with sparse retrieval (BM25-style) for robust document search across heterogeneous financial documents. Added a faithfulness verification layer that cross-references generated responses against source chunks, preventing hallucination in high-stakes financial contexts where accuracy is regulatory-mandated.',
      },
      {
        heading: 'Multi-Tenant Isolation',
        content:
          'Implemented JWT-based session isolation ensuring complete separation between tenants. Each client\'s documents, embeddings, and conversation history are cryptographically isolated — a requirement for regulated finance environments. The architecture supports concurrent tenant workloads without cross-contamination risk.',
      },
      {
        heading: 'Impact',
        content:
          'Built for regulated finance customers with strict on-premise / data-residency constraints. The platform demonstrates that enterprise-grade RAG capabilities don\'t require cloud dependency — achieving comparable accuracy while maintaining complete data sovereignty. Designed for deployment scenarios where every network hop is audited and controlled.',
      },
    ],
    github: 'https://github.com/Lourdhu02/fin-sentinal.ai',
    year: '2025',
  },
}

export const projectList: Project[] = Object.values(projects)
