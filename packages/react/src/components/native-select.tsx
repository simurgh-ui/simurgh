import { forwardRef, type SelectHTMLAttributes } from 'react';

export const NativeSelect = /* @__PURE__ */ forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(function NativeSelect({ invalid = false, ...props }, ref) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      data-slot="native-select"
      {...props}
    />
  );
});
