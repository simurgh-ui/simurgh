// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { runNativeTextFormContract } from '../../core/test-utils/form-contract.js';
import { InputComponent } from '../src/components/input.js';
import { CheckboxComponent } from '../src/components/checkbox.js';
import { SwitchComponent } from '../src/components/switch.js';
import {
  RadioGroupComponent,
  RadioGroupItemDirective,
} from '../src/components/radio-group.js';
import { SelectComponent } from '../src/components/select.js';
import { ComboboxComponent } from '../src/components/combobox.js';
import { CalendarComponent } from '../src/components/calendar.js';
import { DatePickerComponent } from '../src/components/date-picker.js';
import { RatingComponent } from '../src/components/rating.js';
import { TagsInputComponent } from '../src/components/tags-input.js';
import { NumberInputComponent } from '../src/components/number-input.js';
import { TextareaComponent } from '../src/components/textarea.js';
import { NativeSelectComponent } from '../src/components/native-select.js';
import { SliderComponent } from '../src/components/slider.js';
import { InputOtpComponent } from '../src/components/input-otp.js';
import { PasswordInputComponent } from '../src/components/password-input.js';
import { FileUploadComponent } from '../src/components/file-upload.js';
import { ButtonComponent } from '../src/components/button.js';

@Component({
  standalone: true,
  imports: [InputComponent],
  template: `<form>
    <simurgh-input
      name="field"
      [value]="value"
      required
      (valueChange)="value = $event"
    />
  </form>`,
})
class NativeTextFormHost {
  value = 'initial';
}

@Component({
  standalone: true,
  imports: [
    CheckboxComponent,
    SwitchComponent,
    RadioGroupComponent,
    RadioGroupItemDirective,
    SelectComponent,
    ComboboxComponent,
    CalendarComponent,
    DatePickerComponent,
    RatingComponent,
    TagsInputComponent,
    NumberInputComponent,
    TextareaComponent,
    NativeSelectComponent,
    SliderComponent,
    InputOtpComponent,
    PasswordInputComponent,
    FileUploadComponent,
    ButtonComponent,
  ],
  template: `<form (submit)="$event.preventDefault(); submit()">
    <simurgh-textarea
      name="textarea"
      [value]="textarea"
      (valueChange)="textarea = $event"
    />
    <simurgh-native-select
      name="native-select"
      [value]="nativeSelect"
      (valueChange)="nativeSelect = $event"
      ><option value="one">One</option>
      <option value="two">Two</option></simurgh-native-select
    >
    <simurgh-slider
      name="slider"
      [value]="slider"
      (valueChange)="slider = $event"
    />
    <simurgh-input-otp
      name="input-otp"
      [value]="otp"
      (valueChange)="otp = $event"
    />
    <simurgh-password-input
      name="password-input"
      [value]="password"
      (valueChange)="password = $event"
    />
    <simurgh-file-upload name="file-upload" label="Upload" />
    <simurgh-checkbox
      name="checkbox"
      [checked]="checkbox"
      (checkedChange)="checkbox = $event"
      >Checkbox</simurgh-checkbox
    >
    <simurgh-switch
      name="switch"
      [checked]="switchValue"
      (checkedChange)="switchValue = $event"
      >Switch</simurgh-switch
    >
    <simurgh-radio-group
      name="radio-group"
      [value]="radio"
      (valueChange)="radio = $event"
    >
      <button simurghRadio="one">One</button
      ><button simurghRadio="two">Two</button>
    </simurgh-radio-group>
    <simurgh-select
      name="select"
      [options]="options"
      [value]="select"
      (valueChange)="select = $event"
    />
    <simurgh-combobox
      name="combobox"
      [options]="options"
      [value]="combobox"
      (valueChange)="combobox = $event"
    />
    <simurgh-calendar
      name="calendar"
      month="2026-08"
      [value]="calendar"
      (valueChange)="calendar = $event"
    />
    <simurgh-date-picker
      name="date-picker"
      month="2026-08"
      [value]="datePicker"
      (valueChange)="datePicker = $event"
    />
    <simurgh-rating
      name="rating"
      [value]="rating"
      (valueChange)="rating = $event"
    />
    <simurgh-tags-input
      name="tags-input"
      [value]="tags"
      (valueChange)="tags = $event"
    />
    <simurgh-number-input
      name="number-input"
      [value]="number"
      (valueChange)="number = $event"
    />
    <button simurghButton type="submit">Submit</button>
  </form>`,
})
class CustomFormHost {
  textarea = 'textarea-default';
  nativeSelect: string | string[] = 'one';
  slider = 2;
  otp = '1234';
  password = 'secret';
  checkbox = true;
  switchValue = false;
  radio = 'one';
  select = 'one';
  combobox = 'one';
  calendar = '2026-08-20';
  datePicker = '2026-08-20';
  rating = 2;
  tags = ['initial'];
  number = 3;
  options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ];
  submit = vi.fn();
}

