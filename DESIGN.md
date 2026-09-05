# DESIGN.md — HackNEX '26 Design Language & Tokens

## Core Design Philosophy
Anti-Slop, Royal, High-Contrast Cinematic Aesthetic. No generic AI templates, no overused Inter defaults, no muddy gradients.

## 1. Typography System
- **Royal Branding**: `Cinzel` serif (`font-royal font-extrabold tracking-[0.18em] uppercase`). Used for `HACKNEX '26` title, hero headlines, and major section banners.
- **Section Headings**: `Outfit` (`font-heading font-extrabold tracking-tight`).
- **Body & Controls**: `Plus Jakarta Sans` (`font-body text-slate-300`).
- **Technical & Timers**: `JetBrains Mono` (`font-mono text-cyan-400`).

## 2. Color Tokens
- **Background**: Obsidian Void `#05070f` and Pure Black `#000000`.
- **Primary Electric Accent**: Crimson Red `#ff1e42` / `rgba(255, 30, 66, 1)`.
- **Secondary Slate/Silver**: Platinum Slate Gradient `linear-gradient(135deg, #ffffff, #cbd5e1, #94a3b8)`.
- **Gold Award Accent**: Imperial Gold `linear-gradient(135deg, #fef3c7, #fde047, #f59e0b)`.

## 3. Motion & Micro-Interactions
- **Splash Intro**: 4-second letter assembly, shockwave ripple ring, slow WebGL shader animation.
- **Primary CTA Buttons**: Animated glossy sheen beam sweep (`group-hover:translate-x-full`), spring scale lift (`hover:scale-[1.03]`), crimson shadow bloom (`hover:shadow-[0_0_45px_rgba(255,30,66,0.75)]`).
- **Cards & Panels**: Glassmorphism double-bezel panel with backdrop blur (`backdrop-blur-md border-red-500/30`).

## 4. Anti-Slop Deterministic Rules
- **No cards-inside-cards**: Keep visual depth flat with distinct borders.
- **No generic purple-blue gradients**: Stick strictly to Crimson `#ff1e42`, Platinum White, and Imperial Gold.
- **No static pixel gaps**: Use dynamic padding scale (`px-4 sm:px-6 lg:px-8`).
