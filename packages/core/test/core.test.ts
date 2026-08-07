import { describe, expect, it, vi } from 'vitest';
import { createControllableState, formValue, nextIndex, resolveDirection } from '../src/index.js';

describe('direction-aware keyboard navigation', () => {
  it('reverses horizontal arrows in RTL', () => {
    expect(nextIndex(0, 3, 'ArrowLeft', { direction: 'rtl' })).toBe(1);
    expect(nextIndex(0, 3, 'ArrowRight', { direction: 'rtl' })).toBe(2);
  });
  it('supports bounded and looping movement', () => {
    expect(nextIndex(2, 3, 'ArrowRight')).toBe(0);
    expect(nextIndex(2, 3, 'ArrowRight', { loop: false })).toBe(2);
  });
});

describe('state and forms', () => {
  it('notifies only when state changes', () => {
    const change = vi.fn();
    const state = createControllableState(false, change);
    state.set(true); state.set(true);
    expect(change).toHaveBeenCalledOnce();
  });
  it('serializes checked values', () => {
    expect(formValue('yes')).toBe('yes');
    expect(formValue('yes', false)).toBeNull();
  });
});

it('defaults SSR direction to LTR', () => expect(resolveDirection()).toBe('ltr'));
