# src/components/layout/

## Role
Site chrome — header nav and footer. Both are driven by `menuLinks`/`siteConfig` from `src/site.config.ts`, not hardcoded, so adding a nav item means editing the config, not these files.

## Modules

### Header.astro (94 LOC)

**Purpose:** site title link, nav (`menuLinks`), theme toggle, mobile hamburger menu (custom element `mobile-button`).
**Reads:** `Astro.url.pathname` (active-link `aria-current`), `menuLinks`/`siteConfig`.
**Writes:** toggles `.menu-open` class on `#main-header` via inline script.
**Called by:** `src/layouts/Base.astro`.
**Calls out:** `@/components/ThemeToggle.astro`, `@/utils/domElement` (`toggleClass`), `@/utils/url` (`BASE`).

### Footer.astro (24 LOC)

**Purpose:** copyright line + footer nav mirroring `menuLinks`.
**Reads:** `siteConfig`, `menuLinks`.
**Writes:** nothing.
**Called by:** `src/layouts/Base.astro`.
**Calls out:** `@/utils/url` (`BASE`).

---

## Gotchas
- All internal hrefs here are built as `` `${BASE}${link.path}` `` — never write a bare `href="/..."`; it will 404 under the GitHub Pages `/Posts` base.
