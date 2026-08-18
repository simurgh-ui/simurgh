import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react';

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  revealLabel?: string;
  concealLabel?: string;
};
export const PasswordInput = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(
  {
    revealLabel = 'Show password',
    concealLabel = 'Hide password',
    disabled,
    ...props
  },
  ref,
) {
  const [revealed, setRevealed] = useState(false);
  const id = props.id ?? `simurgh-password-${useId().replace(/:/g, '')}`;
  return (
    <div data-slot="password-input" data-disabled={disabled || undefined}>
      <input
        {...props}
        ref={ref}
        id={id}
        type={revealed ? 'text' : 'password'}
        data-slot="password-input-control"
        disabled={disabled}
      />
      <button
        type="button"
        data-slot="password-input-toggle"
        aria-controls={id}
        aria-label={revealed ? concealLabel : revealLabel}
        aria-pressed={revealed}
        disabled={disabled}
        onClick={() => setRevealed((current) => !current)}
      >
        {revealed ? 'Hide' : 'Show'}
      </button>
    </div>
  );
});
