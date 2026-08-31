// @vitest-environment jsdom
import { act, fireEvent, render } from '@testing-library/preact';
import React from 'preact/compat';
import { describe, expect, it, vi } from 'vitest';
import { runNativeTextFormContract } from '../../core/test-utils/form-contract.js';
import { Input } from '../src/components/input.js';
import { Textarea } from '../src/components/textarea.js';
import { NativeSelect } from '../src/components/native-select.js';
import { Slider } from '../src/components/slider.js';
import { InputOtp } from '../src/components/input-otp.js';
import { PasswordInput } from '../src/components/password-input.js';
import { NumberInput } from '../src/components/number-input.js';
import { FileUpload } from '../src/components/file-upload.js';
import { Checkbox } from '../src/components/checkbox.js';
import { Switch } from '../src/components/switch.js';
import { RadioGroup, RadioGroupItem } from '../src/components/radio-group.js';
import { Select } from '../src/components/select.js';
import { Combobox } from '../src/components/combobox.js';
import { Calendar } from '../src/components/calendar.js';
import { DatePicker } from '../src/components/date-picker.js';
import { Rating } from '../src/components/rating.js';
import { TagsInput } from '../src/components/tags-input.js';
import { Button } from '../src/components/button.js';

describe('React shared form contracts', () => {
  it('preserves native IME, reset, autofill, validation, serialization, and submission', async () => {
    await runNativeTextFormContract(() => {
      const view = render(
        <form>
          <Input name="field" defaultValue="initial" required />
        </form>,
      );
      const form = view.container.querySelector('form')!;
      const control = view.container.querySelector('input')!;
      return {
        form,
        control,
        setValue: async (value) =>
          fireEvent.input(control, { target: { value } }),
        flush: async () => undefined,
        destroy: view.unmount,
      };
    });
  });

  it('resets and submits every form-capable component without committing IME input', async () => {
    const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const view = render(
      <form onSubmit={submit}>
        <Input name="input" defaultValue="input-default" />
        <Textarea name="textarea" defaultValue="textarea-default" />
        <NativeSelect name="native-select" defaultValue="one">
          <option value="one">One</option>
          <option value="two">Two</option>
        </NativeSelect>
        <Slider name="slider" defaultValue={2} min={1} max={5} />
        <InputOtp name="input-otp" defaultValue="1234" length={4} />
        <PasswordInput name="password-input" defaultValue="secret" />
        <NumberInput name="number-input" defaultValue={3} />
        <FileUpload name="file-upload" label="Upload" />
        <Checkbox name="checkbox" defaultChecked>
          Checkbox
        </Checkbox>
        <Switch name="switch">Switch</Switch>
        <RadioGroup name="radio-group" defaultValue="one">
          <RadioGroupItem value="one">One</RadioGroupItem>
          <RadioGroupItem value="two">Two</RadioGroupItem>
        </RadioGroup>
        <Select
          name="select"
          defaultValue="one"
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
        <Combobox
          name="combobox"
          defaultValue="one"
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
        <Calendar name="calendar" defaultValue="2026-08-20" />
        <DatePicker name="date-picker" defaultValue="2026-08-20" />
        <Rating name="rating" defaultValue={2} />
        <TagsInput name="tags-input" defaultValue={['initial']} />
        <Button type="submit">Submit</Button>
      </form>,
    );
    const form = view.container.querySelector('form')!;

    fireEvent.click(view.getByRole('checkbox', { name: 'Checkbox' }));
    fireEvent.click(view.getByRole('switch', { name: 'Switch' }));
    fireEvent.click(view.getByRole('radio', { name: 'Two' }));
    fireEvent.click(view.getByRole('radio', { name: '4 of 5' }));
    fireEvent.click(
      view.container.querySelector<HTMLElement>('[data-slot=select-trigger]')!,
    );
    fireEvent.click(
      document.querySelectorAll<HTMLElement>('[data-slot=select-option]')[1]!,
    );
    const combobox = view.container.querySelector<HTMLInputElement>(
      'input[role=combobox]',
    )!;
    fireEvent.change(combobox, { target: { value: 'Two' } });
    fireEvent.click(view.getAllByRole('option', { name: 'Two' }).at(-1)!);
    fireEvent.click(
      view.container.querySelector<HTMLElement>(
        '[data-slot=calendar] [data-date="2026-08-21"]',
      )!,
    );
    fireEvent.click(
      view.container.querySelector<HTMLElement>(
        '[data-slot=date-picker-trigger]',
      )!,
    );
    fireEvent.click(
      document.querySelector<HTMLElement>(
        '[data-slot=date-picker-content] [data-date="2026-08-21"]',
      )!,
    );
    const tags = view.getByRole('textbox', { name: 'Add a tag' });
    fireEvent.change(tags, { target: { value: 'درود' } });
    fireEvent.keyDown(tags, { key: 'Enter', isComposing: true });
    expect(new FormData(form).getAll('tags-input')).toEqual(['initial']);
    fireEvent.keyDown(tags, { key: 'Enter' });
    expect(new FormData(form).getAll('tags-input')).toEqual([
      'initial',
      'درود',
    ]);
    fireEvent.click(view.getByRole('button', { name: 'Increase value' }));

    const changed = new FormData(form);
    expect(changed.get('select')).toBe('two');
    expect(changed.get('combobox')).toBe('two');
    expect(changed.get('calendar')).toBe('2026-08-21');
    expect(changed.get('date-picker')).toBe('2026-08-21');

    form.requestSubmit();
    expect(submit).toHaveBeenCalledOnce();
    await act(async () => form.reset());

    const data = new FormData(form);
    expect(data.get('input')).toBe('input-default');
    expect(data.get('textarea')).toBe('textarea-default');
    expect(data.get('native-select')).toBe('one');
    expect(data.get('slider')).toBe('2');
    expect(data.get('input-otp')).toBe('1234');
    expect(data.get('password-input')).toBe('secret');
    expect(data.get('number-input')).toBe('3');
    expect(data.get('checkbox')).toBe('on');
    expect(data.get('switch')).toBeNull();
    expect(data.get('radio-group')).toBe('one');
    expect(data.get('select')).toBe('one');
    expect(data.get('combobox')).toBe('one');
    expect(data.get('calendar')).toBe('2026-08-20');
    expect(data.get('date-picker')).toBe('2026-08-20');
    expect(data.get('rating')).toBe('2');
    expect(data.getAll('tags-input')).toEqual(['initial']);
  }, 15_000);
});
