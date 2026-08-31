import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [svelte()],
  build: { sourcemap: false, target: 'es2022' },
});
