// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { afterEach, describe, it } from 'vitest';
import { runSharedOverlayContract } from '../../core/test-utils/overlay-contract.js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../src/components/popover.js';

afterEach(cleanup);

describe('React shared overlay contract', () => {
  it('covers collision, RTL, input, nesting, portals, focus, dismissal, and cleanup', async () => {
    const view = render(
      <Popover>
        <PopoverTrigger>Parent trigger</PopoverTrigger>
        <PopoverContent aria-label="Parent overlay">
          <Popover>
            <PopoverTrigger>Child trigger</PopoverTrigger>
            <PopoverContent aria-label="Child overlay">
              Child content
            </PopoverContent>
          </Popover>
        </PopoverContent>
      </Popover>,
    );
    const flush = () =>
      act(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
          ),
      );

    await runSharedOverlayContract({
      document,
      host: view.container,
      portal: 'body',
      getParentTrigger: () =>
        screen.getByRole('button', { name: 'Parent trigger' }),
      getChildTrigger: () =>
        screen.getByRole('button', { name: 'Child trigger' }),
      getParentContent: () =>
        document.querySelector<HTMLElement>('[aria-label="Parent overlay"]'),
      getChildContent: () =>
        document.querySelector<HTMLElement>('[aria-label="Child overlay"]'),
      activate: async (element) => {
        fireEvent.pointerDown(element);
        fireEvent.click(element);
        await flush();
      },
      pressEscape: async (element) => {
        fireEvent.keyDown(element, { key: 'Escape' });
        await flush();
      },
      pointerDown: async (element) => {
        fireEvent.pointerDown(element);
        await flush();
      },
      flush,
      unmount: view.unmount,
    });
  });
});
