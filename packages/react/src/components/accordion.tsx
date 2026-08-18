import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

type AccordionContextValue = {
  open: string[];
  toggle(value: string): void;
  multiple: boolean;
  id: string;
};
const AccordionContext =
  /* @__PURE__ */ createContext<AccordionContextValue | null>(null);
const AccordionItemContext = /* @__PURE__ */ createContext<string>('');
export function Accordion({
  children,
  type = 'single',
  defaultValue = [],
}: PropsWithChildren<{
  type?: 'single' | 'multiple';
  defaultValue?: string[];
}>) {
  const [open, setOpen] = useState(defaultValue);
  const multiple = type === 'multiple';
  const toggle = (value: string) =>
    setOpen((items) =>
      items.includes(value)
        ? items.filter((x) => x !== value)
        : multiple
          ? [...items, value]
          : [value],
    );
  return (
    <AccordionContext.Provider value={{ open, toggle, multiple, id: useId() }}>
      {children}
    </AccordionContext.Provider>
  );
}
export function AccordionItem({
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div {...props} />
    </AccordionItemContext.Provider>
  );
}
export function AccordionTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const c = useContext(AccordionContext)!;
  const value = useContext(AccordionItemContext);
  const open = c.open.includes(value);
  return (
    <h3>
      <button
        type="button"
        {...props}
        id={`${c.id}-trigger-${value}`}
        aria-expanded={open}
        aria-controls={`${c.id}-content-${value}`}
        onClick={(e) => {
          props.onClick?.(e);
          c.toggle(value);
        }}
      />
    </h3>
  );
}
export function AccordionContent(props: HTMLAttributes<HTMLDivElement>) {
  const c = useContext(AccordionContext)!;
  const value = useContext(AccordionItemContext);
  return c.open.includes(value) ? (
    <div
      {...props}
      role="region"
      id={`${c.id}-content-${value}`}
      aria-labelledby={`${c.id}-trigger-${value}`}
    />
  ) : null;
}
