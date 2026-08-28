// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { beforeAll, describe, it, vi } from 'vitest';
import { runSharedChartContract } from '../../core/test-utils/chart-contract.js';
import { LineChartComponent } from '../src/components/chart.js';

@Component({ standalone: true, imports: [LineChartComponent], template: `<simurgh-line-chart [data]="data" x="x" y="y" [interaction]="{ zoom: 'x' }" [accessibility]="accessibility" [locale]="locale" (viewportChange)="onViewport()" (pointClick)="onPoint()" />` })
class ChartContractHost {
  data = [{ x: 0, y: 2 }, { x: 10, y: 8 }];
  accessibility = { title: 'Contract chart', description: 'Two values.', table: { pageSize: 1 } } as const;
  locale = { explore: 'Explorer', reset: 'Réinitialiser', category: 'Catégorie', dataPages: 'Pages de données' };
  viewportChanges = 0; pointClicks = 0;
  onViewport() { this.viewportChanges += 1; }
  onPoint() { this.pointClicks += 1; }
}
beforeAll(() => TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()));
describe('Angular shared chart contract', () => {
  it('executes the capability and accessibility contract', async () => {
    await runSharedChartContract(() => {
      TestBed.resetTestingModule(); const fixture = TestBed.createComponent(ChartContractHost); fixture.detectChanges();
      const root = fixture.nativeElement.querySelector<HTMLElement>('[data-slot="chart"]')!; const viewport = root.querySelector<HTMLElement>('[data-part="viewport"]')!; const keyboard = root.querySelector<HTMLElement>('[data-part="keyboard-target"]')!;
      vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
      const dispatch = (event: Event) => { viewport.dispatchEvent(event); fixture.detectChanges(); };
      return { root, keyboard, announcement: () => root.querySelector('[data-part="point-announcement"]')?.textContent ?? '', press: async (key: string) => { keyboard.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true })); fixture.detectChanges(); }, wheel: async () => dispatch(new WheelEvent('wheel', { clientX: 320, clientY: 180, deltaY: -100, bubbles: true })), click: async () => dispatch(new MouseEvent('click', { clientX: 320, clientY: 180, bubbles: true })), viewportChanges: () => fixture.componentInstance.viewportChanges, pointClicks: () => fixture.componentInstance.pointClicks, destroy: () => fixture.destroy() };
    });
  });
});
