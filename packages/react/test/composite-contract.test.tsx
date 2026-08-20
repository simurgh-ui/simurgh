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
    await runSharedCompositeContract((direction) => {
      const view = render(
        <Tabs defaultValue="one" direction={direction}>
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
            <TabsTrigger value="three">Three</TabsTrigger>
          </TabsList>
          <TabsContent value="one">First</TabsContent>
          <TabsContent value="two">Second</TabsContent>
          <TabsContent value="three">Third</TabsContent>
        </Tabs>,
      );
      const items = Array.from(
        view.container.querySelectorAll<HTMLElement>('[role=tab]'),
      );
      return {
        items,
        press: async (key) =>
          fireEvent.keyDown(items[0]!.parentElement!, { key }),
        selected: () =>
          items.findIndex(
            (item) => item.getAttribute('aria-selected') === 'true',
          ),
        destroy: view.unmount,
      };
    });
  });
});
