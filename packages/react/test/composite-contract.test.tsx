// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import { runSharedCompositeContract } from '../../core/test-utils/composite-contract.js';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../src/components/tabs.js';

describe('React shared composite contract', () => {
  it('executes the data-driven navigation matrix', async () => {
    await runSharedCompositeContract(({ direction, orientation, disabled }) => {
      let count = 3;
      const tree = () => (
        <Tabs
          defaultValue="one"
          direction={direction}
          orientation={orientation}
        >
          <TabsList>
            {['one', 'two', 'three', 'four']
              .slice(0, count)
              .map((value, index) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  disabled={disabled === index}
                >
                  {value}
                </TabsTrigger>
              ))}
          </TabsList>
          {['one', 'two', 'three', 'four'].slice(0, count).map((value) => (
            <TabsContent key={value} value={value}>
              {value}
            </TabsContent>
          ))}
        </Tabs>
      );
      const view = render(tree());
      const items = () =>
        Array.from(view.container.querySelectorAll<HTMLElement>('[role=tab]'));
      return {
        items,
        press: async (key) =>
          fireEvent.keyDown(items()[0]!.parentElement!, { key }),
        selected: () =>
          items().findIndex(
            (item) => item.getAttribute('aria-selected') === 'true',
          ),
        addItem: async () => {
          count = 4;
          view.rerender(tree());
        },
        destroy: view.unmount,
      };
    });
  });
});
