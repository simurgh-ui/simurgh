import { forwardRef, type HTMLAttributes } from 'react';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog.js';
import { SheetContent } from './sheet.js';

export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;
export const DrawerTitle = DialogTitle;
export const DrawerDescription = DialogDescription;
export const DrawerClose = DialogClose;
export const DrawerContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { side?: 'top' | 'bottom' }
>(function DrawerContent({ side = 'bottom', ...props }, ref) {
  return <SheetContent {...props} ref={ref} side={side} data-drawer="" />;
});