beforeAll(() =>
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  ),
);

describe('Angular shared form contracts', () => {
  it('preserves native IME, reset, autofill, validation, serialization, and submission', async () => {
    await runNativeTextFormContract(() => {
      const fixture = TestBed.createComponent(NativeTextFormHost);
      fixture.detectChanges();
      const form = fixture.nativeElement.querySelector('form')!;
      const control = fixture.nativeElement.querySelector('input')!;
      return {
        form,
        control,
        setValue: async (value) => {
          control.value = value;
          control.dispatchEvent(new Event('input', { bubbles: true }));
          fixture.detectChanges();
        },
        flush: async () => fixture.detectChanges(),
        destroy: () => fixture.destroy(),
      };
    });
  });

  it('resets and submits every custom form-associated component without committing IME input', async () => {
    const fixture = TestBed.createComponent(CustomFormHost);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;

    const update = (selector: string, value: string, type = 'input') => {
      const control = form.querySelector(selector) as HTMLInputElement;
      control.value = value;
      control.dispatchEvent(new Event(type, { bubbles: true }));
    };
    update('textarea', 'changed');
    update('select', 'two', 'change');
    update('[data-slot=slider]', '4');
    update('[data-slot=input-otp]', '5678');
    update('[data-slot=password-input-control]', 'changed-secret');

    fixture.debugElement
      .query(By.directive(CheckboxComponent))
      .componentInstance.toggle();
    fixture.debugElement
      .query(By.directive(SwitchComponent))
      .componentInstance.toggle();
    fixture.debugElement
      .query(By.directive(RadioGroupComponent))
      .componentInstance.select('two');
    fixture.debugElement
      .query(By.directive(SelectComponent))
      .componentInstance.select('two');
    fixture.debugElement
      .query(By.directive(ComboboxComponent))
      .componentInstance.choose(host.options[1]);
    fixture.debugElement
      .query(By.directive(CalendarComponent))
      .componentInstance.choose('2026-08-21');
    fixture.debugElement
      .query(By.directive(DatePickerComponent))
      .componentInstance.choose('2026-08-21');
    fixture.debugElement
      .query(By.directive(RatingComponent))
      .componentInstance.select(4);
    const tags = fixture.debugElement.query(
      By.directive(TagsInputComponent),
    ).componentInstance;
    tags.draft = 'درود';
    tags.handleKeydown(
      new KeyboardEvent('keydown', { key: 'Enter', isComposing: true }),
    );
    expect(new FormData(form).getAll('tags-input')).toEqual(['initial']);
    tags.handleKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.debugElement
      .query(By.directive(NumberInputComponent))
      .componentInstance.changeBy(1);
    fixture.detectChanges();

    form.requestSubmit();
    fixture.detectChanges();
    expect(host.submit).toHaveBeenCalledOnce();
    form.reset();
    await Promise.resolve();
    fixture.detectChanges();

    const data = new FormData(form);
    expect(data.get('textarea')).toBe('textarea-default');
    expect(data.get('native-select')).toBe('one');
    expect(data.get('slider')).toBe('2');
    expect(data.get('input-otp')).toBe('1234');
    expect(data.get('password-input')).toBe('secret');
    expect(host.checkbox).toBe(true);
    expect(form.elements.namedItem('checkbox')).toHaveProperty('checked', true);
    expect(data.get('checkbox')).toBe('on');
    expect(data.get('switch')).toBeNull();
    expect(data.get('radio-group')).toBe('one');
    expect(data.get('select')).toBe('one');
    expect(data.get('combobox')).toBe('one');
    expect(data.get('calendar')).toBe('2026-08-20');
    expect(data.get('date-picker')).toBe('2026-08-20');
    expect(data.get('rating')).toBe('2');
    expect(data.getAll('tags-input')).toEqual(['initial']);
    expect(form.elements.namedItem('number-input')).toHaveProperty(
      'value',
      '3',
    );
    fixture.destroy();
  }, 15_000);
});
