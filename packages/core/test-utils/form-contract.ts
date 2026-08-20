import { expect, vi } from 'vitest';

export const formCapabilityMatrix = {
  button: ['submission'],
  input: [
    'ime',
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  textarea: [
    'ime',
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  'native-select': [
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  slider: ['reset', 'serialization', 'validation', 'submission'],
  'input-otp': [
    'ime',
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  'password-input': [
    'ime',
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  'number-input': [
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  'file-upload': ['reset', 'serialization', 'validation', 'submission'],
  checkbox: ['reset', 'serialization', 'validation', 'submission'],
  switch: ['reset', 'serialization', 'validation', 'submission'],
  'radio-group': ['reset', 'serialization', 'validation', 'submission'],
  select: ['reset', 'serialization', 'validation', 'submission'],
  combobox: [
    'ime',
    'reset',
    'serialization',
    'autofill',
    'validation',
    'submission',
  ],
  calendar: ['reset', 'serialization', 'validation', 'submission'],
  'date-picker': ['reset', 'serialization', 'validation', 'submission'],
  rating: ['reset', 'serialization', 'validation', 'submission'],
  'tags-input': ['ime', 'reset', 'serialization', 'validation', 'submission'],
} as const;

export type FormCapability =
  (typeof formCapabilityMatrix)[keyof typeof formCapabilityMatrix][number];

export type NativeTextContractHarness = {
  form: HTMLFormElement;
  control: HTMLInputElement | HTMLTextAreaElement;
  setValue(value: string): Promise<void>;
  flush(): Promise<void>;
  destroy(): void;
};

export async function runNativeTextFormContract(
  createHarness: () => NativeTextContractHarness,
) {
  const harness = createHarness();
  const submitted = vi.fn((event: Event) => event.preventDefault());
  harness.form.addEventListener('submit', submitted);
  try {
    expect(harness.control.defaultValue).toBe('initial');
    harness.control.dispatchEvent(
      new CompositionEvent('compositionstart', { bubbles: true, data: 'آ' }),
    );
    await harness.setValue('آ');
    harness.control.dispatchEvent(
      new CompositionEvent('compositionend', { bubbles: true, data: 'آ' }),
    );
    expect(harness.control.value).toBe('آ');

    await harness.setValue('autofilled@example.com');
    expect(new FormData(harness.form).get('field')).toBe(
      'autofilled@example.com',
    );

    harness.form.dispatchEvent(new SubmitEvent('submit', { bubbles: true }));
    expect(submitted).toHaveBeenCalledOnce();

    harness.control.value = '';
    expect(harness.control.checkValidity()).toBe(false);
    expect(harness.form.checkValidity()).toBe(false);

    harness.form.reset();
    await harness.flush();
    expect(harness.control.value).toBe('initial');
  } finally {
    harness.form.removeEventListener('submit', submitted);
    harness.destroy();
  }
}
