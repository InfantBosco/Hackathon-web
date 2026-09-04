# HACKNEX 2026 — FRONTEND DESIGN SYSTEM & COMPONENT SPECIFICATION

**Project**: HackNEX 2026  
**Document Version**: 1.0  
**Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React  

---

## 1. DESIGN PHILOSOPHY

The HackNEX design system is built to feel **futuristic, technical, modern, and dark**, reflecting the identity of Karunya's flagship 3-day hackathon powered by NEXUS Club.

Key Design Principles:
* **High Contrast Dark Aesthetics**: Dark background (`#05070f`) paired with high-contrast slate text and electric cyan/purple accents.
* **Component Reusability**: Primitive UI components with single responsibility, typed props, and zero hardcoded page logic.
* **Responsive Precision**: Fluid mobile-first to ultra-wide grid scalability (320px to 1920px).
* **Accessibility First**: WCAG-oriented keyboard focus management, semantic markup, and native `prefers-reduced-motion` support.
* **Controlled Visual Depth**: Backdrop blur glassmorphism and subtle neon border glows used purposefully without performance degradation.

---

## 2. DESIGN TOKENS

### Color Tokens
```css
--color-bg-primary: #05070f;
--color-bg-secondary: #0a0d1a;
--color-surface: #111628;
--color-surface-elevated: #182038;
--color-surface-glass: rgba(17, 22, 40, 0.7);

--color-border: #212c4b;
--color-border-subtle: #172036;

--color-text-primary: #f8fafc;
--color-text-secondary: #94a3b8;
--color-text-muted: #64748b;

--color-accent-cyan: #00f0ff;
--color-accent-purple: #9d4edd;
--color-accent-pink: #ff007f;
--color-accent-blue: #3a86ff;
```

### Typography Hierarchy
| Role | Font Family | Size | Usage |
| :--- | :--- | :--- | :--- |
| **Display / Hero** | `Outfit` (sans-serif) | 48px – 64px | Hero headline, stats numbers |
| **Section Title (H2)**| `Outfit` (sans-serif) | 30px – 48px | Section headers |
| **Card Title (H3/H4)**| `Outfit` (sans-serif) | 18px – 24px | Card & widget headings |
| **Body Large / Body** | `Inter` (sans-serif) | 14px – 18px | Paragraphs, descriptions |
| **Technical / Code** | `JetBrains Mono` (monospace)| 12px – 14px | Badges, code snippets, dates |

### Spacing & Border Radius
* **Spacing Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px.
* **Radius Scale**:
  - `xs`: 4px
  - `sm`: 6px
  - `md`: 10px
  - `lg`: 16px
  - `xl`: 24px
  - `full`: 9999px

---

## 3. COMPONENT INVENTORY

| Component | Category | Purpose & Description |
| :--- | :--- | :--- |
| **Container** | Layout | Enforces responsive max-width (`max-w-7xl`) & horizontal padding |
| **Section** | Layout | Section container supporting primary, secondary, glass, and gradient background variants |
| **SectionHeader** | Layout | Reusable section title with badge, heading, and subtitle |
| **Logo** | Branding | Official SVG/Component for HackNEX and NEXUS Club branding |
| **LoadingScreen** | Loading | Video wrapper component for `loadingscreen.mp4` with transition support |
| **Button** | Primitive UI | Primary, Secondary, Ghost, Outline, and Danger actions with loading spinners & motion |
| **Card** | Primitive UI | Standard and hover-glow content cards |
| **GlassCard** | Primitive UI | Backdrop-blur glassmorphism panels (`glass-panel`) with cyan/purple border glows |
| **Badge** | Primitive UI | Category, status (`Registration Open`, `Winner`), and outline tags |
| **Input** | Form Primitive | Accessible text input with label, left/right icons, and error message slots |
| **Textarea** | Form Primitive | Accessible multi-line text input |
| **Select** | Form Primitive | Dropdown select input |
| **Checkbox** | Form Primitive | Boolean checkbox input |
| **RadioGroup** | Form Primitive | Selectable radio group with title and descriptions |
| **Switch** | Form Primitive | Toggle switch component |
| **Modal** | Interactive | Accessible dialog with focus management, backdrop blur, and ESC key handler |
| **ToastContainer** | Interactive | Floating toast notification container (Success, Error, Warning, Info) |
| **Accordion** | Interactive | Expandable/collapsible FAQ accordion |
| **Timeline** | Interactive | Vertical event schedule timeline |
| **Counter** | Interactive | Animated count-up component with static fallback for reduced motion |
| **BentoGrid** | Layout | Responsive 3-column asymmetric feature grid |
| **Image** | Media | Optimized image component with loading skeleton and error fallback |
| **Spinner** | Feedback | Loading spinner indicator |
| **Skeleton** | Feedback | Animated pulse loading placeholder |
| **ErrorBoundary** | Feedback | Component error boundary preventing app crashes |
| **BackToTop** | Navigation | Smooth scroll-to-top floating action button |
| **GridBackground** | Background | Cyber grid pattern overlay with ambient glow Orbs |
| **NeuralNoise** | Background | Lightweight HTML5 canvas particle mesh inspired by 21st.dev |

---

## 4. RESPONSIVE BREAKPOINT SPECIFICATION

| Breakpoint | Width | Behavior |
| :--- | :--- | :--- |
| `Mobile (sm)` | 320px – 640px | Single-column cards, stacked CTAs, full-width inputs, 32px section padding |
| `Tablet (md)` | 641px – 1024px | 2-column grids, inline header layout, medium typography scaling |
| `Desktop (lg)`| 1025px – 1440px | 3-column Bento grid, max-w-7xl container, full desktop navigation space |
| `Ultra-Wide` | 1441px+ | Centered container max-w-7xl, non-stretching grid bounds |

---

## 5. ACCESSIBILITY & REDUCED MOTION

1. **Reduced Motion**: All animations and particle systems check `window.matchMedia('(prefers-reduced-motion: reduce)')`. When active, animations are set to 0.01ms and static counters are rendered instantly.
2. **Keyboard Navigation**: Buttons, Modals, Inputs, and Accordions respond to standard `Tab`, `Space`, `Enter`, and `Escape` keys.
3. **Contrast Compliance**: Text colors (`#f8fafc`, `#94a3b8`) satisfy WCAG AA contrast standards against dark surfaces.
