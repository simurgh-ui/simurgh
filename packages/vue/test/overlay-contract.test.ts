// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import { h, nextTick } from 'vue';
import { afterEach, describe, it } from 'vitest';
import { runSharedOverlayContract } from '../../core/test-utils/overlay-contract.js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../src/components/popover.js';

afterEach(cleanup);

describe('Vue shared overlay contract', () => {
  it('covers collision, RTL, input, nesting, portals, focus, dismissal, and cleanup', async () => {
    const view = render({
      setup: () => () =>
        h(Popover, null, {
          default: () => [
            h(PopoverTrigger, null, { default: () => 'Parent trigger' }),
            h(
              PopoverContent,
              { 'aria-label': 'Parent overlay' },
              {
                default: () =>
                  h(Popover, null, {
                    default: () => [
                      h(PopoverTrigger, null, {
                        default: () => 'Child trigger',
                      }),
                      h(
                        PopoverContent,
                        { 'aria-label': 'Child overlay' },
                        { default: () => 'Child content' },
                      ),
                    ],
                  }),
              },
            ),
          ],
        }),
    });
    const flush = async () => {
      await nextTick();
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      await nextTick();
    };

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
        await fireEvent.pointerDown(element);
        await fireEvent.click(element);
        await flush();
      },
      pressEscape: async (element) => {
        await fireEvent.keyDown(element, { key: 'Escape' });
        await flush();
      },
      pointerDown: async (element) => {
        await fireEvent.pointerDown(element);
        await flush();
      },
      flush,
      unmount: view.unmount,
    });
  });
});
