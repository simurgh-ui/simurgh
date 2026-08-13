import { describe, expect, it } from 'vitest';
import { getIcon, iconGroups, iconNames, icons, renderIconSvg } from '../src/index.js';
import { ArrowLeft, Copy, Download, File, FolderOpen, Fullscreen, Home, LayoutGrid, Settings, SimurghIcon, Success, Verified } from '../src/react.js';

describe('navigation icon catalog', () => {
  it('contains 160 unique icons grouped by functionality', () => {
    expect(iconNames).toHaveLength(160);
    expect(new Set(iconNames).size).toBe(160);
    expect(Object.values(iconGroups).flat()).toHaveLength(160);
  });

  it('resolves icons and renders accessible SVG', () => {
    expect(getIcon('home')).toBe(icons.home);
    expect(renderIconSvg('arrow-right', { title: 'Next' })).toContain('aria-label="Next"');
    expect(renderIconSvg('menu')).toContain('aria-hidden="true"');
  });

  it('mirrors directional icons in RTL', () => {
    expect(renderIconSvg('arrow-right', { direction: 'rtl' })).toContain('scale(-1 1)');
    expect(renderIconSvg('home', { direction: 'rtl' })).not.toContain('scale(-1 1)');
  });

  it('exports named components alongside the dynamic component', () => {
    expect(ArrowLeft.displayName).toBe('ArrowLeft');
    expect(Home.displayName).toBe('Home');
    expect(SimurghIcon).toBeTypeOf('object');
    expect(Copy.displayName).toBe('Copy');
    expect(Download.displayName).toBe('Download');
    expect(Settings.displayName).toBe('Settings');
    expect(Success.displayName).toBe('Success');
    expect(Verified.displayName).toBe('Verified');
    expect(File.displayName).toBe('File');
    expect(FolderOpen.displayName).toBe('FolderOpen');
    expect(LayoutGrid.displayName).toBe('LayoutGrid');
    expect(Fullscreen.displayName).toBe('Fullscreen');
  });
});
