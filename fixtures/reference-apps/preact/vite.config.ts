import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
export default defineConfig({ plugins: [preact()], build: { sourcemap: false, target: 'es2022' } });
