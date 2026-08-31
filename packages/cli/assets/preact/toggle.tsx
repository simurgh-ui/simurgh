// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, useState, type ButtonHTMLAttributes } from 'preact/compat';

export const Toggle = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  }
>(function Toggle(
  {
    pressed,
    defaultPressed = false,
    onPressedChange,
    disabled,
    type = 'button',
    onClick,
    ...props
  },
  ref,
) {
  const [localPressed, setLocalPressed] = useState(defaultPressed);
  const current = pressed ?? localPressed;
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={current}
      data-state={current ? 'on' : 'off'}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        const next = !current;
        if (pressed === undefined) setLocalPressed(next);
        onPressedChange?.(next);
      }}
      {...props}
    />
  );
});
