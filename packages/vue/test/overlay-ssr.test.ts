// @vitest-environment node
import { createSSRApp, h, type Component } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { describe, expect, it } from 'vitest';
import { Combobox } from '../src/components/combobox.js';
import {
  ContextMenu,
  ContextMenuTrigger,
} from '../src/components/context-menu.js';
import { DatePicker } from '../src/components/date-picker.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../src/components/dropdown-menu.js';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../src/components/hover-card.js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../src/components/popover.js';
import { Select } from '../src/components/select.js';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../src/components/tooltip.js';

const options = [{ value: 'one', label: 'One' }];
const floating = (
  Root: Component,
  Trigger: Component,
  Content: Component,
  label: string,
) =>
  h(Root, null, {
    default: () => [
      h(Trigger, null, { default: () => label }),
      h(Content, null, { default: () => 'Content' }),
    ],
  });
const cases: Array<[string, () => ReturnType<typeof h>]> = [
  ['Popover', () => floating(Popover, PopoverTrigger, PopoverContent, 'Open')],
  ['Tooltip', () => floating(Tooltip, TooltipTrigger, TooltipContent, 'Help')],
  [
    'Hover Card',
    () => floating(HoverCard, HoverCardTrigger, HoverCardContent, 'Profile'),
  ],
  [
    'Dropdown Menu',
    () =>
      floating(
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        'Actions',
      ),
  ],
  [
    'Context Menu',
    () =>
      h(ContextMenu, null, {
        default: () => h(ContextMenuTrigger, null, { default: () => 'Canvas' }),
      }),
  ],
  ['Select', () => h(Select, { options })],
  ['Combobox', () => h(Combobox, { options })],
  ['Date Picker', () => h(DatePicker)],
];

async function render(create: () => ReturnType<typeof h>) {
  return renderToString(createSSRApp({ render: create }));
}

describe('Vue positioned overlay SSR', () => {
  for (const [name, create] of cases) {
    it(`renders ${name} deterministically without browser globals`, async () => {
      expect(globalThis).not.toHaveProperty('window');
      expect(globalThis).not.toHaveProperty('document');
      expect(await render(create)).toBe(await render(create));
    });
  }
});
