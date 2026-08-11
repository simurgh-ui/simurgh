import { defineComponent, h, type PropType } from 'vue';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog.js';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;
export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;
export const SheetClose = DialogClose;
export const SheetContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghSheetContent',
  props: {
    side: { type: String as PropType<SheetSide>, default: 'right' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        DialogContent,
        {
          ...attrs,
          'data-slot': 'sheet-content',
          'data-side': props.side,
          class: ['simurgh-sheet', attrs.class],
        },
        slots,
      );
  },
});
