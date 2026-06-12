import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://thisismattsmith.com",
	integrations: [
		mdx(),
		sitemap({
			changefreq: "weekly",
			lastmod: new Date(),
		}),
		tailwind(),
	],
	output: "static",
	// Trim per-page client JS; image optimisation handled by Netlify.
	build: {
		inlineStylesheets: "auto",
	},
});
