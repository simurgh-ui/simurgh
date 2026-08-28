// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BarChart, DonutChart, LineChart, PieChart, RadarChart } from '../src/components/chart.js';

const data = [
  { month: 'Jan', revenue: 12, cost: 8 },
  { month: 'Feb', revenue: 18, cost: 10 },
  { month: 'Mar', revenue: 15, cost: 11 },
];
const accessibility = { title: 'Revenue', description: 'Monthly revenue and cost.', table: { pageSize: 2 } } as const;

afterEach(cleanup);

describe('React charts', () => {
  it('renders deterministic accessible SVG and a bounded table', async () => {
    const { container } = render(<LineChart data={data} x="month" xScale="band" y="revenue" accessibility={accessibility} />);
    expect(screen.getByText('Revenue')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explore chart data' })).toBeTruthy();
    expect(screen.getByText('1 / 2')).toBeTruthy();
    expect((await axe.run(container)).violations).toEqual([]);
    const serverMarkup = renderToString(<LineChart data={data} x="month" xScale="band" y="revenue" accessibility={accessibility} />);
    expect(serverMarkup).toContain('data-renderer="svg"');
    expect(serverMarkup).toContain('>0<');
    expect(serverMarkup).not.toMatch(/[۰-۹]/u);
  });
  it('supports keyboard exploration and controlled legend state', () => {
    const change = vi.fn();
    render(<LineChart data={data} x="month" xScale="band" series={[{ id: 'revenue', y: 'revenue' }, { id: 'cost', y: 'cost' }]} accessibility={accessibility} onHiddenSeriesChange={change} />);
    const target = screen.getByRole('button', { name: 'Explore chart data' });
    expect(screen.getByRole('tooltip').textContent).toContain('revenue: 12');
    fireEvent.keyDown(target, { key: 'ArrowRight' });
    expect(screen.getByRole('tooltip').textContent).toContain('revenue: 18');
    fireEvent.click(screen.getByRole('button', { name: 'cost' }));
    expect(change).toHaveBeenCalledWith(['cost']);
  });
  it('supports pointer exploration', () => {
    const { container } = render(<LineChart data={data} x="month" xScale="band" y="revenue" accessibility={accessibility} />);
    const viewport = container.querySelector('[data-part="viewport"]')!;
    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360,
      x: 0, y: 0, toJSON: () => ({}),
    });
    fireEvent.mouseMove(viewport, { clientX: 320, clientY: 120 });
    expect(screen.getByRole('tooltip').textContent).toContain('value: 18');
    expect(container.querySelector('[data-part="crosshair"]')).toBeTruthy();
  });
  it('supports shared and disabled tooltip modes with formatting', () => {
    const { container, rerender } = render(<LineChart data={data} x="month" xScale="band" series={[{ id: 'revenue', y: 'revenue' }, { id: 'cost', y: 'cost' }]} tooltipMode="index" tooltipFormatter={(point) => `formatted:${point.seriesId}:${point.yValue}`} accessibility={accessibility} />);
    expect(container.querySelectorAll('[data-part="tooltip"] [data-testid]')).toHaveLength(0);
    expect(screen.getByRole('tooltip').textContent).toContain('formatted:revenue:12');
    expect(screen.getByRole('tooltip').textContent).toContain('formatted:cost:8');
    rerender(<LineChart data={data} x="month" xScale="band" y="revenue" tooltipMode="none" accessibility={accessibility} />);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
  it('emits typed point pointer events', () => {
    const click = vi.fn();
    const leave = vi.fn();
    const { container } = render(<LineChart data={[{ x: 0, y: 4 }]} x="x" y="y" accessibility={accessibility} onPointClick={click} onPointHover={leave} />);
    const viewport = container.querySelector('[data-part="viewport"]')!;
    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
    fireEvent.mouseMove(viewport, { clientX: 100, clientY: 100 });
    fireEvent.click(viewport, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(viewport);
    expect(click).toHaveBeenCalledWith(expect.objectContaining({ seriesId: 'value', yValue: 4 }));
    expect(leave).toHaveBeenLastCalledWith(null);
  });
  it('supports wheel zoom with a controlled viewport callback', () => {
    const change = vi.fn();
    const { container } = render(<LineChart data={[{ x: 0, y: 0 }, { x: 10, y: 10 }]} x="x" y="y" interaction={{ zoom: 'x' }} accessibility={accessibility} onViewportChange={change} />);
    const viewport = container.querySelector('[data-part="viewport"]')!;
    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 360, right: 640, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
    fireEvent.wheel(viewport, { clientX: 320, clientY: 180, deltaY: -100 });
    expect(change).toHaveBeenCalledOnce();
    const next = change.mock.calls[0]![0];
    expect(next.x[1] - next.x[0]).toBeLessThan(10);
    fireEvent.click(screen.getByRole('button', { name: 'Reset view' }));
    expect(change).toHaveBeenLastCalledWith({});
  });
  it('renders horizontal, stacked, polar, and empty states', () => {
    const { container, rerender } = render(<BarChart data={data} x="month" y="revenue" orientation="horizontal" accessibility={accessibility} />);
    expect(container.querySelectorAll('rect').length).toBe(3);
    rerender(<BarChart data={data} x="month" series={[{ id: 'revenue', y: 'revenue', stack: 'total' }, { id: 'cost', y: 'cost', stack: 'total' }]} accessibility={accessibility} />);
    expect(container.querySelectorAll('[data-part="series"] rect').length).toBe(6);
    rerender(<PieChart data={data} y="revenue" accessibility={accessibility} />);
    expect(container.querySelectorAll('path[data-part="series"]').length).toBe(3);
    rerender(<PieChart data={[{ channel: 'Product', value: 42 }, { channel: 'Services', value: 28 }, { channel: 'Support', value: 18 }]} x="channel" y="value" accessibility={accessibility} />);
    const polarViewport = container.querySelector('[data-part="viewport"]')!;
    vi.spyOn(polarViewport, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 360, height: 360, right: 360, bottom: 360, x: 0, y: 0, toJSON: () => ({}) });
    expect(screen.getByRole('tooltip').textContent).toContain('Product: 42');
    fireEvent.keyDown(screen.getByRole('button', { name: 'Explore chart data' }), { key: 'ArrowRight' });
    expect(screen.getByRole('tooltip').textContent).toContain('Services: 28');
    fireEvent.mouseMove(polarViewport, { clientX: 80, clientY: 100 });
    expect(screen.getByRole('tooltip').textContent).toContain('Support: 18');
    rerender(<DonutChart data={[{ channel: 'Product', value: 42 }, { channel: 'Services', value: 28 }]} x="channel" y="value" accessibility={accessibility} />);
    expect(screen.getByRole('button', { name: 'Explore chart data' })).toBeTruthy();
    rerender(<RadarChart data={[{ channel: 'Product', value: 42 }, { channel: 'Services', value: 28 }, { channel: 'Support', value: 18 }]} x="channel" y="value" accessibility={accessibility} />);
    expect(container.querySelectorAll('[data-part="axis-label"]')).toHaveLength(3);
    expect(screen.getByText('Product')).toBeTruthy();
    rerender(<LineChart data={[]} y="revenue" accessibility={accessibility} />);
    expect(container.querySelector('[data-state="empty"]')).toBeTruthy();
  });
});
