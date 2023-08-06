##### Used technologies:
- SvelteKit
- SSG
- pnpm

##### Website contains features like:
- It is Static Site Generated `(SSG)` but some parts fetches data from client side.
- Its PWA, every part of the site can be saved. Information are cached when uaer is connected to network. Offline fetching falls back to cached data.
- Js framework is [SvelteKit](https://kit.svelte.dev/) which is more like `Next JS`.

##### How to:
- in src/routes/[...catchAll] folder, use `export const prerender = false;` in `layout.js` file
