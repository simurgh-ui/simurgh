import { defineConfig } from 'vite';
export default defineConfig({ esbuild: { tsconfigRaw: { compilerOptions: { experimentalDecorators: true } } }, build: { sourcemap: false, target: 'es2022' } });
