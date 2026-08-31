import { render } from 'preact';
import { Button } from '@simurgh-ui/preact/button';
import { Checkbox } from '@simurgh-ui/preact/checkbox';
import { Input } from '@simurgh-ui/preact/input';
import { Popover, PopoverContent, PopoverTrigger } from '@simurgh-ui/preact/popover';
import '../theme.css';

export function App() {
  return <main class="reference-app">
    <h1>Preact reference</h1>
    <form>
      <Input name="email" type="email" required placeholder="Email" />
      <Checkbox name="updates">Product updates</Checkbox>
      <Button type="submit">Join</Button>
    </form>
    <Popover><PopoverTrigger>Account help</PopoverTrigger><PopoverContent>Contact support@example.com.</PopoverContent></Popover>
  </main>;
}

const root = typeof document === 'undefined' ? null : document.querySelector('#app');
if (root) render(<App />, root);
