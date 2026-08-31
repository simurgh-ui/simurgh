import { render as renderComponent } from 'svelte/server';
import App from './App.svelte';
export function render() {
  return `<!doctype html><div id="app">${renderComponent(App).body}</div>`;
}
