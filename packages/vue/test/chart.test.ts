// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
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
});
