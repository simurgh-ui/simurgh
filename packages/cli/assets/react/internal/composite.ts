import {
  nextIndex,
  typeaheadIndex,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';
import type { KeyboardEvent } from 'react';

export function moveCompositeFocus(
  event: KeyboardEvent<HTMLElement>,
  selector: string,
  options: {
    direction?: Direction;
    orientation?: Orientation;
    activate?: boolean;
  } = {},
) {
  const items = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(selector),
  );
  const current = items.indexOf(document.activeElement as HTMLElement);
  const directional = nextIndex(current, items.length, event.key, options);
  const target =
    directional === current
      ? typeaheadIndex(
          items.map((item) => item.textContent ?? ''),
          current,
          event.key,
        )
      : directional;
  if (target === current) return false;
  event.preventDefault();
  items[target]?.focus();
  if (options.activate) items[target]?.click();
  return true;
}
