// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { beforeAll, describe, expect, it } from 'vitest';
import { ArrowRight } from '../src/angular-icons/arrow-right.js';

beforeAll(() =>
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  ),
);

@Component({
  standalone: true,
  imports: [ArrowRight],
  template: `<simurgh-arrow-right-icon
      class="consumer-icon"
      style="color: red"
      data-state="open"
      aria-describedby="hint"
      role="presentation"
      tabindex="-1"
    ></simurgh-arrow-right-icon>
    <simurgh-arrow-right-icon
      class="named-icon"
      data-kind="named"
    ></simurgh-arrow-right-icon>`,
})
class IconHost {}

describe('Angular SVG host parity', () => {
  it('forwards presentation and accessibility attributes to dynamic and named SVG roots', async () => {
    const fixture = TestBed.createComponent(IconHost);
    fixture.detectChanges();
    const hosts = fixture.nativeElement.querySelectorAll(
      'simurgh-arrow-right-icon',
    ) as NodeListOf<HTMLElement>;
    const dynamicSvg = hosts[0]!.querySelector('svg')!;
    const namedSvg = hosts[1]!.querySelector('svg')!;

    expect(dynamicSvg.classList.contains('simurgh-icon')).toBe(true);
    expect(dynamicSvg.classList.contains('consumer-icon')).toBe(true);
    expect(dynamicSvg.style.color).toBe('red');
    expect(dynamicSvg.dataset['state']).toBe('open');
    expect(dynamicSvg.getAttribute('aria-describedby')).toBe('hint');
    expect(dynamicSvg.getAttribute('role')).toBe('presentation');
    expect(dynamicSvg.getAttribute('tabindex')).toBe('-1');
    expect(namedSvg.classList.contains('named-icon')).toBe(true);
    expect(namedSvg.dataset['kind']).toBe('named');
    expect(namedSvg.dataset['slot']).toBe('icon');

    hosts[0]!.setAttribute('class', 'updated-icon');
    hosts[0]!.setAttribute('data-state', 'closed');
    hosts[0]!.removeAttribute('aria-describedby');
    await new Promise((resolve) => setTimeout(resolve));

    expect(dynamicSvg.classList.contains('consumer-icon')).toBe(false);
    expect(dynamicSvg.classList.contains('updated-icon')).toBe(true);
    expect(dynamicSvg.classList.contains('simurgh-icon')).toBe(true);
    expect(dynamicSvg.dataset['state']).toBe('closed');
    expect(dynamicSvg.hasAttribute('aria-describedby')).toBe(false);
    fixture.destroy();
  });
});
