import { forwardRef, type AnchorHTMLAttributes } from 'react';

export const Link = /* @__PURE__ */ forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
    external?: boolean;
  }
>(function Link(
  {
    disabled = false,
    external = false,
    href,
    onClick,
    rel,
    target,
    tabIndex,
    ...props
  },
  ref,
) {
  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      data-slot="link"
      data-external={external || undefined}
      rel={external ? (rel ?? 'noopener noreferrer') : rel}
      target={external ? (target ?? '_blank') : target}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
});
