// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { type PropsWithChildren } from 'preact/compat';
import {
  FloatingContent,
  FloatingRoot,
  FloatingTrigger,
} from '../internal/floating.js';
import type { OpenProps } from '../internal/open.js';

export function Tooltip(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="tooltip" />;
}
export const TooltipTrigger = FloatingTrigger;
export const TooltipContent = FloatingContent;
