// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BarChart, LineChart, PieChart } from '../src/components/chart.js';

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
    expect(renderToString(<LineChart data={data} x="month" xScale="band" y="revenue" accessibility={accessibility} />)).toContain('data-renderer="svg"');
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
  it('renders horizontal, stacked, polar, and empty states', () => {
    const { container, rerender } = render(<BarChart data={data} x="month" y="revenue" orientation="horizontal" accessibility={accessibility} />);
    expect(container.querySelectorAll('rect').length).toBe(3);
    rerender(<BarChart data={data} x="month" series={[{ id: 'revenue', y: 'revenue', stack: 'total' }, { id: 'cost', y: 'cost', stack: 'total' }]} accessibility={accessibility} />);
    expect(container.querySelectorAll('[data-part="series"] rect').length).toBe(6);
    rerender(<PieChart data={data} y="revenue" accessibility={accessibility} />);
    expect(container.querySelectorAll('path[data-part="series"]').length).toBe(3);
    rerender(<LineChart data={[]} y="revenue" accessibility={accessibility} />);
    expect(container.querySelector('[data-state="empty"]')).toBeTruthy();
  });
});
