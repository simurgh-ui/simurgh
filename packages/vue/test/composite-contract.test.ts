// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/vue';
import { h, nextTick } from 'vue';
import { describe, it } from 'vitest';
import { runSharedCompositeContract } from '../../core/test-utils/composite-contract.js';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../src/components/tabs.js';

describe('Vue shared composite contract', () => {
  it('executes the data-driven navigation matrix', async () => {
    await runSharedCompositeContract((direction) => {
      const view = render({
        setup: () => () =>
          h(
            Tabs,
            { defaultValue: 'one', direction },
            {
              default: () => [
                h(TabsList, null, {
                  default: () =>
                    ['one', 'two', 'three'].map((value) =>
                      h(TabsTrigger, { value }, { default: () => value }),
                    ),
                }),
                ...['one', 'two', 'three'].map((value) =>
                  h(TabsContent, { value }, { default: () => value }),
                ),
              ],
            },
          ),
      });
      const items = Array.from(
        view.container.querySelectorAll<HTMLElement>('[role=tab]'),
      );
      return {
        items,
        press: async (key) => {
          await fireEvent.keyDown(items[0]!.parentElement!, { key });
          await nextTick();
        },
        selected: () =>
          items.findIndex(
            (item) => item.getAttribute('aria-selected') === 'true',
          ),
        destroy: view.unmount,
      };
    });
  });
});
