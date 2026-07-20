import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Transformers-OCR — Lourdu Raju',
  description: 'Industrial OCR achieving 97% exact-match accuracy via SVTR backbone, custom FocalCTCLoss, and ONNX INT8 quantization.',
}

export default function TransformersOCR() {
  return (
    <article className="pt-24 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/" className="text-sm text-text-tertiary hover:text-text transition-colors duration-150 mb-12 inline-block">
          ← Back
        </Link>
        
        <header className="mb-16">
          <p className="mb-4 text-sm tracking-wide text-text-tertiary uppercase">Case Study</p>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight md:text-5xl mb-4">
            Transformers-OCR
          </h1>
          <p className="text-lg text-text-secondary">
            Industrial OCR achieving 97% exact-match accuracy via transformer architecture and edge-optimized deployment.
          </p>
        </header>

        <div className="prose text-text-secondary">
          <h2>Problem</h2>
          <p>
            Government utility systems rely on digitizing handwritten and printed meter readings at scale. 
            Existing OCR solutions struggled with character-class imbalance, motion-blur, and low-contrast environments — 
            achieving only 82.74% exact-match accuracy on production datasets.
          </p>

          <h2>Approach</h2>
          <p>
            Built a Transformer-based OCR pipeline using SVRT (a Swin-V2-based regression transformer) as the backbone. 
            The system processes meter images through a custom Feature Rearrangement Module (FRM) that restructures 
            spatial features for optimal sequence modeling.
          </p>

          <h3>Custom Loss Function</h3>
          <p>
            Designed FocalCTCLoss — a combination of focal loss with CTC decoding — to handle severe character-class 
            imbalance. This stabilized training and reduced run-to-run variance across multiple seeds.
          </p>

          <h3>Semantic Guidance</h3>
          <p>
            Added Semantic Guidance Modules to improve robustness in motion-blur and low-contrast environments. 
            The module injects semantic priors during inference to maintain accuracy under degraded input conditions.
          </p>

          <h2>Results</h2>
          <ul>
            <li>Exact-match accuracy improved from 82.74% to 97.04%</li>
            <li>INT8 ONNX quantization for edge deployment</li>
            <li>30% reduction in inference cost</li>
            <li>99.9% uptime on AWS Lambda + FastAPI stack</li>
          </ul>

          <h2>Tech Stack</h2>
          <ul>
            <li><strong>Model:</strong> SVTR (Swin-V2 backbone), Custom FRM, FocalCTCLoss</li>
            <li><strong>Deployment:</strong> ONNX INT8, AWS Lambda, FastAPI, Docker</li>
            <li><strong>Training:</strong> PyTorch, custom data pipeline</li>
            <li><strong>Monitoring:</strong> Production monitoring from labeling spec to deployment</li>
          </ul>

          <h2>Impact</h2>
          <p>
            Deployed for government utility automation, processing meter readings at production scale. 
            Owned the full lifecycle from labeling specification to production monitoring. 
            The pipeline now serves as the core OCR engine for automated billing systems.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <a
            href="https://github.com/Lourdhu02/transformers-ocr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text transition-colors duration-150"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </article>
  )
}
