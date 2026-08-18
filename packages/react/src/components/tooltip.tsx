import { type PropsWithChildren } from 'react';
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
