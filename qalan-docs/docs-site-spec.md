# Qalan DS — Docs / Vitrine site · build spec for Claude Code

> Exemplar reference: **docs.wise.design** (layout, structure, spacing, sections).
> This spec is the source of truth for the build. Execute phase by phase. Do not improvise structure — follow the section order and measurements below.

---

## 0. Mission & hard rules

Build a **static documentation + vitrine site** in the `qalan-assets` repo, matching the Wise Design docs layout. Every component page combines:
- a **live playground** (props → live preview → copy code) — the engineer layer;
- **screenshot-in-context storytelling** with Do/Don't pairs — the designer layer;
- prose guidance sections (when to use, placement, a11y, content, specs).

**Hard rules (do not violate):**
1. **Single source of truth.** `tokens.css`, `base.css`, `fonts/` at repo root are canonical. NEVER redefine a token value or a component's CSS in the docs site. Import/copy them. If a doc page needs a color/space/radius, reference the CSS variable, never a hex literal.
2. **Never edit `tokens.css` from memory.** It is generated from Figma. If a value looks wrong, flag it — do not "fix" it.
3. **Component CSS = `base.css` classes.** Buttons are `.btn .btn--primary .btn--l` etc. The site renders real classes so "copy code" yields working markup. No re-implementation in React/Tailwind.
4. **Stack:** Astro + vanilla JS islands. No Tailwind. No React unless a playground genuinely needs it (vanilla `<script>` is enough — see Button).
5. **Language:** UI text in Russian; filenames, component/class names, code, and layer names in English.
6. **Git:** agent commits with conventional messages (`feat(docs-site): …`); **Alish pushes** via GitHub Desktop. Never push from the agent.
7. **Verification:** after building a page, run it (`npm run dev`) and screenshot-verify with Playwright before declaring done. "Reported ok" ≠ "renders correctly."

---

## 1. Project setup

Location: **`qalan-assets/docs-site/`** (Astro project inside the repo, so it consumes root assets).

```
npm create astro@latest docs-site -- --template minimal --no-install --no-git --typescript strict
cd docs-site && npm install
```

### Single-source asset sync (no duplication)
Tokens/base/fonts live at repo root. Copy them into the site's `public/` at build time via a prebuild script, so there is exactly one source and zero manual drift.

`docs-site/scripts/sync-ds.mjs`:
```js
import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('public/ds/fonts', { recursive: true });
cpSync('../tokens.css', 'public/ds/tokens.css');
cpSync('../base.css',   'public/ds/base.css');
cpSync('../fonts',      'public/ds/fonts', { recursive: true });
console.log('DS assets synced → public/ds/');
```

`package.json` scripts:
```json
{
  "scripts": {
    "predev": "node scripts/sync-ds.mjs",
    "prebuild": "node scripts/sync-ds.mjs",
    "dev": "astro dev",
    "build": "astro build"
  }
}
```

`fonts.css` uses relative `url("HalvarMittel-Rg.woff2")`, which resolves next to itself at `/ds/fonts/fonts.css` → works after copy. Load order in the layout matters: **fonts.css → tokens.css → base.css**.

---

## 2. Global layout — `src/layouts/Docs.astro`

Three columns, Wise-style. Exact measurements (desktop ≥ 1100px):

| Region | Spec |
|---|---|
| Page container | `max-width: 1440px; margin: 0 auto` |
| Grid | `grid-template-columns: 280px minmax(0,1fr) 240px` |
| Left sidebar (component nav) | 280px, sticky, full-height, own scroll, right border 1px `--border-default`, `--bg-surface` |
| Center content | `padding: 56px 64px 140px`; text blocks `max-width: 720px`; cards/grids may use full content width |
| Right TOC (anchors) | 240px, sticky, full-height, left border 1px, scroll-spy active link |
| Below 1100px | hide right TOC, sidebar becomes a top drawer/hamburger |

