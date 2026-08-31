// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'preact/compat';

export function Tree({
  onKeyDown,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  const rootRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const items =
      rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="treeitem"]');
    items?.forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
  }, []);
  const focusItem = (
    items: HTMLButtonElement[],
    current: number,
    target: number,
  ) => {
    if (target < 0 || target === current) return;
    items[current]?.setAttribute('tabindex', '-1');
    if (items[target]) {
      items[target].tabIndex = 0;
      items[target].focus();
    }
  };
  const moveFocus = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const root = event.currentTarget;
    const items = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[role="treeitem"]'),
    ).filter(
      (item) => !item.disabled && !item.closest('[role="group"][hidden]'),
    );
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    let target = current;
    if (event.key === 'ArrowDown')
      target = Math.min(current + 1, items.length - 1);
    else if (event.key === 'ArrowUp') target = Math.max(current - 1, 0);
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = items.length - 1;
    else if (event.key === 'ArrowRight' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'false') item.click();
      else {
        const child = item
          .closest('li')
          ?.querySelector<HTMLButtonElement>(
            '[role="group"] [role="treeitem"]',
          );
        if (child) focusItem(items, current, items.indexOf(child));
      }
      event.preventDefault();
      return;
    } else if (event.key === 'ArrowLeft' && current >= 0) {
      const item = items[current]!;
      if (item.getAttribute('aria-expanded') === 'true') item.click();
      else {
        const parent = item.parentElement?.parentElement
          ?.closest('li')
          ?.querySelector<HTMLButtonElement>(':scope > [role="treeitem"]');
        if (parent) focusItem(items, current, items.indexOf(parent));
      }
      event.preventDefault();
      return;
    } else return;
    if (target !== current && target >= 0) {
      event.preventDefault();
      focusItem(items, current, target);
    }
  };
  return (
    <ul
      {...props}
      ref={rootRef}
      role="tree"
      data-slot="tree"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) moveFocus(event);
      }}
    />
  );
}

type TreeItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & {
  label: ReactNode;
  children?: ReactNode;
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};
export function TreeItem({
  label,
  children,
  expandable = children !== undefined,
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onExpandedChange,
  ...props
}: TreeItemProps) {
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? localExpanded;
  const groupId = `simurgh-tree-group-${useId().replace(/:/g, '')}`;
  const setExpanded = (next: boolean) => {
    if (controlledExpanded === undefined) setLocalExpanded(next);
    onExpandedChange?.(next);
  };
  return (
    <li {...props} role="none" data-slot="tree-node">
      <button
        type="button"
        role="treeitem"
        data-slot="tree-item"
        aria-expanded={expandable ? expanded : undefined}
        aria-controls={expandable ? groupId : undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={-1}
        onClick={() => expandable && setExpanded(!expanded)}
      >
        {label}
      </button>
      {expandable && (
        <ul id={groupId} role="group" data-slot="tree-group" hidden={!expanded}>
          {children}
        </ul>
      )}
    </li>
  );
}
