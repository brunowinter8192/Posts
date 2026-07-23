import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";

// GitHub Pages project site: https://brunowinter8192.github.io/Posts/
export default defineConfig({
	site: "https://brunowinter8192.github.io",
	base: "/Posts",
	integrations: [expressiveCode()],
	vite: {
		plugins: [tailwind()],
	},
});
