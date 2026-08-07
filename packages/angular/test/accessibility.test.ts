// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import axe from 'axe-core';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CheckboxComponent, SelectComponent, type SelectOption } from '../src/index.js';

beforeAll(() => TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()));

@Component({ standalone: true, imports: [CheckboxComponent], template: `<simurgh-checkbox name="updates" value="yes" (checkedChange)="changed($event)">Updates</simurgh-checkbox>` })
class CheckboxHost { changed = vi.fn(); }

describe('Angular accessibility contract', () => {
  it('toggles a checkbox, emits, and passes an axe audit', async () => {
    const fixture = TestBed.createComponent(CheckboxHost); fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('[role=checkbox]') as HTMLButtonElement;
    checkbox.click(); fixture.detectChanges();
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith(true);
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    fixture.destroy();
  });

  it('selects enabled listbox options', async () => {
    const options: SelectOption[] = [{ value: 'tehran', label: 'Tehran' }, { value: 'isfahan', label: 'Isfahan' }];
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.options = options; fixture.componentInstance.placeholder = 'Choose city'; fixture.detectChanges();
    const combobox = fixture.nativeElement.querySelector('[role=combobox]') as HTMLButtonElement;
    combobox.click(); fixture.detectChanges();
    const optionsDom = fixture.nativeElement.querySelectorAll('[role=option]') as NodeListOf<HTMLButtonElement>;
    optionsDom[1]!.click(); fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('isfahan');
    fixture.destroy();
  });
});
