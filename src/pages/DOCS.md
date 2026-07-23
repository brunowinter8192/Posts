# src/pages/

## Role
Route definitions for the digital-garden layout: landing (section list) → section (article list) → article. File-based routing via Astro; `[section]` and `[article]` are dynamic segments resolved from the `article` collection, not from a folder-per-route on disk.

## Flow
`getCollection("article")` (from `src/content.config.ts`) → group by `data.section` for landing/section pages → `getStaticPaths` per dynamic route → `render(entry)` for article HTML.

## Modules

### index.astro (31 LOC)

**Purpose:** landing page — lists distinct sections with per-section article counts (NOT a chronological feed).
**Reads:** `article` collection.
**Writes:** nothing.
**Called by:** Astro router (`/`).
**Calls out:** `@/layouts/Base.astro`, `@/utils/url` (`BASE`).

### 404.astro (10 LOC)

**Purpose:** static not-found page.
**Reads:** nothing.
**Writes:** nothing.
**Called by:** Astro router (build-time 404 fallback).
**Calls out:** `@/layouts/Base.astro`, `@/utils/url` (`BASE`).

### [section]/index.astro (33 LOC)

**Purpose:** section page — article list for one section, back-link to landing.
**Reads:** `article` collection, filtered by `params.section`.
**Writes:** nothing.
**Called by:** Astro router (`/<section>/`), statically generated via `getStaticPaths` over distinct `data.section` values.
**Calls out:** `@/layouts/Base.astro`, `@/utils/url` (`BASE`).

### [section]/[article].astro (19 LOC)

**Purpose:** article page — renders one collection entry's Markdown body.
**Reads:** `article` collection entry matching `${section}/${article}`.
**Writes:** nothing.
**Called by:** Astro router (`/<section>/<article>/`), statically generated via `getStaticPaths` over all entries.
**Calls out:** `@/layouts/Article.astro`, `astro:content` (`getCollection`, `render`).

---

## Gotchas
- No pagination, tags, notes, or RSS routes — dropped from the Cactus base as out of scope for the garden layout (see process-docs). Adding any of those back means adding new page files here, not resurrecting removed ones (they weren't kept, just not committed).
