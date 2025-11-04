import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    site: "https://www.thisismattsmith.com",
    integrations: [
        mdx(),
        sitemap({
            changefreq: "daily",
            priority: 1,
            lastmod: new Date().toISOString().split("T")[0],
        }),
        tailwind(),
    ],
    output: "server",
    adapter: netlify(),
});