**Doc-chrome type scale** (uses brand fonts — on web there is NO Inter ceiling; load Platform LC + Halvar via fonts.css):
- Page H1: `--font-display` (Platform LC) Bold, 40/46, letter-spacing −0.02em
- Section H2: `--font-display` Bold, 26/32, `scroll-margin-top: 24px`
- Sub H3: `--font-body` (Halvar) Bold, 17/22
- Body: `--font-body` 16/25, color `--text-secondary`
- Nav/labels/caps: 11–14px

**Doc-chrome spacing rhythm:**
- Section gap (above each H2): 56px
- Element gap inside a section: 16px
- Card padding: 24–40px; card radius `--radius-l` (16px); card border 1px `--border-default`
- Example/stage backgrounds: `--bg-canvas`, with a subtle 16px dot grid for playground/stage

**Theme toggle:** button in sidebar flips `document.documentElement[data-theme]` between `light`/`dark`. Tokens already define both via `:root` and `[data-theme="dark"]`.

**Scroll-spy:** on scroll, the TOC link whose section top ≤ 120px from viewport top gets `.active`.

---

## 3. Navigation data — `src/data/nav.ts`

Single nav source consumed by sidebar + foundations/components index pages. Mark unbuilt pages `status:'soon'`.

```ts
export const nav = {
  foundations: [
    { slug:'colour',     title:'Цвета',        status:'ready' },
    { slug:'typography', title:'Типографика',  status:'ready' },
    { slug:'spacing',    title:'Spacing',      status:'ready' },
    { slug:'radius',     title:'Radius',       status:'ready' },
    { slug:'size',       title:'Size',         status:'ready' },
    { slug:'icons',      title:'Иконки',       status:'soon'  },
    { slug:'motion',     title:'Motion',       status:'soon'  },
  ],
  components: [
    { slug:'button',     title:'Button',       status:'ready' },
    { slug:'list-item',  title:'List Item',    status:'soon'  },
    { slug:'text-field', title:'Text Field',   status:'soon'  },
    { slug:'pill',       title:'Pill',         status:'soon'  },
    { slug:'tabs',       title:'Tabs',         status:'soon'  },
    { slug:'switch',     title:'Switch · Checkbox · Radio', status:'soon' },
    { slug:'top-navigation',    title:'Top Navigation',    status:'soon' },
    { slug:'bottom-navigation', title:'Bottom Navigation', status:'soon' },
  ],
  patterns: [
    { slug:'trainer-block', title:'Trainer Block', status:'soon' },
  ],
};
```

Sidebar groups: **Foundations / Components / Patterns** (uppercase 11px caps labels, `--text-tertiary`). Active link = `--bg-brand` fill, white text. `soon` links: muted, non-clickable, "скоро" pill on the right.

---

## 4. Foundations — generated from `tokens.css`

Foundations are **not hand-written**; they read the real tokens and render them. Build a small parser util `src/lib/tokens.ts` that fetches `/ds/tokens.css` text and extracts `--name: value` pairs (resolve `var(--x)` references to final hex for display).

Foundation page template `src/layouts/Foundation.astro`: hero (H1 + lead) → content sections with anchors + right TOC, same chrome as component pages.

Pages to build (Phase 2):

- **Цвета (`colour`)** — render swatch grids:
  - Primitives: brand / orange / graphit / red / green / yellow / purple, each as a 10-step ramp (swatch + token name + hex).
  - Semantic: two columns Light vs Dark (`--bg-*`, `--text-*`, `--border-*`) — swatch + token name + resolved value, switching with the theme toggle.
- **Типографика (`typography`)** — two families: **Platform LC** (`--font-display`, headings) and **Halvar Mittelschrift** (`--font-body`). Show the live scale used in `base.css` (e.g. h-l 32/38, h-m 28/34, body 18/23, etc.) — each row: live specimen + name + size/line-height.
- **Spacing (`spacing`)** — `--space-*` ramp: visual bar at each value + token + px.
- **Radius (`radius`)** — `--radius-*`: a swatch box rounded at each radius + token + px.
- **Size (`size`)** — `--size-control-*` (30/40/58/64): control-height bars + token + px.

