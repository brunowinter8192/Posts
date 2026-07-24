import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	url: "https://brunowinter8192.github.io/Posts/",
	title: "Reinschrift",
	author: "Bruno Winter",
	description: "Reinschrift — Projektnotizen in sauberer Fassung.",
	lang: "de",
	ogLocale: "de_DE",
	showLogo: false,
};

// Only "Home" — garden layout has no global feed/tags/notes nav.
export const menuLinks: { path: string; title: string }[] = [{ path: "/", title: "Home" }];
