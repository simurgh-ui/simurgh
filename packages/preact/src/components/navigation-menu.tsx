// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
} from 'preact/compat';

export const NavigationMenu = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { label?: string }
>(function NavigationMenu({ label = 'Main navigation', ...props }, ref) {
  return (
    <nav ref={ref} aria-label={label} data-slot="navigation-menu" {...props} />
  );
});

export const NavigationMenuList = /* @__PURE__ */ forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(function NavigationMenuList(props, ref) {
  return <ul ref={ref} data-slot="navigation-menu-list" {...props} />;
});

export const NavigationMenuItem = /* @__PURE__ */ forwardRef<
  HTMLLIElement,
  LiHTMLAttributes<HTMLLIElement>
>(function NavigationMenuItem(props, ref) {
  return <li ref={ref} data-slot="navigation-menu-item" {...props} />;
});

export const NavigationMenuLink = /* @__PURE__ */ forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean }
>(function NavigationMenuLink({ current = false, ...props }, ref) {
  return (
    <a
      ref={ref}
      {...props}
      aria-current={current ? 'page' : props['aria-current']}
      data-slot="navigation-menu-link"
    />
  );
});
