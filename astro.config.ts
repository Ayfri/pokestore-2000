import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	integrations: [svelte()],
	/** Card scans are fetched once at build and re-encoded to AVIF at display size: 160 KB PNGs become a few KB each. */
	image: { domains: ["images.pokemontcg.io"] },
	/**
	 * The site is a handful of small static pages, so prefetching every link on hover makes navigation feel instant.
	 * experimental.clientPrerender stays off: speculative prerendering runs page scripts, which would count fake hits and burn the once-per-session popup.
	 */
	prefetch: { prefetchAll: true },
	/** Fonts are self-hosted from _astro/fonts at build time, which the immutable cache rule in public/_headers covers. */
	fonts: [
		{ provider: fontProviders.google(), name: "Comic Neue", cssVariable: "--font-comic-neue", weights: [400, 700], styles: ["normal"], fallbacks: ["cursive"] },
		{ provider: fontProviders.google(), name: "VT323", cssVariable: "--font-vt323", styles: ["normal"], fallbacks: ["monospace"] },
		{ provider: fontProviders.google(), name: "Silkscreen", cssVariable: "--font-silkscreen", weights: [400], styles: ["normal"], fallbacks: ["monospace"] },
		{ provider: fontProviders.google(), name: "Titan One", cssVariable: "--font-titan-one", weights: [400], styles: ["normal"], fallbacks: ["Arial Black", "sans-serif"] },
	],
	/** "file" emits shop.html, which Cloudflare serves at /shop directly, where shop/index.html would cost a redirect to /shop/. */
	trailingSlash: "never",
	/** The whole stylesheet is a few KB, inlining it saves a render-blocking request on every page. */
	build: { inlineStylesheets: "always", format: "file" },
	vite: { plugins: [tailwindcss()] },
});
