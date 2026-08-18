export type FloatingInteractionKind =
  'popover' | 'tooltip' | 'hovercard' | 'menu' | 'listbox';

export type FloatingInteractionEvent = {
  defaultPrevented: boolean;
  key?: string;
  stopPropagation?(): void;
};

export type FloatingInteractionOptions = {
  kind: FloatingInteractionKind;
  id: string;
  getOpen(): boolean;
  setOpen(open: boolean): void;
  getReference(): HTMLElement | null;
  getFloating(): HTMLElement | null;
};

function restoreReference(reference: HTMLElement | null) {
  if (reference?.isConnected) reference.focus();
}

export function createFloatingInteractions(
  options: FloatingInteractionOptions,
) {
  const interactive =
    options.kind === 'tooltip' || options.kind === 'hovercard';
  const role =
    options.kind === 'menu'
      ? 'menu'
      : options.kind === 'listbox'
        ? 'listbox'
        : options.kind === 'tooltip'
          ? 'tooltip'
          : 'dialog';
  const referenceAttributes = {
    'data-simurgh-floating-reference': options.id,
    'aria-haspopup':
      options.kind === 'menu'
        ? ('menu' as const)
        : options.kind === 'listbox'
          ? ('listbox' as const)
          : interactive
            ? undefined
            : ('dialog' as const),
    'aria-describedby': options.kind === 'tooltip' ? options.id : undefined,
  };
  const floatingAttributes = {
    'data-simurgh-floating-content': options.id,
    id: options.kind === 'tooltip' ? options.id : undefined,
    role,
  };
  const open = (event: FloatingInteractionEvent) => {
    if (!event.defaultPrevented) options.setOpen(true);
  };
  const close = (event: FloatingInteractionEvent) => {
    if (!event.defaultPrevented) options.setOpen(false);
  };

  return {
    referenceAttributes,
    floatingAttributes,
    onReferenceClick(event: FloatingInteractionEvent) {
      if (!interactive && !event.defaultPrevented)
        options.setOpen(!options.getOpen());
    },
    onReferenceMouseEnter: interactive ? open : undefined,
    onReferenceMouseLeave: interactive ? close : undefined,
    onReferenceFocus: interactive ? open : undefined,
    onReferenceBlur: interactive ? close : undefined,
    onReferenceKeyDown(event: FloatingInteractionEvent) {
      if (!event.defaultPrevented && event.key === 'Escape') {
        event.stopPropagation?.();
        options.setOpen(false);
      }
    },
    onFloatingKeyDown(event: FloatingInteractionEvent) {
      if (!event.defaultPrevented && event.key === 'Escape') {
        event.stopPropagation?.();
        options.setOpen(false);
        restoreReference(options.getReference());
      }
    },
    listenForOutsidePress(document: Document) {
      const dismiss = (event: PointerEvent) => {
        const path = event.composedPath();
        const currentFloating = options.getFloating();
        const insideNestedFloating = path.some((node) => {
          const element = node as Element;
          if (typeof element?.getAttribute !== 'function') return false;
          const owner = element.getAttribute('data-simurgh-floating-content');
          if (!owner || !currentFloating) return false;
          return Array.from(
            document.querySelectorAll<HTMLElement>(
              '[data-simurgh-floating-reference]',
            ),
          ).some(
            (reference) =>
              reference.dataset.simurghFloatingReference === owner &&
              currentFloating.contains(reference),
          );
        });
        if (
          !path.includes(options.getReference()!) &&
          !path.includes(currentFloating!) &&
          !insideNestedFloating
        ) {
          options.setOpen(false);
          restoreReference(options.getReference());
        }
      };
      document.addEventListener('pointerdown', dismiss);
      return () => document.removeEventListener('pointerdown', dismiss);
    },
  };
}
