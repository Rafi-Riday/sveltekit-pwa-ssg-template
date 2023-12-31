import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import svelteConsoleRemover from 'vite-plugin-svelte-console-remover';

export default defineConfig({
	plugins: [
		sveltekit(),
		svelteConsoleRemover(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'production',
			strategies: 'generateSW',
			registerType: 'autoUpdate',
			scope: '/',
			base: '/',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				name: "SvelteKit pwa ssg template",
				short_name: "SvelteKit pwa ssg template",
				description: "SvelteKit pwa ssg template",
				start_url: "/",
				scope: '/',
				display: "standalone",
				theme_color: "#4506cb",
				background_color: "#f2f2f2",
				icons: [
					{
						src: "/favicon-192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable"
					},
					{
						src: "/favicon-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable"
					}
				]
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				runtimeCaching: [{
					urlPattern: ({ request }) => request.destination === 'image',
					handler: 'NetworkFirst',
					options: {
						cacheName: 'images-cache',
						cacheableResponse: {
							statuses: [0, 200]
						}
					},
				}, {
					urlPattern: ({ url }) => url.pathname.startsWith(''),
					handler: 'NetworkFirst',
					options: {
						cacheName: 'api-cache',
						cacheableResponse: {
							statuses: [0, 200]
						}
					}
				}]
			},
		})
	],
});
