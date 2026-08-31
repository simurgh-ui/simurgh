// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'preact/compat';
import {
  FloatingContent,
  FloatingRoot,
  FloatingTrigger,
} from '../internal/floating.js';
import type { OpenProps } from '../internal/open.js';

export function HoverCard(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="hovercard" />;
}
export const HoverCardTrigger = /* @__PURE__ */ forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function HoverCardTrigger(props, ref) {
  return (
    <FloatingTrigger {...props} ref={ref} data-slot="hover-card-trigger" />
  );
});
export function HoverCardContent({
  label = 'Additional information',
  ...props
}: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  return (
    <FloatingContent
      {...props}
      role="dialog"
      aria-label={label}
      data-slot="hover-card-content"
    />
  );
}
