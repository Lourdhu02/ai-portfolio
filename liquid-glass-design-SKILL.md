---
name: liquid-glass-design
description: Design system for the 2026 "liquid glass" aesthetic (Apple's Liquid Glass + glassmorphism) — color tokens, typography, motion timing, and code patterns for building spacedrift's web components and Instagram post cards. Use this whenever building or restyling a landing page, UI component, pitch deck visual, or Instagram post/carousel for spacedrift or its clients — even if the user just says "glass," "frosted," "liquid glass," "modern/premium look," or asks for a post card, without naming the skill directly. Also use when asked to design animations, transitions, or motion for any spacedrift web or social deliverable.
---

# Liquid Glass Design System

A working reference for shipping spacedrift's "liquid glass" visual identity across two surfaces: **web builds** (Next.js/Tailwind/GSAP stack) and **Instagram post cards**. This is a personal design system, not general design theory — for broader aesthetic judgment (composition, restraint, avoiding templated looks), pair this with the `frontend-design` skill. This skill is the *material* (color, type, motion, glass mechanics); `frontend-design` is the *judgment* (composition, risk-taking, critique).

## Core principles (non-negotiable)

1. **Content leads, glass recedes.** Glass panels are containers for content, never the subject. If a panel has nothing interesting behind it, the effect reads as a plain semi-transparent box — always place glass over a gradient, photo, or blurred color shape, never a flat background.
2. **Text never sits directly on raw glass.** Always on a solid or near-solid layer above it. This is an accessibility floor, not a style choice.
3. **One glass moment per view, not everywhere.** Nav bar, or hero card, or modal — pick the element that deserves it. Applying glass to every card in a grid reads as noise and tanks performance.
4. **Motion explains, it doesn't decorate.** Every animation maps to a trigger (user action or state change) → a rule (what changes) → feedback (what the user sees). If you can't state the trigger, cut the animation.
5. **Restraint over spectacle.** 2026's motion consensus is calmer than 2020s glassmorphism — 200–300ms micro-interactions, no bouncy overshoot unless the brand voice is playful. Respect `prefers-reduced-motion` always.

## Color tokens (starting palette — adjust per client brief)

Use semantic roles, not hardcoded hex, so light/dark mode and client rebrands stay cheap:

```css
:root {
  --surface-base: #F0EEE9;      /* warm off-white, not pure #FFF — reduces glare */
  --surface-elevated: #FFFFFF;
  --text-primary: #111114;
  --text-secondary: rgba(17,17,20,0.64);
  --glass-tint: 255,255,255;    /* rgb triplet, used with alpha in glass panels */
  --glass-tint-dark: 10,10,14;  /* for dark-mode glass */
  --accent: #2F6FED;            /* single saturated accent — swap per client */
  --accent-2: #7C5CFF;          /* optional second accent for gradients behind glass */
}
[data-theme="dark"] {
  --surface-base: #0B0B0E;
  --surface-elevated: #16161B;
  --text-primary: #F5F5F7;
  --text-secondary: rgba(245,245,247,0.64);
}
```

Rule of thumb: one warm-neutral base, one confident accent, one gradient pair reserved for whatever sits *behind* glass panels. Don't rebuild the palette per project — swap `--accent` and the gradient pair, keep the neutrals.

## Typography

- One system-first sans for UI (Inter, or SF Pro if Apple-adjacent contexts) for body and controls — 17px/1.5 body floor, don't go smaller for readability.
- One display face used sparingly for hero headlines/post card headlines — this is where personality lives. Pick per client; don't reuse the same display face across unrelated projects.
- Weight, not a second family, carries hierarchy inside the UI face.
- Left-align body text and key alert/CTA moments — centered long-form text reads as generic template.

## Motion timing reference

| Interaction | Duration | Easing |
|---|---|---|
| Hover / button feedback | 120–180ms | ease-out |
| Micro-interaction (like, toggle, checkmark) | 200–300ms | ease-out or spring (light) |
| Panel/modal open | 300–400ms | ease-in-out |
| Page/route transition | 400–600ms | custom cubic-bezier, see references |
| Scroll-triggered reveal | 400–800ms, staggered 60–100ms per item | ease-out |

Full GSAP setup and cubic-bezier values → `references/web-implementation.md`.

## Workflow

**For a web component or landing page:**
1. Confirm what's *behind* the glass (gradient / image / blurred shape) before building the panel — this is the #1 thing people skip.
2. Pull the glass CSS pattern and Tailwind config from `references/web-implementation.md`.
3. Apply motion timing table above; use the GSAP scroll-reveal pattern in the same reference file for entrances.
4. Check: reduced-motion fallback present, `@supports` fallback for `backdrop-filter`, text contrast ≥4.5:1 against the glass surface at its most opaque state.

**For an Instagram post card or carousel:**
1. Read `references/instagram-cards.md` for canvas sizes, safe zones, and the glass-card-over-gradient template.
2. Pick one glass moment per card (usually the headline/quote panel), not the whole frame.
3. Keep caption type at the display face; body/meta text in the UI face.
4. Export flat (no live blur) — glass on static images is simulated with layered semi-transparent shapes + a subtle noise/gradient, not real backdrop-filter (that's web-only).

## Do / Don't

- Do: one accent color, one glass moment, motion with a stated purpose.
- Do: warm off-white over pure white; earth tones or cosmic-gradient pastels as the "something interesting" behind glass.
- Don't: stack multiple blurred panels on one screen — 12–24px blur is the readable range, don't push past 30px.
- Don't: default to bouncy/elastic easing — 2026's motion language is calm, not playful, unless the brand explicitly is.
- Don't: skip the `-webkit-backdrop-filter` prefix — Safari still needs it.

## Reference files

- `references/web-implementation.md` — full CSS glass component, Tailwind config extension, GSAP entrance/scroll snippets, accessibility fallbacks.
- `references/instagram-cards.md` — canvas dimensions, safe zones, glass-card-over-gradient template, caption hierarchy.
