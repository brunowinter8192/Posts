# src/components/

## Role
Shared, page-independent UI primitives used across layouts. Touch this for head/meta, skip-link, or dark-mode toggle behavior. Nav-specific components (Header/Footer) live in `layout/` (see its DOCS.md), not here.

## Public Interface
No `index.ts` — each `.astro` file is imported directly by path (`@/components/<Name>.astro`).

## Modules

### BaseHead.astro (45 LOC)

**Purpose:** `<head>` meta tags — title, canonical URL, OG/Twitter cards, favicon; imports `global.css`.
**Reads:** `Astro.props` (`SiteMeta`), `Astro.url`, `Astro.site`, `siteConfig`.
**Writes:** nothing (renders head markup).
**Called by:** `src/layouts/Base.astro`.
**Calls out:** none beyond Astro runtime.

### SkipLink.astro (3 LOC)

**Purpose:** accessibility skip-to-content anchor.
**Reads:** nothing.
**Writes:** nothing.
**Called by:** `src/layouts/Base.astro`.
**Calls out:** none.

### ThemeProvider.astro (43 LOC)

**Purpose:** inline, parser-blocking script that sets `data-theme` on `<html>` before paint (avoids FOUC) and listens for `theme-change` events + system preference changes.
**Reads:** `localStorage.theme`, `prefers-color-scheme` media query.
**Writes:** `localStorage.theme`, `document.documentElement[data-theme]`.
**Called by:** `src/layouts/Base.astro`.
**Calls out:** none (vanilla JS, `is:inline`).

### ThemeToggle.astro (83 LOC)

**Purpose:** dark/light toggle button; dispatches `theme-change` CustomEvent consumed by `ThemeProvider`.
**Reads:** `document.documentElement[data-theme]` via `rootInDarkMode()`.
**Writes:** dispatches DOM event; sets button `aria-checked`.
**Called by:** `src/components/layout/Header.astro`.
**Calls out:** `@/utils/domElement` (`rootInDarkMode`).

---

## Gotchas
- `BaseHead.astro` prefixes internal asset/link paths with `@/utils/url`'s `BASE` (GH Pages `base: "/Posts"`) — a raw `/icon.svg` or `/social-card.png` string here breaks under the Pages base path (was a real bug caught mid-implementation, see the loader/build check in process-docs).
