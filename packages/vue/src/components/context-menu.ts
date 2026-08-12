import {
  Teleport,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  provide,
  ref,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue';
import { compositeKeydown } from '../internal/composite-keydown.js';

type ContextMenuContext = {
  open: Ref<boolean>;
  point: Ref<{ x: number; y: number }>;
  setOpen(open: boolean): void;
  openAt(x: number, y: number): void;
};

const contextMenuKey: InjectionKey<ContextMenuContext> =
  /* @__PURE__ */ Symbol('context-menu');

export const ContextMenu = /* @__PURE__ */ defineComponent({
  name: 'SimurghContextMenu',
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultOpen);
    const open = computed({
      get: () => props.open ?? local.value,
      set: (value) => {
        local.value = value;
        emit('update:open', value);
      },
    });
    const point = ref({ x: 0, y: 0 });
    provide(contextMenuKey, {
      open,
      point,
      setOpen: (value) => (open.value = value),
      openAt: (x, y) => {
        point.value = { x, y };
        open.value = true;
      },
    });
    return () => slots.default?.();
  },
});

export const ContextMenuTrigger = /* @__PURE__ */ defineComponent({
  name: 'SimurghContextMenuTrigger',
  setup(_, { attrs, slots }) {
    const menu = inject(contextMenuKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          tabindex: attrs.tabindex ?? 0,
          'aria-haspopup': 'menu',
          'aria-expanded': menu.open.value,
          'data-slot': 'context-menu-trigger',
          onContextmenu: (event: MouseEvent) => {
            event.preventDefault();
            menu.openAt(event.clientX, event.clientY);
          },
          onKeydown: (event: KeyboardEvent) => {
            if (
              event.key !== 'ContextMenu' &&
              !(event.shiftKey && event.key === 'F10')
            )
              return;
            event.preventDefault();
            const rect = (
              event.currentTarget as HTMLElement
            ).getBoundingClientRect();
            menu.openAt(rect.left, rect.bottom);
          },
        },
        slots.default?.(),
      );
  },
});

export const ContextMenuContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghContextMenuContent',
  setup(_, { attrs, slots }) {
    const menu = inject(contextMenuKey)!;
    const content = ref<HTMLElement | null>(null);
    watch(menu.open, (open) => {
      if (open)
        nextTick(() =>
          content.value
            ?.querySelector<HTMLElement>(
              '[role=menuitem]:not([aria-disabled=true])',
            )
            ?.focus(),
        );
    });
    return () =>
      menu.open.value
        ? h(
            Teleport,
            { to: 'body' },
            h(
              'div',
              {
                ...attrs,
                ref: content,
                role: 'menu',
                'data-slot': 'context-menu-content',
                class: ['simurgh-content', attrs.class],
                style: [
                  {
                    position: 'fixed',
                    left: `${menu.point.value.x}px`,
                    top: `${menu.point.value.y}px`,
                  },
                  attrs.style,
                ],
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === 'Escape') menu.setOpen(false);
                  else compositeKeydown(event, '[role=menuitem]');
                },
              },
              slots.default?.(),
            ),
          )
        : null;
  },
});

export const ContextMenuItem = /* @__PURE__ */ defineComponent({
  name: 'SimurghContextMenuItem',
  props: { disabled: Boolean },
  emits: ['select'],
  setup(props, { attrs, slots, emit }) {
    const menu = inject(contextMenuKey)!;
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
              menu.setOpen(false);
            }
          },
        },
        slots.default?.(),
      );
  },
});