---

## 5. Component page template (canonical)

Port the already-built `button.html` exemplar into `src/pages/components/button.astro` as the **canonical template**. Every component page follows this exact section order. Omit a section only if genuinely N/A.

**Section order + anchors (right TOC mirrors this):**
1. **Hero** — H1 + one-line lead + pills (Platform · Status · Обновлено). *(not in TOC)*
2. `#playground` **Песочница** — live preview on dot-grid stage + segmented controls (every prop axis) + icon/text toggles → live preview. Below: dark code block with auto-generated, copy-pasteable markup using real `base.css` classes + **Copy** button. *(engineer layer)*
3. `#when` **Когда использовать** — Use / Don't use, short bullets.
4. `#types` **Типы и приоритет** — live example card per type + caption; then a Do/Don't **screenshot pair** (vitrine).
5. `#sizes` **Размеры** — live example per size + caption.
6. `#icons` **Иконки** (accessories) — rules + live left/right examples.
7. `#anatomy` **Анатомия** — live component + numbered callouts.
8. `#variants` **Все варианты** — full reference matrix (size × type × state), live instances.
9. `#usage` **Использование в контексте** — grid of real **App screenshots** with Do/Don't tags. *(designer layer — see §6)*
10. `#placement` **Размещение** — prose.
11. `#a11y` **Доступность** — prose.
12. `#content` **Контент** — copy rules.
13. `#specs` **Характеристики** — property/value table.
14. `#availability` **Платформы** — iOS / Android / Web table.

The playground + variant grid logic is vanilla JS already written in `button.html` — reuse it inside an Astro `<script>`. Pull the canonical chrome CSS into `src/styles/docs.css` (doc-chrome only; component visuals come from `base.css`).

---

## 6. Screenshots-in-context (the vitrine layer)

Per component: `src/pages/components/<slug>/screenshots/` holds real PNG exports from the **App Figma file**. A `<Shot>` component renders image + Do/Don't tag + caption; until an export exists it shows a labeled dashed placeholder (as in `button.html` now).

Button needs 4 real exports (already identified in the App file — Alish to export):
- Profile / Invite — full-width Primary CTA
- CTA Dock — Primary + Secondary stacked
- Shop (Dr Axi ability) — Tertiary in card
- Analytics Journal — Text-critical / control

Export at 2× from the App file, drop into the screenshots folder, replace the placeholder `src`.

---

## 7. Build order (phases)

- **Phase 1 — Skeleton + Button.** Scaffold Astro, sync script, `Docs.astro` layout (3-col, sticky, scroll-spy, theme toggle), `nav.ts`, sidebar + both index pages, and port `button.html` → `button.astro`. Verify with Playwright. Commit `feat(docs-site): scaffold + layout + Button page`.
- **Phase 2 — Foundations.** `tokens.ts` parser + Colour, Typography, Spacing, Radius, Size pages. Commit per page.
- **Phase 3 — Components rollout.** From `kit.html`, build the remaining component pages on the canonical template: List Item, Text Field, Pill, Tabs, Switch/Checkbox/Radio, Top/Bottom Navigation, Trainer Block. Each: real `base.css` classes, playground where it has prop axes, variant matrix, screenshot slots. Commit per component.
- **Phase 4 — Polish.** Search, mobile drawer, prev/next, deploy (GitHub Pages or Vercel).

---

## 8. Definition of done (per page)
- Renders with real Platform LC + Halvar (fonts load from `/ds/fonts/`).
- All visuals come from `base.css` classes; zero hardcoded component CSS; zero hardcoded token values.
- Playground copy-code produces markup that, pasted into a page with tokens.css+base.css, renders identically.
- Right TOC + scroll-spy works; light/dark toggle works.
- Playwright screenshot reviewed against the Figma doc page for that component.
