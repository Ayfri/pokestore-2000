import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [svelte()],
	/** Card scans are fetched once at build and re-encoded to AVIF at display size: 160 KB PNGs become a few KB each. */
	image: { domains: ["images.pokemontcg.io"] },
	/** The site is a handful of small static pages, so prefetching every link on hover makes navigation feel instant. */
	prefetch: { prefetchAll: true },
	/** The whole stylesheet is a few KB, inlining it saves a render-blocking request on every page. */
	build: { inlineStylesheets: "always" },
	vite: { plugins: [tailwindcss()] },
});
