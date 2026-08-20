import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './main.js';

export function render() {
  return `<!doctype html><div id="app">${renderToString(<App />)}</div>`;
}
