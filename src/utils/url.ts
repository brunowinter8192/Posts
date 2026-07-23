// Astro's BASE_URL reflects the configured `base` (e.g. "/Posts/"); normalized
// without trailing slash so callers can do `${BASE}/section/`.
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
