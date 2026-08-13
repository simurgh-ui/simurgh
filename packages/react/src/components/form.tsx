import {
  forwardRef,
  useRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
} from 'react';

export const Form = /* @__PURE__ */ forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean }
>(function Form({ focusInvalid = true, onInvalid, ...props }, ref) {
  const focusQueued = useRef(false);
  return (
    <form
      {...props}
      ref={ref}
      data-slot="form"
      onInvalid={(event) => {
        onInvalid?.(event);
        if (focusQueued.current || !focusInvalid || event.defaultPrevented)
          return;
        focusQueued.current = true;
        const first = event.target as HTMLElement;
        requestAnimationFrame(() => {
          first.focus();
          focusQueued.current = false;
        });
      }}
    />
  );
});
export const FormErrorSummary = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function FormErrorSummary(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      data-slot="form-error-summary"
    />
  );
});
