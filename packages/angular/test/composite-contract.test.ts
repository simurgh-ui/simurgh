// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { beforeAll, describe, it } from 'vitest';
import { runSharedCompositeContract } from '../../core/test-utils/composite-contract.js';
import type { Direction } from '../../core/src/index.js';
import {
  TabDirective,
  TabPanelDirective,
  TabsComponent,
} from '../src/components/tabs.js';

@Component({
  standalone: true,
  imports: [TabsComponent, TabDirective, TabPanelDirective],
  template: `<simurgh-tabs value="one" [direction]="direction">
    <button tab simurghTab="one">One</button>
    <button tab simurghTab="two">Two</button>
    <button tab simurghTab="three">Three</button>
    <div simurghTabPanel="one">First</div>
    <div simurghTabPanel="two">Second</div>
    <div simurghTabPanel="three">Third</div>
  </simurgh-tabs>`,
})
class CompositeContractHost {
  direction: Direction = 'ltr';
}

beforeAll(() =>
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  ),
);

describe('Angular shared composite contract', () => {
  it('executes the data-driven navigation matrix', async () => {
    await runSharedCompositeContract((direction) => {
      TestBed.resetTestingModule();
      const fixture = TestBed.createComponent(CompositeContractHost);
      fixture.componentInstance.direction = direction;
      fixture.detectChanges();
      const items = Array.from(
        fixture.nativeElement.querySelectorAll<HTMLElement>('[role=tab]'),
      );
      return {
        items,
        press: async (key) => {
          items[0]!.parentElement!.dispatchEvent(
            new KeyboardEvent('keydown', { key, bubbles: true }),
          );
          fixture.detectChanges();
        },
        selected: () =>
          items.findIndex(
            (item) => item.getAttribute('aria-selected') === 'true',
          ),
        destroy: () => fixture.destroy(),
      };
    });
  });
});
