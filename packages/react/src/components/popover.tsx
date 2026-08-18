import { type PropsWithChildren } from 'react';
import {
  FloatingContent,
  FloatingRoot,
  FloatingTrigger,
} from '../internal/floating.js';
import type { OpenProps } from '../internal/open.js';

export function Popover(props: PropsWithChildren<OpenProps>) {
  return <FloatingRoot {...props} kind="popover" />;
}
export const PopoverTrigger = FloatingTrigger;
export const PopoverContent = FloatingContent;
