import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@simurgh-ui/react/button';
import { Checkbox } from '@simurgh-ui/react/checkbox';
import { Input } from '@simurgh-ui/react/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@simurgh-ui/react/popover';
import '../theme.css';

export function App() {
  return (
    <main className="reference-app">
      <h1>React reference</h1>
      <form>
        <Input name="email" type="email" required placeholder="Email" />
        <Checkbox name="updates">Product updates</Checkbox>
        <Button type="submit">Join</Button>
      </form>
      <Popover>
        <PopoverTrigger>Account help</PopoverTrigger>
        <PopoverContent>Contact support@example.com.</PopoverContent>
      </Popover>
    </main>
  );
}

const root =
  typeof document === 'undefined' ? null : document.querySelector('#app');
if (root) createRoot(root).render(<App />);
