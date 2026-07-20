import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Machine Learning Engineer</p>
      <h1 className="text-5xl font-semibold tracking-tight leading-tight md:text-6xl">
        Lourdu Raju
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-text-secondary max-w-xl">
        Building production GenAI, NLP, and Computer Vision systems at scale. 
        Currently architecting Transformer-based OCR pipelines at Sujanix.
      </p>
      <div className="mt-8 flex items-center gap-6 text-sm text-text-tertiary">
        <span>Bengaluru, India</span>
        <span className="w-px h-4 bg-border" />
        <a href="mailto:b.lourdhuraju1234@gmail.com" className="hover:text-text transition-colors duration-150">
          Email
        </a>
        <a href="https://linkedin.com/in/lourdhu" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
          LinkedIn
        </a>
        <a href="https://github.com/Lourdhu02" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
          GitHub
        </a>
      </div>
    </section>
  )
}

function Work() {
  const projects = [
    {
      title: 'Transformers-OCR',
      subtitle: 'Industrial OCR at 97% accuracy',
      description: 'Transformer-based OCR pipeline using SVTR backbone, custom FocalCTCLoss, and ONNX INT8 quantization for edge deployment.',
      tags: ['PyTorch', 'ONNX', 'AWS Lambda', 'FastAPI'],
      link: '/projects/transformers-ocr',
    },
    {
      title: 'ECHOME',
      subtitle: 'Cognitive Mirror Engine',
      description: 'Autonomous agentic AI with three-tier memory architecture, CAT/IRT psychometric models, and zero-shot voice cloning.',
      tags: ['LangGraph', 'XTTSv2', 'Psychometrics'],
      link: '/projects/echome',
    },
    {
      title: 'FinSentinelAI',
      subtitle: 'Privacy-First Enterprise RAG',
      description: 'Production-grade RAG platform with local LLMs, hybrid retrieval, and JWT-based multi-tenant session isolation.',
      tags: ['Ollama', 'ChromaDB', 'Vision-Language Models'],
      link: '/projects/finsentinelai',
    },
  ]

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Selected Work</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-16">Projects</h2>
        <div className="space-y-12">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="group block -mx-6 px-6 py-6 -my-6 rounded-lg transition-colors duration-150 hover:bg-surface-alt"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="text-sm text-text-tertiary group-hover:text-text-secondary transition-colors duration-150">
                  View →
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-3">{project.subtitle}</p>
              <p className="text-sm leading-relaxed text-text-secondary mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-text-tertiary bg-surface-alt px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Background</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-8">About</h2>
        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Machine Learning Engineer with 2 years of experience building production GenAI, NLP, and Computer Vision systems at scale. 
            Specialized in agentic AI, low-latency model serving, and full-stack ML deployment.
          </p>
          <p>
            Currently at Sujanix Private Limited, architecting Transformer-based OCR pipelines for government utility automation — 
            improving exact-match accuracy from 82.74% to 97.04% with custom loss functions and INT8 quantized deployment.
          </p>
          <p>
            Previously founded SpaceDrift, an MSME-registered sole proprietorship delivering engineering project builds, 
            data annotation services, and research support. Shipped ECHOME and FinSentinelAI as flagship products.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wide mb-6">Experience</h3>
          <div className="space-y-8">
            <div className="border-l-2 border-border pl-6">
              <p className="text-sm text-text-tertiary">Jan 2026 — Present</p>
              <p className="font-medium mt-1">Machine Learning Engineer</p>
              <p className="text-sm text-text-secondary">Sujanix Private Limited · Bengaluru</p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <p className="text-sm text-text-tertiary">Aug 2024 — Dec 2025</p>
              <p className="font-medium mt-1">Founder</p>
              <p className="text-sm text-text-secondary">SpaceDrift · Bengaluru</p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <p className="text-sm text-text-tertiary">Feb 2024 — Apr 2024</p>
              <p className="font-medium mt-1">Data Science Intern</p>
              <p className="text-sm text-text-secondary">BrainOvision Solutions · Hyderabad</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wide mb-6">Education</h3>
          <div className="border-l-2 border-border pl-6">
            <p className="text-sm text-text-tertiary">May 2024</p>
            <p className="font-medium mt-1">B.Tech in Computer Science and Engineering</p>
            <p className="text-sm text-text-secondary">Andhra Loyola Institute of Engineering and Technology · Vijayawada</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wide mb-6">Certifications</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>Kaggle Expert (Notebooks tier)</li>
            <li>Machine Learning Specialization — DeepLearning.AI / Stanford</li>
            <li>NPTEL — Data Science using Python (IIT Madras)</li>
            <li>Microsoft Power BI Data Analyst Professional Certification</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const categories = [
    {
      name: 'Languages & CS',
      skills: ['Python', 'SQL', 'C++', 'Bash', 'Data Structures & Algorithms', 'ML System Design'],
    },
    {
      name: 'ML / Deep Learning',
      skills: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'scikit-learn', 'NumPy', 'Pandas', 'OpenCV', 'XGBoost'],
    },
    {
      name: 'GenAI & LLM',
      skills: ['LangChain', 'LangGraph', 'LlamaIndex', 'Ollama', 'vLLM', 'LoRA Fine-tuning', 'Prompt Engineering', 'Agentic Systems'],
    },
    {
      name: 'RAG & Vector Search',
      skills: ['Hybrid Retrieval', 'Dense Embeddings', 'Reranking', 'ChromaDB', 'Qdrant', 'Pinecone', 'FAISS'],
    },
    {
      name: 'Computer Vision & NLP',
      skills: ['ViT', 'YOLO', 'CLIP', 'OCR (CRNN, SVTR)', 'PaddleOCR', 'BERT', 'RoBERTa', 'T5', 'spaCy', 'NLTK'],
    },
    {
      name: 'MLOps & Cloud',
      skills: ['ONNX', 'TensorRT', 'FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'W&B', 'AWS (SageMaker, Lambda, S3)', 'GCP Vertex AI'],
    },
  ]

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Capabilities</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-16">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wide mb-4">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="text-sm text-text-secondary">
                    {skill}
                    {skill !== cat.skills[cat.skills.length - 1] && <span className="text-text-tertiary ml-2">·</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Get in Touch</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-8">Contact</h2>
        <p className="text-text-secondary leading-relaxed mb-8">
          Interested in working together or have a question? 
          Reach out directly or send a message.
        </p>
        <div className="space-y-4">
          <a
            href="mailto:b.lourdhuraju1234@gmail.com"
            className="block text-lg font-medium hover:text-text-secondary transition-colors duration-150"
          >
            b.lourdhuraju1234@gmail.com
          </a>
          <a
            href="tel:+919959594460"
            className="block text-lg font-medium hover:text-text-secondary transition-colors duration-150"
          >
            +91 99595 94460
          </a>
        </div>
        <div className="mt-8 flex items-center gap-6 text-sm text-text-tertiary">
          <a href="https://linkedin.com/in/lourdhu" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
            LinkedIn
          </a>
          <a href="https://github.com/Lourdhu02" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
            GitHub
          </a>
          <a href="https://kaggle.com/blourdhuraju" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-150">
            Kaggle
          </a>
        </div>
      </div>
    </section>
  )
}
