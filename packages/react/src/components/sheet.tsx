import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './dialog.js';
import { forwardRef, type HTMLAttributes } from 'react';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';
export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;
export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;
export const SheetClose = DialogClose;
export const SheetContent = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { side?: SheetSide }
>(function SheetContent({ side = 'right', className, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent
        {...props}
        ref={ref}
        data-slot="sheet-content"
        data-side={side}
        className={className ?? 'simurgh-content simurgh-sheet'}
      />
    </DialogPortal>
  );
});
