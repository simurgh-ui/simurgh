import '@simurgh-ui/lit/button';
import '@simurgh-ui/lit/checkbox';
import '@simurgh-ui/lit/input';
import '@simurgh-ui/lit/popover';
import '../theme.css';
export const markup = `<main class="reference-app"><h1>Lit reference</h1><form><simurgh-input name="email" type="email" required placeholder="Email"></simurgh-input><simurgh-checkbox name="updates">Product updates</simurgh-checkbox><simurgh-button type="submit">Join</simurgh-button></form><simurgh-popover label="Account help">Contact support@example.com.</simurgh-popover></main>`;
const root =
  typeof document === 'undefined' ? null : document.querySelector('#app');
if (root) root.innerHTML = markup;
