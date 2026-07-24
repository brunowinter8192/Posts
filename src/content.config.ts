import fs from "node:fs";
import path from "node:path";
import type { Loader } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// articles/**/*.md lives at the repo root (not src/content/) and ships without
// frontmatter. Folder under articles/ = section. Title source: leading "# H1"
// on the first non-empty line, if present (stripped from the body so it isn't
// rendered twice — layout title + body H1). Otherwise humanize the filename:
// "rageval-notes.md" -> "Rageval Notes".
const ARTICLES_ROOT = path.resolve("articles");

function titleFromFilename(filename: string): string {
	return filename
		.replace(/\.md$/, "")
		.split(/[-_]+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

// Extract a leading "# Heading" (first non-empty line) and return the title
// plus the body with that line removed; null when no leading H1 is present.
function extractLeadingH1(rawBody: string): { title: string; body: string } | null {
	const lines = rawBody.split("\n");
	const firstContentIndex = lines.findIndex((line) => line.trim() !== "");
	if (firstContentIndex === -1) return null;

	const match = lines[firstContentIndex].match(/^#\s+(.+?)\s*$/);
	if (!match) return null;

	const body = [...lines.slice(0, firstContentIndex), ...lines.slice(firstContentIndex + 1)].join(
		"\n",
	);
	return { title: match[1], body };
}

const articlesLoader: Loader = {
	name: "articles-loader",
	load: async ({ store, parseData, generateDigest, renderMarkdown }) => {
		store.clear();
		if (!fs.existsSync(ARTICLES_ROOT)) return;

		const sections = fs
			.readdirSync(ARTICLES_ROOT, { withFileTypes: true })
			.filter((entry) => entry.isDirectory());

		for (const sectionDir of sections) {
			const sectionPath = path.join(ARTICLES_ROOT, sectionDir.name);
			const files = fs.readdirSync(sectionPath).filter((f) => f.endsWith(".md"));

			for (const file of files) {
				const filePath = path.join(sectionPath, file);
				const rawBody = fs.readFileSync(filePath, "utf-8");
				const id = `${sectionDir.name}/${file.replace(/\.md$/, "")}`;
				const h1 = extractLeadingH1(rawBody);

				const data = await parseData({
					id,
					data: { title: h1?.title ?? titleFromFilename(file), section: sectionDir.name },
				});
				const rendered = await renderMarkdown(h1?.body ?? rawBody);

				store.set({ id, data, body: rawBody, rendered, digest: generateDigest(rawBody) });
			}
		}
	},
	schema: z.object({
		title: z.string(),
		section: z.string(),
	}),
};

const article = defineCollection({ loader: articlesLoader });

export const collections = { article };
