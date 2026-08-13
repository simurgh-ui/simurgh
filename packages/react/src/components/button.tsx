import { forwardRef, type ButtonHTMLAttributes } from 'react';

export const Button = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
>(function Button(
  { type = 'button', loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-state={loading ? 'loading' : 'idle'}
      {...props}
    >
      {children}
    </button>
  );
});
