import { defineComponent, h, inject } from 'vue';
import { compositeKeydown } from '../internal/composite-keydown.js';
import {
  FloatingContent,
  FloatingTrigger,
  floatingKey,
  floatingRoot,
} from '../internal/floating-parts.js';

export const DropdownMenu = /* @__PURE__ */ floatingRoot(
  'SimurghDropdownMenu',
  'menu',
);
export const DropdownMenuTrigger = FloatingTrigger;
export const DropdownMenuContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghDropdownMenuContent',
  setup(_, { slots, attrs }) {
    return () =>
      h(
        FloatingContent,
        {
          ...attrs,
          onKeydown: (event: KeyboardEvent) =>
            compositeKeydown(event, '[role=menuitem]'),
        },
        slots,
      );
  },
});
export const DropdownMenuItem = /* @__PURE__ */ defineComponent({
  name: 'SimurghDropdownMenuItem',
  props: { disabled: Boolean },
  emits: ['select'],
  setup(props, { slots, attrs, emit }) {
    const context = inject(floatingKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'menuitem',
          tabindex: props.disabled ? undefined : -1,
          'aria-disabled': props.disabled || undefined,
          class: ['simurgh-item', attrs.class],
          onClick: () => {
            if (!props.disabled) {
              emit('select');
              context.setOpen(false);
            }
          },
        },
        slots.default?.(),
      );
  },
});
