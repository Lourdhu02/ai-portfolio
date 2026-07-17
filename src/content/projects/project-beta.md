# Liquid Glass Design System

## Architecture
A comprehensive design system for the "liquid glass" aesthetic — combining Apple's Liquid Glass visual language with practical glassmorphism implementation patterns for web and social media.

## Tech Stack
- CSS custom properties for token-based theming
- Tailwind CSS v4 with @theme extension
- GSAP for scroll-triggered glass reveals
- HTML/CSS for Instagram card templates

## Implementation
The system defines semantic color tokens (warm neutrals, single accent, gradient pair), typography hierarchy (system UI face + client display face), and motion timing tables. Glass components use backdrop-filter: blur() with saturate boost, layered over gradient backgrounds. The system enforces one-glass-moment-per-view and text-contrast floors.

## Key Features
- Cross-platform (web + Instagram cards)
- Dark/light mode via data-theme attribute
- Accessibility-first (4.5:1 contrast, prefers-reduced-motion)
- Calm 2026 motion language (200-300ms micro-interactions)
- Reference implementations for common glass patterns
