# src/styles/

## Role
Global stylesheet — Cactus's color tokens, dark-mode variant, and Tailwind layer wiring. Single file; extend in place rather than splitting unless a second stylesheet becomes genuinely independent.

## Modules

### global.css (123 LOC)

**Purpose:** Tailwind v4 layer imports, Cactus's OKLCH color custom-properties (light/dark), `.cactus-link`/`.title` utility classes, `prose` color-var mapping for `@tailwindcss/typography`.
**Reads:** `[data-theme]` attribute on `<html>` (set by `ThemeProvider.astro`) for the dark-mode `@custom-variant`.
**Writes:** nothing (CSS only).
**Called by:** imported once, from `src/components/BaseHead.astro`.
**Calls out:** `tailwindcss` (`theme.css`/`preflight.css`/`utilities.css`), `../../tailwind.config.ts` (via `@config`, for the typography plugin).

---

## Gotchas
- Ported from upstream Cactus with the `pagefind` `@layer` name and the `@source not "../pages/og-image"` line removed (both search and satori OG-image generation were dropped from this scaffold) — re-adding either feature needs re-adding the matching CSS wiring here too.
