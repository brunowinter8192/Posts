# src/utils/

## Role
Small stateless helpers shared across components/layouts/pages. Add here only when 2+ call sites need the same logic.

## Modules

### url.ts (3 LOC)

**Purpose:** exports `BASE` — `import.meta.env.BASE_URL` normalized without a trailing slash, for building internal hrefs under the GitHub Pages `/Posts` base.
**Reads:** `import.meta.env.BASE_URL` (Astro build-time env, derived from `astro.config.mjs`'s `base`).
**Writes:** nothing.
**Called by:** `src/components/BaseHead.astro`, `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`, `src/layouts/Article.astro`, `src/pages/index.astro`, `src/pages/404.astro`, `src/pages/[section]/index.astro`.
**Calls out:** none.

### domElement.ts (7 LOC)

**Purpose:** two DOM one-liners — `toggleClass`, `rootInDarkMode`.
**Reads:** `document.documentElement` (dark-mode check).
**Writes:** toggles a CSS class on a passed element.
**Called by:** `src/components/layout/Header.astro` (mobile menu), `src/components/ThemeToggle.astro`.
**Calls out:** none.

---

## Gotchas
- Every internal `href` in this project MUST go through `BASE` — a bare `/path` link silently 404s once deployed under `/Posts` (only surfaces after a real Pages deploy, not in `astro dev` at root).
