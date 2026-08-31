// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'preact/compat';

type CollapsibleContextValue = { open: boolean; toggle(): void; id: string };
const CollapsibleContext =
  /* @__PURE__ */ createContext<CollapsibleContextValue | null>(null);
export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}>) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const expanded = open ?? localOpen;
  const toggle = () => {
    const next = !expanded;
    if (open === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  };
  return (
    <CollapsibleContext.Provider
      value={{ open: expanded, toggle, id: useId() }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const context = useContext(CollapsibleContext)!;
  return (
    <button
      type="button"
      {...props}
      aria-expanded={context.open}
      aria-controls={`${context.id}-content`}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented && !props.disabled) context.toggle();
      }}
    />
  );
}

export function CollapsibleContent(props: HTMLAttributes<HTMLDivElement>) {
  const context = useContext(CollapsibleContext)!;
  return (
    <div
      {...props}
      id={`${context.id}-content`}
      hidden={!context.open}
      data-state={context.open ? 'open' : 'closed'}
    />
  );
}
