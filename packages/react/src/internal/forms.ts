import type { MutableRefObject } from 'react';
import { focusAfterFrame } from './focus.js';

export function queueInvalidFocus(
  target: EventTarget | null,
  queued: MutableRefObject<boolean>,
) {
  if (queued.current) return;
  queued.current = true;
  focusAfterFrame(target instanceof Element ? target : null);
  requestAnimationFrame(() => {
    queued.current = false;
  });
}
