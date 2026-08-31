// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useEffect, useRef, type MutableRefObject } from 'preact/compat';
import { listenFormReset } from '@simurgh-ui/core';
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

export function useFormReset<
  T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
>(reset: () => void) {
  const control = useRef<T | null>(null);
  useEffect(() => {
    if (!control.current) return;
    return listenFormReset(control.current, reset);
  }, [reset]);
  return control;
}
