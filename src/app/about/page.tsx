'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { pageVariants, staggerContainer, pressTap, pageEase } from '@/lib/motion'
import { loadGSAP } from '@/lib/dynamic-gsap'

const experience = [
  {
    period: 'Jan 2026 - Present',
    role: 'Machine Learning Engineer',
    company: 'Sujanix Private Limited',
    location: 'Bengaluru, India',
    highlights: [
      'Architected Transformer-based OCR using SVTR for government utility automation; improved exact-match accuracy from 82.74% to 97.04%',
      'Designed a custom FocalCTCLoss combining focal loss with CTC decoding to handle severe character-class imbalance',
      'Added Semantic Guidance Modules for robustness in motion-blur and low-contrast environments',
      'Deployed via INT8 ONNX on AWS Lambda + FastAPI behind a Docker-based serving stack; reduced inference cost 30% at 99.9% uptime',
    ],
  },
  {
    period: 'Aug 2024 - Dec 2025',
    role: 'Founder',
    company: 'SpaceDrift (MSME-registered)',
    location: 'Bengaluru, India',
    highlights: [
      'Founded and operated an MSME-registered sole proprietorship delivering engineering project builds, data annotation services, and research support',
      'Shipped ECHOME and FinSentinelAI as flagship demonstrations across NLP, Computer Vision, and RAG',
      'Integrated CAT / IRT psychometric models with Fisher Information maximization for adaptive assessment; reduced assessment time 70%',
      'Engaged 3 paid contractors per-project; owned customer scoping, pricing, delivery, and communication independently',
    ],
  },
  {
    period: 'Feb 2024 - Apr 2024',
    role: 'Data Science Intern',
    company: 'BrainOvision Solutions',
    location: 'Hyderabad, India',
    highlights: [
      'Improved forecasting accuracy by 15% using ensemble gradient boosting with structured feature engineering',
      'Conducted EDA on multi-million-row datasets and surfaced 3 prioritized business actions adopted by the analytics team',
    ],
  },
]

const skillCategories = [
  {
    name: 'Languages & CS',
    skills: ['Python', 'SQL', 'C++', 'Bash', 'Data Structures & Algorithms', 'ML System Design', 'OOP', 'Operating Systems', 'Computer Networks', 'DBMS'],
  },
  {
    name: 'ML & Deep Learning',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'scikit-learn', 'NumPy', 'Pandas', 'OpenCV', 'XGBoost'],
  },
  {
    name: 'GenAI & LLM',
    skills: ['LangChain', 'LangGraph', 'LlamaIndex', 'Ollama', 'vLLM', 'OpenAI / Anthropic / Groq APIs', 'LoRA Fine-tuning', 'Prompt Engineering', 'Function Calling', 'Agentic Systems'],
  },
  {
    name: 'RAG & Vector Search',
    skills: ['Hybrid Retrieval', 'Dense Embeddings', 'Reranking', 'Semantic Search', 'ChromaDB', 'Qdrant', 'Pinecone', 'FAISS', 'sentence-transformers'],
  },
  {
    name: 'Computer Vision & NLP',
    skills: ['ViT', 'YOLO', 'CLIP', 'OCR (CRNN, SVTR, PaddleOCR)', 'BERT', 'RoBERTa', 'T5', 'spaCy', 'NLTK'],
  },
  {
    name: 'MLOps & Cloud',
    skills: ['ONNX', 'TensorRT', 'INT8 Quantization', 'FastAPI', 'REST / gRPC', 'Docker', 'Kubernetes', 'MLflow', 'W&B', 'AWS (EC2, Lambda, S3, SageMaker)', 'GCP (Vertex AI)', 'PostgreSQL', 'MongoDB', 'Redis', 'GitHub Actions', 'CI/CD'],
  },
]

const certifications = [
  'Kaggle Expert (Notebooks tier) — active contributor on deep learning competitions',
  'Machine Learning Specialization — DeepLearning.AI / Stanford',
  'NPTEL — Data Science using Python (IIT Madras)',
  'Microsoft Power BI Data Analyst Professional Certification',
]

function SkillAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div className="flex flex-col">
      {skillCategories.map((cat, i) => {
        const isOpen = openIndex === i
        return (
          <div key={cat.name} className="border-t border-border first:border-t-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-5 px-0 text-left group"
            >
              <div className="flex items-center gap-6">
                <span className={`font-mono text-xs tabular-nums transition-colors duration-150 ${isOpen ? 'text-accent' : 'text-text-tertiary'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-unica text-title font-semibold tracking-tight text-text">
                  {cat.name}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="font-mono text-sm text-text-tertiary"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-bg-alt/50 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: pageEase }}
                  />
                  <div className="relative pb-6 pl-0 flex flex-wrap gap-2">
                    {cat.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={reduceMotion ? false : { y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: reduceMotion ? 0 : si * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="font-mono text-[11px] text-text-secondary border border-border px-2.5 py-1 bg-bg-alt/60"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function About() {
  const reduceMotion = useReducedMotion() ?? false
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    async function init() {
      const { gsap, ScrollTrigger } = await loadGSAP()

      ctx = gsap.context(() => {
        // Timeline line scrub
        if (lineRef.current && !reduceMotion) {
          ScrollTrigger.create({
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            onUpdate: (self) => {
              const el = lineRef.current
              if (el) gsap.set(el, { scaleY: self.progress })
            },
          })
        }


      }, timelineRef)
    }

    init()
    return () => ctx?.revert()
  }, [reduceMotion])

  return (
    <div className="bg-bg">
      <motion.section
        className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-16 md:pt-36 md:pb-20"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-4xl">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
            01 — Background
          </p>
          <h1 className="font-unica text-display font-semibold tracking-tight text-text mb-4">
            About
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-2xl text-lg">
            ML Engineer building production systems in GenAI, NLP, and Computer Vision. Currently
            at Sujanix, previously founded SpaceDrift.
          </p>
        </div>
      </motion.section>

      {/* Snapshot */}
      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div>
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                Snapshot
              </p>
              <div className="space-y-4 text-text-secondary leading-[1.72]">
                <p>
                  I like the parts of ML engineering that never make it into demo videos: data
                  contracts, inference budgets, observability, and the small design details that
                  keep systems calm under pressure.
                </p>
                <p>
                  My work tends to sit where research meets production. The goal is not just a
                  clever model, but a system people can actually use and trust.
                </p>
              </div>
            </motion.div>

            <motion.div className="grid gap-4">
              <div>
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-2">Focus</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Agentic AI, OCR, RAG, low-latency serving, and practical ML systems.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-2">Style</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Clear interfaces, compact layouts, and motion that helps orientation instead of
                  calling attention to itself.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={timelineRef} className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-6">
            02 — Experience
          </p>

          <div className="relative pl-8 md:pl-10">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 w-px h-full bg-border origin-top">
              <div
                ref={lineRef}
                className="w-full h-full bg-accent origin-top"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            <div className="flex flex-col gap-16">
              {experience.map((exp) => (
                <div key={exp.period} data-role-entry className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[17px] md:-left-[21px] top-[3px] w-2 h-2 bg-accent" />

                  <div className="pl-4 md:pl-6">
                    <p data-role-date className="font-mono text-xs text-accent mb-2">
                      {exp.period}
                    </p>
                    <h2 data-role-title className="font-unica text-title font-semibold tracking-tight text-text mb-1">
                      {exp.role}
                    </h2>
                    <p className="font-mono text-xs text-text-tertiary mb-4">
                      {exp.company} — {exp.location}
                    </p>
                    <div className="flex flex-col gap-2">
                      {exp.highlights.map((h) => (
                        <p key={h} data-role-bullet className="text-sm text-text-secondary leading-[1.72] pl-4 border-l border-border">
                          {h}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Accordion */}
      <section className="border-t border-border bg-bg-alt/30">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-6">
            03 — Capabilities
          </p>
          <SkillAccordion />
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="border-t border-border">
        <div className="w-full px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <motion.div
            className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div>
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                04 — Education
              </p>
              <p className="font-medium text-text">B.Tech in Computer Science and Engineering</p>
              <p className="text-sm text-text-secondary mt-2">
                Andhra Loyola Institute of Engineering and Technology — Vijayawada
              </p>
            </motion.div>

            <motion.div>
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-4">
                Certifications
              </p>
              <div className="flex flex-col gap-2">
                {certifications.map((cert, i) => (
                  <div key={cert} className="flex items-start gap-3 text-sm text-text-secondary leading-[1.72]">
                    <span className="font-mono text-xs text-text-tertiary tabular-nums shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
             className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-unica text-lg font-semibold tracking-tight text-text">
                Open to the right kind of work
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Research-minded ML, applied AI systems, and product work that benefits from careful
                engineering.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 bg-text text-bg-dark text-sm font-medium"
            >
              Start a conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
