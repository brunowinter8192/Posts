# src/

## Role
Root of the Astro site (project itself lives at repo root, colocated with `articles/`). Holds site-wide config, the content collection definition, and shared types. Touch this when changing site metadata, nav, or how `articles/**/*.md` is loaded. Don't touch for page/component/layout changes — those live in their own subdirs (see their DOCS.md).

## Flow
`articles/<section>/<file>.md` (repo root, no frontmatter) → `content.config.ts` custom loader → `article` collection (`id`, `data.title`, `data.section`, rendered body) → consumed by `src/pages/**` via `getCollection`/`render`.

## Modules

### content.config.ts (57 LOC)

**Purpose:** defines the `article` content collection via a custom loader that reads `articles/<section>/*.md` from the repo root (not `src/content/`) and derives `title`/`section` since the source files ship without frontmatter.
**Reads:** filesystem — `articles/**/*.md` at repo root (`path.resolve("articles")`).
**Writes:** Astro content store (`store.set`) consumed by `astro:content` APIs.
**Called by:** `src/pages/index.astro`, `src/pages/[section]/index.astro`, `src/pages/[section]/[article].astro`.
**Calls out:** `astro/loaders` (`Loader` type), `astro:content` (`defineCollection`, `z`).

### site.config.ts (14 LOC)

**Purpose:** site metadata (title, author, description, lang) and `menuLinks` (nav — currently just "Home").
**Reads:** nothing.
**Writes:** nothing (pure config export).
**Called by:** `BaseHead.astro`, `Header.astro`, `Footer.astro`, `src/pages/index.astro`.
**Calls out:** none.

### types.ts (15 LOC)

**Purpose:** shared TS interfaces (`SiteConfig`, `SiteMeta`).
**Reads:** nothing.
**Writes:** nothing.
**Called by:** `site.config.ts`, `Base.astro`, `BaseHead.astro`.
**Calls out:** none.

### env.d.ts (1 LOC)

**Purpose:** Astro client type reference (`/// <reference types="astro/client" />`).
**Reads:** nothing.
**Writes:** nothing.
**Called by:** TypeScript compiler (ambient, not imported).
**Calls out:** none.

---

## State
`content.config.ts`'s loader owns the `article` collection store; rebuilt on every `astro build`/`astro dev` sync, not persisted or mutated elsewhere.

## Gotchas
- Title has no real source (no frontmatter, no leading `#` heading in the current corpus) — derived by humanizing the filename (`rageval-notes.md` → "Rageval Notes"). Adding a file with a misleading filename ships a misleading title; there is no override mechanism.
- `id` = `${section}/${filename-without-.md}` — this is the routing key `src/pages/[section]/[article].astro` splits on `"/"`. Renaming a section folder or file changes the URL.
- Loader path is `path.resolve("articles")`, i.e. relative to the process cwd at build time — must be invoked with the repo root as cwd (true for `npm run build`/`astro dev` from repo root; would break if invoked from elsewhere).
