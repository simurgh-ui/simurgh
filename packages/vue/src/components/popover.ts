import {
  FloatingContent,
  FloatingTrigger,
  floatingRoot,
} from '../internal/floating-parts.js';

export const Popover = /* @__PURE__ */ floatingRoot(
  'SimurghPopover',
  'popover',
);
export const PopoverTrigger = FloatingTrigger;
export const PopoverContent = FloatingContent;
