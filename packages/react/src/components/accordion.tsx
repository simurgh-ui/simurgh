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
        ? items.filter((item) => item !== value)
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
  const context = useContext(AccordionContext)!;
  const value = useContext(AccordionItemContext);
  const open = context.open.includes(value);
  return (
    <h3>
      <button
        type="button"
        {...props}
        id={`${context.id}-trigger-${value}`}
        aria-expanded={open}
        aria-controls={`${context.id}-content-${value}`}
        onClick={(event) => {
          props.onClick?.(event);
          context.toggle(value);
        }}
      />
    </h3>
  );
}

export function AccordionContent(props: HTMLAttributes<HTMLDivElement>) {
  const context = useContext(AccordionContext)!;
  const value = useContext(AccordionItemContext);
  return context.open.includes(value) ? (
    <div
      {...props}
      role="region"
      id={`${context.id}-content-${value}`}
      aria-labelledby={`${context.id}-trigger-${value}`}
    />
  ) : null;
}
