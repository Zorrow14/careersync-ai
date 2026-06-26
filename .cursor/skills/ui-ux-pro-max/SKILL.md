---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web and mobile. Searchable database of 80+ UI styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 17 tech stacks (React, Next.js, Vue, Svelte, Astro, SwiftUI, React Native, Flutter, Nuxt, Tailwind, shadcn/ui, Jetpack Compose, Three.js, Angular, Laravel, JavaFX, HTML/CSS). Use when planning, building, designing, implementing, reviewing, fixing, improving, or refactoring any UI/UX: pages (landing, dashboard, admin, SaaS, e-commerce, portfolio, blog, mobile app), components (button, modal, navbar, sidebar, card, table, form, chart), or design decisions (color systems, typography, font pairing, spacing, layout, animation, accessibility, dark mode, interaction states, shadows, gradients). Styles include glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, and flat design."
---

# UI/UX Pro Max — Design Intelligence

A searchable design knowledge base. Query the bundled Python tool to get evidence-based recommendations (styles, color palettes, typography, UX rules, charts, stack guidelines) before writing UI code.

## When to Apply

Use this skill whenever the task changes how a feature **looks, feels, moves, or is interacted with**:

- Designing new pages or screens (landing, dashboard, admin, SaaS, e-commerce, mobile app)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts, navigation)
- Choosing color schemes, typography, spacing, or layout systems
- Reviewing UI for accessibility, usability, or visual consistency
- Implementing animations, responsive behavior, or dark mode

**Skip** for pure backend logic, API/database design, DevOps, or non-visual scripts.

## Prerequisites

The search tool requires Python. Check:

```powershell
python --version
```

If missing on Windows: `winget install Python.Python.3.12`. On this machine use `python` (not `python3`).

## Workflow

### Step 1 — Analyze the request

Identify: product type (e.g. SaaS, e-commerce, portfolio), target audience, style keywords (minimal, playful, dark, content-first), and target stack.

### Step 2 — Generate a design system (start here)

Always begin with `--design-system` for full, reasoned recommendations (pattern, style, colors, typography, effects, and anti-patterns):

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "<product> <industry> <keywords>" --design-system -p "Project Name"
```

Example:

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "ai recruiting saas dashboard professional" --design-system -p "CareerSync"
```

Output formats: ASCII box (default) or `-f markdown` for docs.

#### Optional — persist across sessions

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

This writes `design-system/MASTER.md` (global source of truth) and `design-system/pages/<page>.md` (per-page overrides). When building a page, read the page file if it exists; otherwise use `MASTER.md`.

### Step 3 — Deep-dive specific domains (as needed)

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Domain | Use for |
|--------|---------|
| `product` | Product-type style recommendations |
| `style` | UI styles, effects (glassmorphism, minimalism, dark mode, brutalism) |
| `color` | Color palettes / semantic tokens by product type |
| `typography` | Font pairings |
| `google-fonts` | Individual Google Font lookup |
| `landing` | Landing page structure, CTA strategy |
| `chart` | Chart-type selection + library + accessibility |
| `ux` | UX best practices and anti-patterns (accessibility, animation, forms, navigation) |
| `icons` | Icon recommendations (use SVG icon sets, never emoji) |
| `react` | React / Next.js performance patterns |
| `web` | App-interface a11y (ARIA, focus, touch targets, safe areas) |

### Step 4 — Stack-specific guidance

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

Available stacks: `react`, `nextjs`, `vue`, `svelte`, `astro`, `swiftui`, `react-native`, `flutter`, `nuxtjs`, `nuxt-ui`, `html-tailwind`, `shadcn`, `jetpack-compose`, `threejs`, `angular`, `laravel`, `javafx`.

> This repo's `client/` is a React + Vite web app — prefer `--stack react` (and `--stack shadcn` / `--stack html-tailwind` where relevant).

## Query Tips

- Combine dimensions: `"saas analytics professional content-dense"`, not just `"app"`.
- If unsure, re-run `--design-system` with different keywords.
- Run a final UX pass before delivery: `--domain ux "accessibility animation loading z-index"`.

## Non-Negotiable Review Checklist

Before delivering UI, verify:

- Color contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text); never rely on color alone.
- Visible focus states; full keyboard navigation; descriptive labels for icon-only controls.
- Touch targets ≥ 44×44px with ≥ 8px spacing.
- SVG icons from one consistent set — never emoji as structural icons.
- Mobile-first, no horizontal scroll, 16px+ body text, viewport zoom not disabled.
- Semantic color tokens (no raw hex in components); design light + dark together.
- Animations 150–300ms, `transform`/`opacity` only, respect `prefers-reduced-motion`.
- Forms: visible labels, inline validation on blur, errors next to the field, clear recovery.

For details on any item, query `--domain ux` (or `--domain web` for app a11y).
