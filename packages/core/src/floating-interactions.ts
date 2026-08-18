export type FloatingInteractionKind =
  'popover' | 'tooltip' | 'hovercard' | 'menu' | 'listbox';

export type FloatingInteractionEvent = {
  defaultPrevented: boolean;
  key?: string;
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
      if (!event.defaultPrevented && event.key === 'Escape')
        options.setOpen(false);
    },
    onFloatingKeyDown(event: FloatingInteractionEvent) {
      if (!event.defaultPrevented && event.key === 'Escape') {
        options.setOpen(false);
        restoreReference(options.getReference());
      }
    },
    listenForOutsidePress(document: Document) {
      const dismiss = (event: PointerEvent) => {
        const path = event.composedPath();
        if (
          !path.includes(options.getReference()!) &&
          !path.includes(options.getFloating()!)
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
