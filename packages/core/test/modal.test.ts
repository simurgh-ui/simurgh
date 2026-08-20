// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { isolateModal } from '../src/index.js';

afterEach(() => {
  document.body.replaceChildren();
  document.body.style.overflow = '';
});

describe('modal isolation', () => {
  it('locks scroll, isolates nested backgrounds, and restores interrupted mounts', () => {
    const background = document.createElement('main');
    const outer = document.createElement('section');
    const outerSibling = document.createElement('button');
    const inner = document.createElement('section');
    outer.append(outerSibling, inner);
    document.body.append(background, outer);

    const restoreOuter = isolateModal(outer);
    expect(document.body.style.overflow).toBe('hidden');
    expect(background.inert).toBe(true);

    const restoreInner = isolateModal(inner);
    expect(outerSibling.inert).toBe(true);
    restoreInner();
    expect(background.inert).toBe(true);
    expect(outerSibling.inert).not.toBe(true);

    restoreOuter();
    expect(document.body.style.overflow).toBe('');
    expect(background.inert).not.toBe(true);
  });
});
