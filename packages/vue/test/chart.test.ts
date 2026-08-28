// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DonutChart, LineChart, PieChart, ScatterChart } from '../src/components/chart.js';
import { createChartStream } from '@simurgh-ui/core/chart-stream';

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
    expect(result.getByRole('button', { name: 'Explore chart data' })).toBeTruthy();
    expect(result.container.querySelector('[data-part="point-announcement"]')?.textContent).toContain('4');
  });
  it('renders configurable x and y axes', () => {
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', accessibility, xAxis: { title: 'Time', ticks: 3 }, yAxis: { title: 'Value', ticks: 4 } } });
    expect(result.container.querySelectorAll('[data-part="x-axis"] text')).toHaveLength(3);
    expect(result.container.querySelectorAll('[data-part="y-axis"] text')).toHaveLength(4);
    expect(screen.getByText('Time')).toBeTruthy();
    expect(screen.getByText('Value')).toBeTruthy();
  });
  it('renders reference lines and accessible annotations', () => {
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', accessibility, references: [{ axis: 'y', value: 5, label: 'Target' }], annotations: [{ x: 3, y: 5, label: 'Peak', description: 'Peak value' }] } });
    expect(result.container.querySelector('[data-part="reference"]')).toBeTruthy();
    expect(result.container.querySelector('[data-part="annotation"]')?.getAttribute('aria-label')).toBe('Peak value');
  });
  it('renders collision-aware data labels', () => {
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', dataLabels: { formatter: (value: number) => `v${value}` }, accessibility } });
    expect(result.container.querySelector('[data-part="data-labels"]')?.textContent).toContain('v4');
  });
  it('renders formatted donut slice labels', () => {
    const result = render(DonutChart, { props: { data: [{ name: 'A', value: 2 }, { name: 'B', value: 8 }], x: 'name', y: 'value', dataLabels: { formatter: (value: number) => `slice-${value}` }, accessibility } });
    expect(result.container.querySelector('[data-part="data-labels"]')?.textContent).toContain('slice-2');
  });
  it('renders polar center totals and selects slices', async () => {
    const selected = vi.fn();
    const result = render(DonutChart, { props: { data: [{ value: 2 }, { value: 8 }], y: 'value', centerLabel: 'Total', showTotal: true, onSliceSelect: selected, accessibility } });
    expect(result.container.querySelector('[data-part="center-label"]')?.textContent).toContain('Total');
    await fireEvent.click(result.container.querySelector('[data-part="series"]')!);
    expect(selected).toHaveBeenCalledWith(expect.objectContaining({ value: 2 }));
  });
  it('supports drilldown callbacks and back navigation', async () => {
    const drill = vi.fn(); const back = vi.fn();
    const result = render(LineChart, { props: { data: [{ x: 1, y: 2 }], x: 'x', y: 'y', drilldownDepth: 1, onDrilldown: drill, onDrilldownBack: back, accessibility } });
    await fireEvent.click(result.container.querySelector('[data-part="series"]')!);
    await fireEvent.click(result.getByRole('button', { name: 'Back' }));
    expect(drill).toHaveBeenCalled(); expect(back).toHaveBeenCalled();
  });
  it('announces live stream state and exposes pause controls', () => {
    const stream = createChartStream({ capacity: 4, dimensions: ['x', 'y'] as const }); stream.append({ x: [1], y: [2] });
    const result = render(LineChart, { props: { stream, streamControls: true, streamAnnouncement: true, streamAutoScroll: true, y: 'y', accessibility } });
    expect(result.container.querySelector('[data-part="stream-announcement"]')?.textContent).toContain('following latest data');
    expect(result.getByRole('button', { name: 'Pause stream' })).toBeTruthy();
  });
  it('supports viewport zoom, brush gestures, and point callbacks', async () => {
    const viewportChange = vi.fn();
    const selectionChange = vi.fn();
    const pointClick = vi.fn();
    const xDomainChange = vi.fn();
    const result = render(LineChart, { props: { data, x: 'x', y: 'y', accessibility, interaction: { zoom: 'x', brush: 'x' }, onPointClick: pointClick, onXDomainChange: xDomainChange, 'onUpdate:viewport': viewportChange, 'onUpdate:selection': selectionChange } });
    const viewport = result.container.querySelector('[data-part="viewport"]') as HTMLElement;
    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
    await fireEvent.wheel(viewport, { clientX: 320, clientY: 180, deltaY: -100 });
    await fireEvent.pointerDown(viewport, { clientX: 100, clientY: 120, pointerId: 1 });
    await fireEvent.pointerUp(viewport, { clientX: 400, clientY: 220, pointerId: 1 });
    await fireEvent.click(viewport, { clientX: 100, clientY: 120 });
    expect(viewportChange).toHaveBeenCalled();
    expect(xDomainChange).toHaveBeenCalled();
    expect(selectionChange).toHaveBeenCalledWith(expect.objectContaining({ start: [100, 120] }));
    expect(pointClick).toHaveBeenCalledWith(expect.objectContaining({ seriesId: 'value' }));
  });
  it('supports legend isolate and select-all controls', async () => {
    const change = vi.fn();
    const result = render(LineChart, { props: { data: [{ x: 1, a: 2, b: 3 }], x: 'x', series: [{ id: 'a', y: 'a' }, { id: 'b', y: 'b' }], accessibility, legend: { isolate: true }, 'onUpdate:hiddenSeries': change } });
    await fireEvent.click(result.getByRole('button', { name: 'Isolate a' }));
    expect(change).toHaveBeenCalledWith(['b']);
    await fireEvent.click(result.getByRole('button', { name: 'Select all' }));
    expect(change).toHaveBeenCalledWith([]);
  });
  it('applies piecewise visual mapping to points', () => {
    const result = render(ScatterChart, { props: { data: [{ x: 1, y: 8 }], x: 'x', y: 'y', visualMap: { pieces: [{ gte: 5, color: 'red', size: 9 }] }, accessibility } });
    expect(result.container.querySelector('circle')?.getAttribute('fill')).toBe('red');
    expect(result.container.querySelector('circle')?.getAttribute('r')).toBe('9');
  });
  it('renders smooth curves and point symbols', () => {
    const result = render(LineChart, { props: { data: [{ x: 1, y: 2 }, { x: 2, y: 8 }, { x: 3, y: 3 }], x: 'x', y: 'y', series: [{ id: 'value', x: 'x', y: 'y', curve: 'smooth', pointSymbol: 'square', lineDash: '3 2' }], accessibility } });
    expect(result.container.querySelector('[data-part="series"] path')?.getAttribute('d')).toContain('C');
    expect(result.container.querySelector('[data-part="point-symbol"]')?.tagName).toBe('rect');
  });
  it('localizes chart controls and table pagination', () => {
    const result = render(LineChart, { props: { data: [{ x: 1, y: 2 }, { x: 2, y: 3 }], x: 'x', y: 'y', interaction: { zoom: true }, accessibility: { ...accessibility, table: { pageSize: 1 } }, locale: { explore: 'Explorer', reset: 'Réinitialiser', category: 'Catégorie', previous: 'Précédent', next: 'Suivant', dataPages: 'Pages de données' } } });
    expect(result.getByRole('button', { name: 'Explorer' })).toBeTruthy();
    expect(result.getByRole('button', { name: 'Réinitialiser' })).toBeTruthy();
    expect(result.getByRole('navigation', { name: 'Pages de données' })).toBeTruthy();
  });
});
