// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type ButtonHTMLAttributes } from 'preact/compat';

export const Button = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'destructive' | 'quiet';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    iconOnly?: boolean;
  }
>(function Button(
  {
    type = 'button',
    loading = false,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    iconOnly = false,
    disabled,
    onClick,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-slot="button"
      data-state={loading ? 'loading' : 'idle'}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-icon-only={iconOnly || undefined}
      onClick={disabled || loading ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
});
