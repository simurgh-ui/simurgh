// @vitest-environment jsdom
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h, nextTick, type Component } from 'vue';
import { describe, expect, it, vi } from 'vitest';
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
const Root = {
  render: () =>
    h('main', null, [
      floating(Popover, PopoverTrigger, PopoverContent, 'Open'),
      floating(Tooltip, TooltipTrigger, TooltipContent, 'Help'),
      floating(HoverCard, HoverCardTrigger, HoverCardContent, 'Profile'),
      floating(
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        'Actions',
      ),
      h(ContextMenu, null, {
        default: () => h(ContextMenuTrigger, null, { default: () => 'Canvas' }),
      }),
      h(Select, { options }),
      h(Combobox, { options }),
      h(DatePicker),
    ]),
};

describe('Vue positioned overlay hydration', () => {
  it('hydrates every deterministic initial overlay without warnings', async () => {
    const markup = await renderToString(createSSRApp(Root));
    const container = document.createElement('div');
    container.innerHTML = markup;
    const normalizedMarkup = container.innerHTML;
    document.body.append(container);
    const warn = vi.fn();
    const app = createSSRApp(Root);
    app.config.warnHandler = warn;
    app.mount(container);
    await nextTick();
    expect(warn).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe(normalizedMarkup);
    app.unmount();
    container.remove();
  });
});
