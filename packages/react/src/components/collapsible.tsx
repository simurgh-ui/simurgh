import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

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
  const c = useContext(CollapsibleContext)!;
  return (
    <button
      type="button"
      {...props}
      aria-expanded={c.open}
      aria-controls={`${c.id}-content`}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented && !props.disabled) c.toggle();
      }}
    />
  );
}
export function CollapsibleContent(props: HTMLAttributes<HTMLDivElement>) {
  const c = useContext(CollapsibleContext)!;
  return (
    <div
      {...props}
      id={`${c.id}-content`}
      hidden={!c.open}
      data-state={c.open ? 'open' : 'closed'}
    />
  );
}
