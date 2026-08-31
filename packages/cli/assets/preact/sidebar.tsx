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
import type { OpenProps } from '../internal/open.js';

type SidebarContextValue = {
  open: boolean;
  setOpen(open: boolean): void;
  contentId: string;
};
const SidebarContext =
  /* @__PURE__ */ createContext<SidebarContextValue | null>(null);
function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('Sidebar components require SidebarProvider');
  return context;
}

export function SidebarProvider({
  open: controlledOpen,
  defaultOpen = true,
  onOpenChange,
  children,
}: PropsWithChildren<OpenProps>) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? localOpen;
  const contentId = `simurgh-sidebar-${useId().replace(/:/g, '')}`;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  };
  return (
    <SidebarContext.Provider value={{ open, setOpen, contentId }}>
      <div data-slot="sidebar-provider" data-state={open ? 'open' : 'closed'}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = 'start',
  ...props
}: HTMLAttributes<HTMLElement> & { side?: 'start' | 'end' }) {
  const context = useSidebarContext();
  return (
    <aside
      {...props}
      id={context.contentId}
      data-slot="sidebar"
      data-side={side}
      data-state={context.open ? 'open' : 'closed'}
      hidden={!context.open}
    />
  );
}

export function SidebarTrigger({
  onClick,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useSidebarContext();
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      data-slot="sidebar-trigger"
      aria-controls={context.contentId}
      aria-expanded={context.open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setOpen(!context.open);
      }}
    >
      {children ?? (context.open ? 'Close navigation' : 'Open navigation')}
    </button>
  );
}

function sidebarPart(slot: string) {
  return function SidebarPart(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} data-slot={slot} />;
  };
}
export const SidebarHeader = /* @__PURE__ */ sidebarPart('sidebar-header');
export const SidebarContent = /* @__PURE__ */ sidebarPart('sidebar-content');
export const SidebarFooter = /* @__PURE__ */ sidebarPart('sidebar-footer');
export const SidebarGroup = /* @__PURE__ */ sidebarPart('sidebar-group');
export function SidebarMenu(props: HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} data-slot="sidebar-menu" />;
}
