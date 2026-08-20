import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import { App } from './main.js';

export async function render() {
  return `<!doctype html><div id="app">${await renderToString(createSSRApp(App))}</div>`;
}
