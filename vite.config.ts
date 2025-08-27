import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), tailwindcss()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["vue", "vue-router", "pinia", "@vueuse/core"],
				},
			},
		},
		chunkSizeWarningLimit: 600,
		sourcemap: false,
	},
	server: {
		port: 3000,
		strictPort: true,
		host: true,
	},
	preview: {
		port: 4173,
		strictPort: true,
		host: true,
	},
});
