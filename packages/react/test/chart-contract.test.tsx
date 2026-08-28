// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { runSharedChartContract } from '../../core/test-utils/chart-contract.js';
import { LineChart } from '../src/components/chart.js';

describe('React shared chart contract', () => {
  it('executes the capability and accessibility contract', async () => {
    await runSharedChartContract(() => {
      const viewportChange = vi.fn(); const pointClick = vi.fn();
      const view = render(<LineChart data={[{ x: 0, y: 2 }, { x: 10, y: 8 }]} x="x" y="y" interaction={{ zoom: 'x' }} onViewportChange={viewportChange} onPointClick={pointClick} onDrilldown={() => {}} accessibility={{ title: 'Contract chart', description: 'Two values.', table: { pageSize: 1 } }} locale={{ explore: 'Explorer', reset: 'Réinitialiser', category: 'Catégorie', dataPages: 'Pages de données' }} />);
      const root = view.container.querySelector<HTMLElement>('[data-slot="chart"]')!; const viewport = root.querySelector<HTMLElement>('[data-part="viewport"]')!; const keyboard = root.querySelector<HTMLElement>('[data-part="keyboard-target"]')!;
      vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
      return { root, keyboard, announcement: () => root.querySelector('[data-part="point-announcement"]')?.textContent ?? '', press: async (key: string) => { fireEvent.keyDown(keyboard, { key }); }, wheel: async () => { fireEvent.wheel(viewport, { clientX: 320, clientY: 180, deltaY: -100 }); }, click: async () => { fireEvent.click(viewport, { clientX: 320, clientY: 180 }); }, viewportChanges: () => viewportChange.mock.calls.length, pointClicks: () => pointClick.mock.calls.length, destroy: view.unmount };
    });
  });
});
