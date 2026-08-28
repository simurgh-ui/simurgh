// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LineChart, PieChart } from '../src/components/chart.js';

const data = [{ x: 1, y: 4 }, { x: 2, y: 7 }, { x: 3, y: 5 }];
const accessibility = { title: 'Trend', description: 'Three observations.', table: true } as const;
afterEach(cleanup);

describe('Vue charts', () => {
  it('renders accessible marks and keyboard exploration', async () => {
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', accessibility } });
    expect(screen.getByText('Trend')).toBeTruthy();
    const target = screen.getByRole('button', { name: 'Explore chart data' });
    await fireEvent.keyDown(target, { key: 'ArrowRight' });
    expect(screen.getByRole('tooltip').textContent).toContain('7');
    expect((await axe.run(result.container)).violations).toEqual([]);
  });
  it('renders polar geometry', () => {
    const result = render(PieChart, { props: { data, y: 'y', accessibility } });
    expect(result.container.querySelectorAll('path[data-part="series"]')).toHaveLength(3);
  });
  it('renders configurable x and y axes', () => {
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', accessibility, xAxis: { title: 'Time', ticks: 3 }, yAxis: { title: 'Value', ticks: 4 } } });
    expect(result.container.querySelectorAll('[data-part="x-axis"] text')).toHaveLength(3);
    expect(result.container.querySelectorAll('[data-part="y-axis"] text')).toHaveLength(4);
    expect(screen.getByText('Time')).toBeTruthy();
    expect(screen.getByText('Value')).toBeTruthy();
  });
  it('supports viewport zoom, brush gestures, and point callbacks', async () => {
    const viewportChange = vi.fn();
    const selectionChange = vi.fn();
    const pointClick = vi.fn();
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', accessibility, interaction: { zoom: 'x', brush: 'x' }, onPointClick: pointClick, 'onUpdate:viewport': viewportChange, 'onUpdate:selection': selectionChange } });
    const viewport = result.container.querySelector('[data-part="viewport"]') as HTMLElement;
    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
    await fireEvent.wheel(viewport, { clientX: 320, clientY: 180, deltaY: -100 });
    await fireEvent.pointerDown(viewport, { clientX: 100, clientY: 120, pointerId: 1 });
    await fireEvent.pointerUp(viewport, { clientX: 400, clientY: 220, pointerId: 1 });
    await fireEvent.click(viewport, { clientX: 100, clientY: 120 });
    expect(viewportChange).toHaveBeenCalled();
    expect(selectionChange).toHaveBeenCalledWith(expect.objectContaining({ start: [100, 120] }));
    expect(pointClick).toHaveBeenCalledWith(expect.objectContaining({ seriesId: 'value' }));
  });
});
