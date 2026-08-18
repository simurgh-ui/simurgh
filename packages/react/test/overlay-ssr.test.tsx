// @vitest-environment node
import React, { type ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
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
const cases: Array<[string, () => ReactElement]> = [
  [
    'Popover',
    () => (
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    ),
  ],
  [
    'Tooltip',
    () => (
      <Tooltip>
        <TooltipTrigger>Help</TooltipTrigger>
        <TooltipContent>Helpful text</TooltipContent>
      </Tooltip>
    ),
  ],
  [
    'Hover Card',
    () => (
      <HoverCard>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent>Details</HoverCardContent>
      </HoverCard>
    ),
  ],
  [
    'Dropdown Menu',
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>Items</DropdownMenuContent>
      </DropdownMenu>
    ),
  ],
  [
    'Context Menu',
    () => (
      <ContextMenu>
        <ContextMenuTrigger>Canvas</ContextMenuTrigger>
      </ContextMenu>
    ),
  ],
  ['Select', () => <Select options={options} />],
  ['Combobox', () => <Combobox options={options} />],
  ['Date Picker', () => <DatePicker />],
];

describe('React positioned overlay SSR', () => {
  for (const [name, create] of cases) {
    it(`renders ${name} deterministically without browser globals`, () => {
      expect(globalThis).not.toHaveProperty('window');
      expect(globalThis).not.toHaveProperty('document');
      expect(renderToString(create())).toBe(renderToString(create()));
    });
  }
});
