import { defineComponent, h, type PropType } from 'vue';
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
export const DrawerContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghDrawerContent',
  props: {
    side: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(SheetContent, { ...attrs, side: props.side, 'data-drawer': '' }, slots);
  },
});
