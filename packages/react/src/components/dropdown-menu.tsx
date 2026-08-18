import { type HTMLAttributes, type PropsWithChildren } from 'react';
import {
  FloatingContent,
  FloatingRoot,
  FloatingTrigger,
  onCompositeKeyDown,
  useFloatingRoot,
} from '../internal/floating.js';
import type { OpenProps } from '../internal/open.js';

export function DropdownMenu(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="menu" />;
}
export const DropdownMenuTrigger = FloatingTrigger;
export function DropdownMenuContent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <FloatingContent
      {...props}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        onCompositeKeyDown(event, '[role=menuitem]');
      }}
    />
  );
}
export function DropdownMenuItem({
  disabled,
  onSelect,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  onSelect?: () => void;
}) {
  const c = useFloatingRoot();
  return (
    <div
      {...props}
      role="menuitem"
      tabIndex={disabled ? undefined : -1}
      aria-disabled={disabled || undefined}
      className={props.className ?? 'simurgh-item'}
      onClick={(e) => {
        props.onClick?.(e);
        if (!disabled) {
          onSelect?.();
          c.setOpen(false);
        }
      }}
    />
  );
}
