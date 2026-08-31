// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  forwardRef,
  type CSSProperties,
  type InputHTMLAttributes,
} from 'preact/compat';

export const InputOtp = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength'> & {
    length?: number;
    digitsOnly?: boolean;
    invalid?: boolean;
  }
>(function InputOtp(
  {
    length = 6,
    digitsOnly = true,
    invalid = false,
    autoComplete = 'one-time-code',
    inputMode,
    pattern,
    style,
    onInput,
    ...props
  },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      maxLength={length}
      autoComplete={autoComplete}
      inputMode={inputMode ?? (digitsOnly ? 'numeric' : 'text')}
      pattern={pattern ?? (digitsOnly ? '[0-9]*' : undefined)}
      aria-invalid={invalid || undefined}
      data-slot="input-otp"
      style={{ '--simurgh-otp-length': length, ...style } as CSSProperties}
      onInput={(event) => {
        if (digitsOnly) {
          event.currentTarget.value = event.currentTarget.value
            .replace(/\D/g, '')
            .slice(0, length);
        }
        onInput?.(event);
      }}
      {...props}
    />
  );
});
