import fs from "node:fs";
import path from "node:path";
import type { Loader } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// articles/**/*.md lives at the repo root (not src/content/) and ships without
// frontmatter. Folder under articles/ = section. Title has no source to derive
// from (no frontmatter, no leading heading in the current corpus) — humanize the
// filename instead: "rageval-notes.md" -> "Rageval Notes". Simple, always works.
const ARTICLES_ROOT = path.resolve("articles");

function titleFromFilename(filename: string): string {
	return filename
		.replace(/\.md$/, "")
		.split(/[-_]+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
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

				const data = await parseData({
					id,
					data: { title: titleFromFilename(file), section: sectionDir.name },
				});
				const rendered = await renderMarkdown(rawBody);

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
