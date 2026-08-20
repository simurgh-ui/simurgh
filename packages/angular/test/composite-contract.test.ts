// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { beforeAll, describe, it } from 'vitest';
import { runSharedCompositeContract } from '../../core/test-utils/composite-contract.js';
import type { Direction, Orientation } from '../../core/src/index.js';
import {
  TabDirective,
  TabPanelDirective,
  TabsComponent,
} from '../src/components/tabs.js';

@Component({
  standalone: true,
  imports: [CommonModule, TabsComponent, TabDirective, TabPanelDirective],
  template: `<simurgh-tabs
    value="one"
    [direction]="direction"
    [orientation]="orientation"
  >
    <button tab simurghTab="one">One</button>
    <button tab simurghTab="two" [disabled]="disabled === 1">Two</button>
    <button tab simurghTab="three">Three</button>
    <button *ngIf="includeFourth" tab simurghTab="four">Four</button>
    <div simurghTabPanel="one">First</div>
    <div simurghTabPanel="two">Second</div>
    <div simurghTabPanel="three">Third</div>
    <div *ngIf="includeFourth" simurghTabPanel="four">Fourth</div>
  </simurgh-tabs>`,
})
class CompositeContractHost {
  direction: Direction = 'ltr';
  orientation: Orientation = 'horizontal';
  disabled: number | undefined;
  includeFourth = false;
}

beforeAll(() =>
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  ),
);

describe('Angular shared composite contract', () => {
  it('executes the data-driven navigation matrix', async () => {
    await runSharedCompositeContract(({ direction, orientation, disabled }) => {
      TestBed.resetTestingModule();
      const fixture = TestBed.createComponent(CompositeContractHost);
      fixture.componentInstance.direction = direction;
      fixture.componentInstance.orientation = orientation;
      fixture.componentInstance.disabled = disabled;
      fixture.detectChanges();
      const items = () =>
        Array.from(
          fixture.nativeElement.querySelectorAll<HTMLElement>('[role=tab]'),
        );
      return {
        items,
        press: async (key) => {
          items()[0]!.parentElement!.dispatchEvent(
            new KeyboardEvent('keydown', { key, bubbles: true }),
          );
          fixture.detectChanges();
        },
        selected: () =>
          items().findIndex(
            (item) => item.getAttribute('aria-selected') === 'true',
          ),
        addItem: async () => {
          fixture.componentInstance.includeFourth = true;
          fixture.detectChanges();
        },
        destroy: () => fixture.destroy(),
      };
    });
  });
});
