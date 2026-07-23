# src/layouts/

## Role
Page-shell layouts. `Base.astro` is the outer HTML shell every page uses (directly or via `Article.astro`); `Article.astro` adds the article-specific header (section breadcrumb + title) and prose wrapper on top of it.

## Flow
Page (`src/pages/**`) → `Article.astro` (article pages only) or `Base.astro` directly → renders `<head>` via `BaseHead`, chrome via `Header`/`Footer`, page content via `<slot />`.

## Modules

### Base.astro (34 LOC)

**Purpose:** outer HTML document shell — `<head>` (via `BaseHead`), theme init, skip link, header, `<main><slot /></main>`, footer.
**Reads:** `Astro.props.meta` (`SiteMeta`).
**Writes:** nothing.
**Called by:** `src/pages/index.astro`, `src/pages/404.astro`, `src/pages/[section]/index.astro`, `src/layouts/Article.astro`.
**Calls out:** none beyond its component imports.

### Article.astro (26 LOC)

**Purpose:** article page shell — section breadcrumb link + humanized title, then a `.prose` wrapper around `<slot />` for the rendered Markdown body.
**Reads:** `Astro.props.entry` (`{ data: { title, section } }`).
**Writes:** nothing.
**Called by:** `src/pages/[section]/[article].astro`.
**Calls out:** `@/layouts/Base.astro`, `@/utils/url` (`BASE`).

---

## Gotchas
- Cactus's original `BlogPost.astro` (date, reading-time, TOC, webmentions) was dropped for `Article.astro` — the current corpus has no publish dates or headings-heavy content; re-adding TOC/dates needs frontmatter that the loader doesn't currently produce (see `src/DOCS.md`).
