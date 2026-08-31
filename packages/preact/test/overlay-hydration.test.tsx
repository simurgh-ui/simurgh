// @vitest-environment jsdom
import { act, waitFor } from '@testing-library/preact';
import { hydrate, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import renderToString from 'preact-render-to-string';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from '../src/components/combobox.js';
import { ContextMenu, ContextMenuTrigger } from '../src/components/context-menu.js';
import { DatePicker } from '../src/components/date-picker.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../src/components/dropdown-menu.js';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../src/components/hover-card.js';
import { Popover, PopoverContent, PopoverTrigger } from '../src/components/popover.js';
import { Select } from '../src/components/select.js';
import { Tooltip, TooltipContent, TooltipTrigger } from '../src/components/tooltip.js';

const options = [{ value: 'one', label: 'One' }];
function AllPositionedOverlays() {
  const [browserReady, setBrowserReady] = useState(false);
  useEffect(() => setBrowserReady(true), []);
  return <main>
    <p data-browser-only>{browserReady ? window.location.pathname : 'server'}</p>
    <Popover><PopoverTrigger>Open</PopoverTrigger><PopoverContent>Content</PopoverContent></Popover>
    <Tooltip><TooltipTrigger>Help</TooltipTrigger><TooltipContent>Helpful text</TooltipContent></Tooltip>
    <HoverCard><HoverCardTrigger>Profile</HoverCardTrigger><HoverCardContent>Details</HoverCardContent></HoverCard>
    <DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent>Items</DropdownMenuContent></DropdownMenu>
    <ContextMenu><ContextMenuTrigger>Canvas</ContextMenuTrigger></ContextMenu>
    <Select options={options} /><Combobox options={options} /><DatePicker />
  </main>;
}

describe('Preact positioned overlay hydration', () => {
  it('hydrates every deterministic initial overlay without recovery', async () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<AllPositionedOverlays />);
    const normalizedMarkup = container.innerHTML;
    document.body.append(container);
    const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    hydrate(<AllPositionedOverlays />, container);
    await waitFor(() => expect(container.querySelector('[data-browser-only]')?.textContent).toBe('/'));
    expect(errors).not.toHaveBeenCalled();
    expect(normalizedMarkup).toContain('data-browser-only');
    expect(container.querySelector('[aria-controls]')?.getAttribute('aria-controls')).toMatch(/\S/u);
    const lazyOverlay = await import('../src/components/dialog.js');
    expect(lazyOverlay.Dialog).toBeTypeOf('function');
    await act(() => render(null, container));
    errors.mockRestore();
    container.remove();
  });
});
