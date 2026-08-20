// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/vue';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { runNativeTextFormContract } from '../../core/test-utils/form-contract.js';
import { Input } from '../src/components/input.js';
import { Checkbox } from '../src/components/checkbox.js';
import { Switch } from '../src/components/switch.js';
import { RadioGroup, RadioGroupItem } from '../src/components/radio-group.js';
import { Select } from '../src/components/select.js';
import { Combobox } from '../src/components/combobox.js';
import { Calendar } from '../src/components/calendar.js';
import { DatePicker } from '../src/components/date-picker.js';
import { Rating } from '../src/components/rating.js';
import { TagsInput } from '../src/components/tags-input.js';
import { NumberInput } from '../src/components/number-input.js';
import { Textarea } from '../src/components/textarea.js';
import { NativeSelect } from '../src/components/native-select.js';
import { Slider } from '../src/components/slider.js';
import { InputOtp } from '../src/components/input-otp.js';
import { PasswordInput } from '../src/components/password-input.js';
import { FileUpload } from '../src/components/file-upload.js';
import { Button } from '../src/components/button.js';

describe('Vue shared form contracts', () => {
  it('preserves native IME, reset, autofill, validation, serialization, and submission', async () => {
    await runNativeTextFormContract(() => {
      const view = render({
        components: { Input },
        data: () => ({ value: 'initial' }),
        template: `<form><Input v-model="value" name="field" required /></form>`,
      });
      const form = view.container.querySelector('form')!;
      const control = view.container.querySelector('input')!;
      return {
        form,
        control,
        setValue: async (value) => {
          await fireEvent.update(control, value);
          await nextTick();
        },
        flush: nextTick,
        destroy: view.unmount,
      };
    });
  });

  it('resets and submits every custom form-associated component without committing IME input', async () => {
    const submit = vi.fn();
    const view = render({
      components: {
        Checkbox,
        Switch,
        RadioGroup,
        RadioGroupItem,
        Select,
        Combobox,
        Calendar,
        DatePicker,
        Rating,
        TagsInput,
        NumberInput,
        Textarea,
        NativeSelect,
        Slider,
        InputOtp,
        PasswordInput,
        FileUpload,
        Button,
      },
      setup: () => ({ submit }),
      data: () => ({
        textarea: 'textarea-default',
        nativeSelect: 'one',
        slider: 2,
        otp: '1234',
        password: 'secret',
        checkbox: true,
        switchValue: false,
        radio: 'one',
        select: 'one',
        combobox: 'one',
        calendar: '2026-08-20',
        datePicker: '2026-08-20',
        rating: 2,
        tags: ['initial'],
        number: 3,
        options: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ],
      }),
      template: `<form @submit.prevent="submit">
        <Textarea v-model="textarea" name="textarea" />
        <NativeSelect v-model="nativeSelect" name="native-select"><option value="one">One</option><option value="two">Two</option></NativeSelect>
        <Slider v-model="slider" name="slider" />
        <InputOtp v-model="otp" name="input-otp" />
        <PasswordInput v-model="password" name="password-input" />
        <FileUpload name="file-upload" label="Upload" />
        <Checkbox v-model="checkbox" name="checkbox">Checkbox</Checkbox>
        <Switch v-model="switchValue" name="switch">Switch</Switch>
        <RadioGroup v-model="radio" name="radio-group"><RadioGroupItem value="one">One</RadioGroupItem><RadioGroupItem value="two">Two</RadioGroupItem></RadioGroup>
        <Select v-model="select" name="select" :options="options" />
        <Combobox v-model="combobox" name="combobox" :options="options" />
        <Calendar v-model="calendar" name="calendar" />
        <DatePicker v-model="datePicker" name="date-picker" />
        <Rating v-model="rating" name="rating" />
        <TagsInput v-model="tags" name="tags-input" />
        <NumberInput v-model="number" name="number-input" />
        <Button type="submit">Submit</Button>
      </form>`,
    });
    const form = view.container.querySelector('form')!;

    await fireEvent.update(
      view.container.querySelector('textarea')!,
      'changed',
    );
    await fireEvent.update(view.container.querySelector('select')!, 'two');
    await fireEvent.update(
      view.container.querySelector('[data-slot=slider]')!,
      '4',
    );
    await fireEvent.update(
      view.container.querySelector('[data-slot=input-otp]')!,
      '5678',
    );
    await fireEvent.update(
      view.container.querySelector('[data-slot=password-input-control]')!,
      'changed-secret',
    );

    await fireEvent.click(view.getByRole('checkbox', { name: 'Checkbox' }));
    await fireEvent.click(view.getByRole('switch', { name: 'Switch' }));
    await fireEvent.click(view.getByRole('radio', { name: 'Two' }));
    await fireEvent.click(view.getByRole('radio', { name: '4 of 5' }));
    await fireEvent.click(
      view.container.querySelector('[data-slot=select-trigger]')!,
    );
    await fireEvent.click(
      document.querySelectorAll('[data-slot=select-option]')[1]!,
    );
    const combo = view.container.querySelector<HTMLInputElement>(
      'input[role=combobox]',
    )!;
    await fireEvent.update(combo, 'Two');
    await fireEvent.click(view.getAllByRole('option', { name: 'Two' }).at(-1)!);
    await fireEvent.click(
      view.container.querySelector(
        '[data-slot=calendar] [data-date="2026-08-21"]',
      )!,
    );
    await fireEvent.click(
      view.container.querySelector('[data-slot=date-picker-trigger]')!,
    );
    await fireEvent.click(
      document.querySelector(
        '[data-slot=date-picker-content] [data-date="2026-08-21"]',
      )!,
    );
    const tags = view.getByRole('textbox', { name: 'Add a tag' });
    await fireEvent.update(tags, 'درود');
    await fireEvent.keyDown(tags, { key: 'Enter', isComposing: true });
    expect(new FormData(form).getAll('tags-input')).toEqual(['initial']);
    await fireEvent.keyDown(tags, { key: 'Enter' });
    await fireEvent.click(view.getByRole('button', { name: 'Increase value' }));

    form.requestSubmit();
    await nextTick();
    expect(submit).toHaveBeenCalledOnce();
    form.reset();
    await nextTick();

    const data = new FormData(form);
    expect(data.get('textarea')).toBe('textarea-default');
    expect(data.get('native-select')).toBe('one');
    expect(data.get('slider')).toBe('2');
    expect(data.get('input-otp')).toBe('1234');
    expect(data.get('password-input')).toBe('secret');
    expect(data.get('checkbox')).toBe('on');
    expect(data.get('switch')).toBeNull();
    expect(data.get('radio-group')).toBe('one');
    expect(data.get('select')).toBe('one');
    expect(data.get('combobox')).toBe('one');
    expect(data.get('calendar')).toBe('2026-08-20');
    expect(data.get('date-picker')).toBe('2026-08-20');
    expect(data.get('rating')).toBe('2');
    expect(data.getAll('tags-input')).toEqual(['initial']);
    expect(
      view.container.querySelector<HTMLInputElement>(
        '[data-slot=number-input-control]',
      )?.value,
    ).toBe('3');
  }, 15_000);
});
