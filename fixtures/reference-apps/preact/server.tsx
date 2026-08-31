import renderToString from 'preact-render-to-string';
import { App } from './main.js';
export function render() { return `<!doctype html><div id="app">${renderToString(<App />)}</div>`; }
