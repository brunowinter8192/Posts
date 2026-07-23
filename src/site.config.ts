import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	url: "https://brunowinter8192.github.io/Posts/",
	title: "Bruno Winter — Working Notes",
	author: "Bruno Winter",
	description: "Working notes, organized as project sections.",
	lang: "en",
	ogLocale: "en_US",
	showLogo: false,
};

// Only "Home" — garden layout has no global feed/tags/notes nav.
export const menuLinks: { path: string; title: string }[] = [{ path: "/", title: "Home" }];
