import { mount } from 'svelte';
import App from './App.svelte';
import '../theme.css';
const target =
  typeof document === 'undefined'
    ? null
    : document.querySelector<HTMLElement>('#app');
if (target) mount(App, { target });
