import {
  FloatingContent,
  FloatingTrigger,
  floatingRoot,
} from '../internal/floating-parts.js';

export const Tooltip = /* @__PURE__ */ floatingRoot(
  'SimurghTooltip',
  'tooltip',
);
export const TooltipTrigger = FloatingTrigger;
export const TooltipContent = FloatingContent;
