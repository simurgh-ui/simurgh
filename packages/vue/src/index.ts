import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import {
  addCalendarMonths,
  calendarMonthDays,
  calendarToday,
  createId,
  moveCalendarDate,
  nextIndex,
  trapFocus,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';
import {
  Teleport,
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

type OpenContext = {
  open: Ref<boolean>;
  setOpen(value: boolean): void;
  id: string;
};
const dialogKey: InjectionKey<OpenContext> = Symbol('dialog');
const floatingKey: InjectionKey<
  OpenContext & {
    trigger: Ref<HTMLElement | null>;
    content: Ref<HTMLElement | null>;
    kind: 'popover' | 'tooltip' | 'hovercard' | 'menu';
  }
> = Symbol('floating');
function openRoot(key: InjectionKey<OpenContext>, name: string) {
  return defineComponent({
    name,
    props: {
      open: { type: Boolean, default: undefined },
      defaultOpen: Boolean,
    },
    emits: ['update:open'],
    setup(props, { slots, emit }) {
      const local = ref(props.defaultOpen);
      const current = computed({
        get: () => props.open ?? local.value,
        set: (v) => {
          local.value = v;
          emit('update:open', v);
        },
      });
      provide(key, {
        open: current,
        setOpen: (v) => (current.value = v),
        id: createId(name.toLowerCase()),
      });
      return () => slots.default?.();
    },
  });
}
export const Dialog = openRoot(dialogKey, 'SimurghDialog');
export const DialogTrigger = defineComponent({
  name: 'SimurghDialogTrigger',
  setup(_, { slots, attrs }) {
    const c = inject(dialogKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'aria-haspopup': 'dialog',
          'aria-expanded': c.open.value,
          onClick: () => c.setOpen(true),
        },
        slots.default?.(),
      );
  },
});
export const DialogContent = defineComponent({
  name: 'SimurghDialogContent',
  setup(_, { slots, attrs }) {
    const c = inject(dialogKey)!;
    const el = ref<HTMLElement | null>(null);
    let previous: HTMLElement | null = null;
    watch(c.open, async (open) => {
      if (open) {
        previous = document.activeElement as HTMLElement;
        await nextTick();
        el.value?.focus();
      } else if (previous?.isConnected) previous.focus();
    });
    return () =>
      c.open.value
        ? h(Teleport, { to: 'body' }, [
            h('div', {
              class: 'simurgh-overlay',
              onMousedown: (event: MouseEvent) => {
                if (event.target === event.currentTarget) c.setOpen(false);
              },
            }),
            h(
              'div',
              {
                ...attrs,
                ref: el,
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': attrs['aria-label']
                  ? undefined
                  : `${c.id}-title`,
                'aria-describedby':
                  attrs['aria-describedby'] ?? `${c.id}-description`,
                tabindex: -1,
                class: ['simurgh-content simurgh-dialog', attrs.class],
                onKeydown: (e: KeyboardEvent) => {
                  if (e.key === 'Escape') c.setOpen(false);
                  else if (el.value) trapFocus(e, el.value);
                },
              },
              slots.default?.(),
            ),
          ])
        : null;
  },
});
export const DialogTitle = defineComponent({
  name: 'SimurghDialogTitle',
  setup(_, { slots, attrs }) {
    const c = inject(dialogKey)!;
    return () =>
      h('h2', { ...attrs, id: attrs.id ?? `${c.id}-title` }, slots.default?.());
  },
});
export const DialogDescription = defineComponent({
  name: 'SimurghDialogDescription',
  setup(_, { slots, attrs }) {
    const c = inject(dialogKey)!;
    return () =>
      h(
        'p',
        { ...attrs, id: attrs.id ?? `${c.id}-description` },
        slots.default?.(),
      );
  },
});
export const DialogClose = defineComponent({
  name: 'SimurghDialogClose',
  setup(_, { slots, attrs }) {
    const c = inject(dialogKey)!;
    return () =>
      h(
        'button',
        { ...attrs, type: 'button', onClick: () => c.setOpen(false) },
        slots.default?.(),
      );
  },
});

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';
export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;
export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;
export const SheetClose = DialogClose;
export const SheetContent = defineComponent({
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

export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;
export const DrawerTitle = DialogTitle;
export const DrawerDescription = DialogDescription;
export const DrawerClose = DialogClose;
export const DrawerContent = defineComponent({
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

export const AlertDialog = Dialog;
export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogContent = defineComponent({
  name: 'SimurghAlertDialogContent',
  setup(_, { slots, attrs }) {
    const c = inject(dialogKey)!;
    const el = ref<HTMLElement | null>(null);
    let previous: HTMLElement | null = null;
    watch(c.open, async (open) => {
      if (open) {
        previous = document.activeElement as HTMLElement;
        await nextTick();
        el.value
          ?.querySelector<HTMLElement>('[data-slot=alert-dialog-cancel]')
          ?.focus();
      } else if (previous?.isConnected) previous.focus();
    });
    return () =>
      c.open.value
        ? h(Teleport, { to: 'body' }, [
            h('div', {
              class: 'simurgh-overlay',
              onMousedown: (event: MouseEvent) => {
                if (event.target === event.currentTarget) c.setOpen(false);
              },
            }),
            h(
              'div',
              {
                ...attrs,
                ref: el,
                role: 'alertdialog',
                'aria-modal': 'true',
                'aria-labelledby': attrs['aria-label']
                  ? undefined
                  : `${c.id}-title`,
                'aria-describedby':
                  attrs['aria-describedby'] ?? `${c.id}-description`,
                tabindex: -1,
                'data-slot': 'alert-dialog-content',
                class: ['simurgh-content simurgh-dialog', attrs.class],
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === 'Escape') c.setOpen(false);
                  else if (el.value) trapFocus(event, el.value);
                },
              },
              slots.default?.(),
            ),
          ])
        : null;
  },
});
function alertDialogButton(name: string, slot: string) {
  return defineComponent({
    name,
    emits: ['select'],
    setup(_, { attrs, slots, emit }) {
      const c = inject(dialogKey)!;
      return () =>
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            'data-slot': slot,
            onClick: () => {
              emit('select');
              c.setOpen(false);
            },
          },
          slots.default?.(),
        );
    },
  });
}
export const AlertDialogAction = alertDialogButton(
  'SimurghAlertDialogAction',
  'alert-dialog-action',
);
export const AlertDialogCancel = alertDialogButton(
  'SimurghAlertDialogCancel',
  'alert-dialog-cancel',
);

function floatingRoot(
  name: string,
  kind: 'popover' | 'tooltip' | 'hovercard' | 'menu',
) {
  return defineComponent({
    name,
    props: {
      open: { type: Boolean, default: undefined },
      defaultOpen: Boolean,
    },
    emits: ['update:open'],
    setup(props, { slots, emit }) {
      const local = ref(props.defaultOpen);
      const current = computed({
        get: () => props.open ?? local.value,
        set: (v) => {
          local.value = v;
          emit('update:open', v);
        },
      });
      const trigger = ref<HTMLElement | null>(null),
        content = ref<HTMLElement | null>(null);
      let cleanup: (() => void) | undefined;
      watch([current, trigger, content], ([open, reference, floating]) => {
        cleanup?.();
        if (open && reference && floating)
          cleanup = autoUpdate(reference, floating, async () => {
            const p = await computePosition(reference, floating, {
              middleware: [offset(8), flip(), shift({ padding: 8 })],
            });
            Object.assign(floating.style, {
              left: `${p.x}px`,
              top: `${p.y}px`,
            });
          });
      });
      onBeforeUnmount(() => cleanup?.());
      provide(floatingKey, {
        open: current,
        setOpen: (v) => (current.value = v),
        id: createId('floating'),
        trigger,
        content,
        kind,
      });
      return () => slots.default?.();
    },
  });
}
export const Popover = floatingRoot('SimurghPopover', 'popover');
export const Tooltip = floatingRoot('SimurghTooltip', 'tooltip');
export const HoverCard = floatingRoot('SimurghHoverCard', 'hovercard');
export const DropdownMenu = floatingRoot('SimurghDropdownMenu', 'menu');
export const FloatingTrigger = defineComponent({
  name: 'SimurghFloatingTrigger',
  setup(_, { slots, attrs }) {
    const c = inject(floatingKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: c.trigger,
          type: 'button',
          'aria-expanded': c.kind === 'tooltip' ? undefined : c.open.value,
          'aria-haspopup':
            c.kind === 'tooltip'
              ? undefined
              : c.kind === 'menu'
                ? 'menu'
                : 'dialog',
          'aria-describedby': c.kind === 'tooltip' ? c.id : undefined,
          onClick:
            c.kind === 'tooltip' || c.kind === 'hovercard'
              ? undefined
              : () => c.setOpen(!c.open.value),
          onMouseenter:
            c.kind === 'tooltip' || c.kind === 'hovercard'
              ? () => c.setOpen(true)
              : undefined,
          onMouseleave:
            c.kind === 'tooltip' || c.kind === 'hovercard'
              ? () => c.setOpen(false)
              : undefined,
          onFocus:
            c.kind === 'tooltip' || c.kind === 'hovercard'
              ? () => c.setOpen(true)
              : undefined,
          onBlur:
            c.kind === 'tooltip' || c.kind === 'hovercard'
              ? () => c.setOpen(false)
              : undefined,
        },
        slots.default?.(),
      );
  },
});
export const FloatingContent = defineComponent({
  name: 'SimurghFloatingContent',
  setup(_, { slots, attrs }) {
    const c = inject(floatingKey)!;
    return () =>
      c.open.value
        ? h(
            Teleport,
            { to: 'body' },
            h(
              'div',
              {
                ...attrs,
                id: attrs.id ?? (c.kind === 'tooltip' ? c.id : undefined),
                role:
                  attrs.role ??
                  (c.kind === 'tooltip'
                    ? 'tooltip'
                    : c.kind === 'menu'
                      ? 'menu'
                      : 'dialog'),
                ref: c.content,
                class: ['simurgh-content', attrs.class],
                style: [{ position: 'absolute' }, attrs.style],
                onKeydown: (event: KeyboardEvent) => {
                  if (typeof attrs.onKeydown === 'function')
                    attrs.onKeydown(event);
                  if (!event.defaultPrevented && event.key === 'Escape')
                    c.setOpen(false);
                },
              },
              slots.default?.(),
            ),
          )
        : null;
  },
});
export const PopoverTrigger = FloatingTrigger,
  TooltipTrigger = FloatingTrigger,
  DropdownMenuTrigger = FloatingTrigger;
function compositeKeydown(event: KeyboardEvent, selector: string) {
  const root = event.currentTarget as HTMLElement;
  const items = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (item) => item.getAttribute('aria-disabled') !== 'true',
  );
  const current = items.indexOf(document.activeElement as HTMLElement);
  const target = nextIndex(current < 0 ? 0 : current, items.length, event.key, {
    orientation: 'vertical',
  });
  if (
    target !== current &&
    ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
  ) {
    event.preventDefault();
    items[target]?.focus();
  } else if ((event.key === 'Enter' || event.key === ' ') && current >= 0) {
    event.preventDefault();
    items[current]?.click();
  }
}
export const PopoverContent = FloatingContent,
  TooltipContent = FloatingContent;
export const HoverCardTrigger = defineComponent({
  name: 'SimurghHoverCardTrigger',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        FloatingTrigger,
        { ...attrs, 'data-slot': 'hover-card-trigger' },
        slots,
      );
  },
});
export const HoverCardContent = defineComponent({
  name: 'SimurghHoverCardContent',
  props: { label: { type: String, default: 'Additional information' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        FloatingContent,
        {
          ...attrs,
          role: 'dialog',
          'aria-label': props.label,
          'data-slot': 'hover-card-content',
        },
        slots,
      );
  },
});
export const DropdownMenuContent = defineComponent({
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
export const DropdownMenuItem = defineComponent({
  name: 'SimurghDropdownMenuItem',
  props: { disabled: Boolean },
  emits: ['select'],
  setup(props, { slots, attrs, emit }) {
    const c = inject(floatingKey)!;
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
              c.setOpen(false);
            }
          },
        },
        slots.default?.(),
      );
  },
});

type ContextMenuContext = {
  open: Ref<boolean>;
  point: Ref<{ x: number; y: number }>;
  setOpen(open: boolean): void;
  openAt(x: number, y: number): void;
};
const contextMenuKey: InjectionKey<ContextMenuContext> = Symbol('context-menu');
export const ContextMenu = defineComponent({
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
export const ContextMenuTrigger = defineComponent({
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
export const ContextMenuContent = defineComponent({
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
export const ContextMenuItem = defineComponent({
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

type TabsContext = {
  value: Ref<string>;
  setValue(v: string): void;
  id: string;
  orientation: Orientation;
  direction: Direction;
};
const tabsKey: InjectionKey<TabsContext> = Symbol('tabs');
export const Tabs = defineComponent({
  name: 'SimurghTabs',
  props: {
    modelValue: { type: String, default: '' },
    defaultValue: { type: String, default: '' },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultValue);
    const value = computed({
      get: () => props.modelValue || local.value,
      set: (v) => {
        local.value = v;
        emit('update:modelValue', v);
      },
    });
    provide(tabsKey, {
      value,
      setValue: (v) => (value.value = v),
      id: createId('tabs'),
      orientation: props.orientation,
      direction: props.direction,
    });
    return () => slots.default?.();
  },
});
export const TabsList = defineComponent({
  name: 'SimurghTabsList',
  setup(_, { slots, attrs }) {
    const c = inject(tabsKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'tablist',
          'aria-orientation': c.orientation,
          onKeydown: (e: KeyboardEvent) => {
            const nodes = Array.from(
              (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
                '[role=tab]',
              ),
            );
            const i = nodes.indexOf(document.activeElement as HTMLElement);
            const n = nextIndex(i, nodes.length, e.key, c);
            if (n !== i) {
              e.preventDefault();
              nodes[n]?.focus();
              nodes[n]?.click();
            }
          },
        },
        slots.default?.(),
      );
  },
});
export const TabsTrigger = defineComponent({
  name: 'SimurghTabsTrigger',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    const c = inject(tabsKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'tab',
          'aria-selected': c.value.value === props.value,
          tabindex: c.value.value === props.value ? 0 : -1,
          onClick: () => c.setValue(props.value),
        },
        slots.default?.(),
      );
  },
});
export const TabsContent = defineComponent({
  name: 'SimurghTabsContent',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    const c = inject(tabsKey)!;
    return () =>
      c.value.value === props.value
        ? h(
            'div',
            { ...attrs, role: 'tabpanel', tabindex: 0 },
            slots.default?.(),
          )
        : null;
  },
});

const accordionKey: InjectionKey<{
  open: Ref<string[]>;
  toggle(v: string): void;
}> = Symbol('accordion');
const itemKey: InjectionKey<string> = Symbol('item');
export const Accordion = defineComponent({
  props: {
    multiple: Boolean,
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
  },
  setup(props, { slots }) {
    const open = ref([...props.defaultValue]);
    provide(accordionKey, {
      open,
      toggle: (v) =>
        (open.value = open.value.includes(v)
          ? open.value.filter((x) => x !== v)
          : props.multiple
            ? [...open.value, v]
            : [v]),
    });
    return () => slots.default?.();
  },
});
export const AccordionItem = defineComponent({
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    provide(itemKey, props.value);
    return () => h('div', attrs, slots.default?.());
  },
});
export const AccordionTrigger = defineComponent({
  setup(_, { slots, attrs }) {
    const c = inject(accordionKey)!,
      value = inject(itemKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'aria-expanded': c.open.value.includes(value),
          onClick: () => c.toggle(value),
        },
        slots.default?.(),
      );
  },
});
export const AccordionContent = defineComponent({
  setup(_, { slots, attrs }) {
    const c = inject(accordionKey)!,
      value = inject(itemKey)!;
    return () =>
      c.open.value.includes(value)
        ? h('div', { ...attrs, role: 'region' }, slots.default?.())
        : null;
  },
});
const collapsibleKey: InjectionKey<{
  open: Ref<boolean>;
  toggle(): void;
  id: string;
}> = Symbol('collapsible');
export const Collapsible = defineComponent({
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultOpen);
    const open = computed(() => props.modelValue ?? local.value);
    const id = createId('collapsible');
    provide(collapsibleKey, {
      open,
      id,
      toggle: () => {
        const next = !open.value;
        if (props.modelValue === undefined) local.value = next;
        emit('update:modelValue', next);
      },
    });
    return () => slots.default?.();
  },
});
export const CollapsibleTrigger = defineComponent({
  props: { disabled: Boolean },
  setup(props, { attrs, slots }) {
    const c = inject(collapsibleKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          disabled: props.disabled,
          'aria-expanded': c.open.value,
          'aria-controls': `${c.id}-content`,
          onClick: props.disabled ? undefined : c.toggle,
        },
        slots.default?.(),
      );
  },
});
export const CollapsibleContent = defineComponent({
  setup(_, { attrs, slots }) {
    const c = inject(collapsibleKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          id: `${c.id}-content`,
          hidden: !c.open.value,
          'data-state': c.open.value ? 'open' : 'closed',
        },
        slots.default?.(),
      );
  },
});

function checkControl(role: 'checkbox' | 'switch', name: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      modelValue: Boolean,
      defaultChecked: Boolean,
      name: String,
      value: { type: String, default: 'on' },
      required: Boolean,
      disabled: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { slots, attrs, emit }) {
      const local = ref(props.defaultChecked);
      const checked = computed(() => props.modelValue || local.value);
      const toggle = () => {
        if (!props.disabled) {
          local.value = !checked.value;
          emit('update:modelValue', local.value);
        }
      };
      return () => [
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            role,
            'aria-checked': checked.value,
            disabled: props.disabled,
            onClick: toggle,
          },
          slots.default?.(),
        ),
        props.name
          ? h('input', {
              type: 'checkbox',
              hidden: true,
              name: props.name,
              value: props.value,
              checked: checked.value,
              required: props.required,
              disabled: props.disabled,
            })
          : null,
      ];
    },
  });
}
export const Label = defineComponent({
  name: 'SimurghLabel',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('label', attrs, slots.default?.());
  },
});

export const Separator = defineComponent({
  name: 'SimurghSeparator',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    decorative: Boolean,
  },
  setup(props, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        role: props.decorative ? 'none' : 'separator',
        'aria-hidden': props.decorative || undefined,
        'aria-orientation': props.decorative ? undefined : props.orientation,
        'data-orientation': props.orientation,
      });
  },
});

export const Progress = defineComponent({
  name: 'SimurghProgress',
  props: {
    value: { type: Number as PropType<number | null>, default: null },
    max: { type: Number, default: 100 },
    getValueLabel: Function as PropType<(value: number, max: number) => string>,
  },
  setup(props, { attrs, slots }) {
    const safeMax = computed(() =>
      Number.isFinite(props.max) && props.max > 0 ? props.max : 100,
    );
    const safeValue = computed(() =>
      props.value == null || !Number.isFinite(props.value)
        ? null
        : Math.min(safeMax.value, Math.max(0, props.value)),
    );
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': safeMax.value,
          'aria-valuenow': safeValue.value ?? undefined,
          'aria-valuetext':
            safeValue.value == null
              ? undefined
              : props.getValueLabel?.(safeValue.value, safeMax.value),
          'data-state':
            safeValue.value == null ? 'indeterminate' : 'determinate',
          'data-value': safeValue.value ?? undefined,
          'data-max': safeMax.value,
        },
        slots.default?.() ??
          h('span', {
            'data-part': 'indicator',
            style:
              safeValue.value == null
                ? undefined
                : { inlineSize: `${(safeValue.value / safeMax.value) * 100}%` },
          }),
      );
  },
});

export const Toggle = defineComponent({
  name: 'SimurghToggle',
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultPressed: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const localPressed = ref(props.defaultPressed);
    const pressed = computed(() => props.modelValue ?? localPressed.value);
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'aria-pressed': pressed.value,
          'data-state': pressed.value ? 'on' : 'off',
          disabled: props.disabled,
          onClick: () => {
            if (props.disabled) return;
            const next = !pressed.value;
            if (props.modelValue === undefined) localPressed.value = next;
            emit('update:modelValue', next);
          },
        },
        slots.default?.(),
      );
  },
});
const toggleGroupKey: InjectionKey<{
  values: Ref<string[]>;
  toggle(value: string): void;
}> = Symbol('toggle-group');
export const ToggleGroup = defineComponent({
  props: {
    type: {
      type: String as PropType<'single' | 'multiple'>,
      default: 'single',
    },
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const local = ref([...props.defaultValue]);
    const values = computed(() => props.modelValue ?? local.value);
    const toggle = (item: string) => {
      const next = values.value.includes(item)
        ? values.value.filter((entry) => entry !== item)
        : props.type === 'single'
          ? [item]
          : [...values.value, item];
      if (props.modelValue === undefined) local.value = next;
      emit('update:modelValue', next);
    };
    provide(toggleGroupKey, { values, toggle });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'group',
          'aria-orientation': props.orientation,
          dir: props.direction,
          'data-slot': 'toggle-group',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[data-toggle-group-item]:not(:disabled)',
              ),
            );
            const index = items.indexOf(document.activeElement as HTMLElement);
            const target = nextIndex(index, items.length, event.key, {
              orientation: props.orientation,
              direction: props.direction,
            });
            if (target !== index) {
              event.preventDefault();
              items[target]?.focus();
            }
          },
        },
        slots.default?.(),
      );
  },
});
export const ToggleGroupItem = defineComponent({
  props: { value: { type: String, required: true }, disabled: Boolean },
  setup(props, { attrs, slots }) {
    const group = inject(toggleGroupKey)!;
    return () => {
      const pressed = group.values.value.includes(props.value);
      return h(
        'button',
        {
          ...attrs,
          type: 'button',
          disabled: props.disabled,
          'data-toggle-group-item': '',
          'data-slot': 'toggle-group-item',
          'aria-pressed': pressed,
          'data-state': pressed ? 'on' : 'off',
          onClick: props.disabled ? undefined : () => group.toggle(props.value),
        },
        slots.default?.(),
      );
    };
  },
});

export const VisuallyHidden = defineComponent({
  name: 'SimurghVisuallyHidden',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          style: [
            {
              position: 'absolute',
              inlineSize: '1px',
              blockSize: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            },
            attrs['style'],
          ],
        },
        slots.default?.(),
      );
  },
});

export const Avatar = defineComponent({
  name: 'SimurghAvatar',
  props: {
    src: String,
    alt: { type: String, required: true },
    fallback: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    const loaded = ref(false);
    watch(
      () => props.src,
      () => (loaded.value = false),
    );
    return () =>
      h(
        'span',
        { ...attrs, 'data-state': loaded.value ? 'loaded' : 'fallback' },
        [
          props.src
            ? h('img', {
                src: props.src,
                alt: props.alt,
                hidden: !loaded.value,
                onLoad: () => (loaded.value = true),
                onError: () => (loaded.value = false),
              })
            : null,
          !loaded.value
            ? h(
                'span',
                { 'data-part': 'fallback' },
                slots.fallback?.() ?? props.fallback,
              )
            : null,
        ],
      );
  },
});

export const Alert = defineComponent({
  name: 'SimurghAlert',
  props: { urgent: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: props.urgent ? 'alert' : 'status',
          'aria-live': props.urgent ? 'assertive' : 'polite',
          'aria-atomic': 'true',
          'data-urgent': props.urgent || undefined,
        },
        slots.default?.(),
      );
  },
});

export const AspectRatio = defineComponent({
  name: 'SimurghAspectRatio',
  props: { ratio: { type: Number, default: 1 } },
  setup(props, { attrs, slots }) {
    const safeRatio = computed(() =>
      Number.isFinite(props.ratio) && props.ratio > 0 ? props.ratio : 1,
    );
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-ratio': safeRatio.value,
          style: [{ aspectRatio: String(safeRatio.value) }, attrs['style']],
        },
        slots.default?.(),
      );
  },
});

export const Skeleton = defineComponent({
  name: 'SimurghSkeleton',
  props: { label: String },
  setup(props, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        role: props.label ? 'status' : undefined,
        'aria-label': props.label,
        'aria-busy': props.label ? 'true' : undefined,
        'aria-hidden': props.label ? undefined : 'true',
        'data-state': 'loading',
      });
  },
});

export const Spinner = defineComponent({
  name: 'SimurghSpinner',
  props: { label: { type: String, default: 'Loading' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          role: 'status',
          'aria-label': props.label,
          'aria-live': 'polite',
          'aria-busy': 'true',
          'data-state': 'loading',
        },
        h(
          'span',
          { 'aria-hidden': 'true', 'data-part': 'indicator' },
          slots.default?.() ?? '◌',
        ),
      );
  },
});

export const Button = defineComponent({
  name: 'SimurghButton',
  inheritAttrs: false,
  props: {
    loading: Boolean,
    disabled: Boolean,
    type: { type: String, default: 'button' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: props.type,
          disabled: props.disabled || props.loading,
          'aria-busy': props.loading || undefined,
          'data-state': props.loading ? 'loading' : 'idle',
          onClick:
            props.disabled || props.loading ? undefined : attrs['onClick'],
        },
        slots.default?.(),
      );
  },
});

export const ButtonGroup = defineComponent({
  name: 'SimurghButtonGroup',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: attrs['role'] ?? 'group',
          'aria-orientation': props.orientation,
          'data-slot': 'button-group',
        },
        slots.default?.(),
      );
  },
});

export const ButtonGroupText = defineComponent({
  name: 'SimurghButtonGroupText',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'span',
        { ...attrs, 'data-slot': 'button-group-text' },
        slots.default?.(),
      );
  },
});

export const ButtonGroupSeparator = defineComponent({
  name: 'SimurghButtonGroupSeparator',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'vertical',
    },
  },
  setup(props, { attrs }) {
    return () =>
      h('span', {
        ...attrs,
        role: attrs['role'] ?? 'separator',
        'aria-orientation': props.orientation,
        'data-slot': 'button-group-separator',
      });
  },
});

export const Link = defineComponent({
  name: 'SimurghLink',
  inheritAttrs: false,
  props: {
    href: String,
    disabled: Boolean,
    external: Boolean,
    rel: String,
    target: String,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          href: props.disabled ? undefined : props.href,
          'aria-disabled': props.disabled || undefined,
          'data-slot': 'link',
          'data-external': props.external || undefined,
          rel: props.external
            ? (props.rel ?? 'noopener noreferrer')
            : props.rel,
          target: props.external ? (props.target ?? '_blank') : props.target,
          tabindex: props.disabled ? -1 : attrs['tabindex'],
          onClick: (event: MouseEvent) => {
            if (props.disabled) {
              event.preventDefault();
              return;
            }
            const listener = attrs['onClick'];
            if (typeof listener === 'function') listener(event);
          },
        },
        slots.default?.(),
      );
  },
});

export const Input = defineComponent({
  name: 'SimurghInput',
  props: {
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    return () =>
      h('input', {
        ...attrs,
        type: props.type,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        onInput: (event: Event) =>
          emit('update:modelValue', (event.target as HTMLInputElement).value),
        onChange: (event: Event) => emit('change', event),
      });
  },
});

export const InputGroup = defineComponent({
  name: 'SimurghInputGroup',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: attrs['role'] ?? 'group',
          'data-slot': 'input-group',
        },
        slots.default?.(),
      );
  },
});

export const InputGroupAddon = defineComponent({
  name: 'SimurghInputGroupAddon',
  props: {
    align: {
      type: String as PropType<
        'inline-start' | 'inline-end' | 'block-start' | 'block-end'
      >,
      default: 'inline-start',
    },
    decorative: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-hidden': props.decorative || undefined,
          'data-align': props.align,
          'data-slot': 'input-group-addon',
        },
        slots.default?.(),
      );
  },
});

export const InputGroupText = defineComponent({
  name: 'SimurghInputGroupText',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'span',
        { ...attrs, 'data-slot': 'input-group-text' },
        slots.default?.(),
      );
  },
});

export const InputOtp = defineComponent({
  name: 'SimurghInputOtp',
  props: {
    modelValue: { type: String, default: '' },
    length: { type: Number, default: 6 },
    digitsOnly: { type: Boolean, default: true },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    autocomplete: { type: String, default: 'one-time-code' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    return () =>
      h('input', {
        ...attrs,
        type: 'text',
        name: props.name,
        value: props.modelValue,
        maxlength: props.length,
        required: props.required,
        disabled: props.disabled,
        autocomplete: props.autocomplete,
        inputmode: props.digitsOnly ? 'numeric' : 'text',
        pattern: props.digitsOnly ? '[0-9]*' : undefined,
        'aria-invalid': props.invalid || undefined,
        'data-slot': 'input-otp',
        style: [{ '--simurgh-otp-length': props.length }, attrs['style']],
        onInput: (event: Event) => {
          const input = event.target as HTMLInputElement;
          const value = (
            props.digitsOnly ? input.value.replace(/\D/g, '') : input.value
          ).slice(0, props.length);
          input.value = value;
          emit('update:modelValue', value);
        },
        onChange: (event: Event) => emit('change', event),
      });
  },
});

export const NativeSelect = defineComponent({
  name: 'SimurghNativeSelect',
  props: {
    modelValue: { type: [String, Number], default: '' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    multiple: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, slots, emit }) {
    return () =>
      h(
        'select',
        {
          ...attrs,
          name: props.name,
          required: props.required,
          disabled: props.disabled,
          multiple: props.multiple,
          value: props.modelValue,
          'aria-invalid': props.invalid || undefined,
          'data-slot': 'native-select',
          onChange: (event: Event) => {
            const select = event.target as HTMLSelectElement;
            const value = props.multiple
              ? Array.from(select.selectedOptions, (option) => option.value)
              : select.value;
            emit('update:modelValue', value);
            emit('change', event);
          },
        },
        slots.default?.(),
      );
  },
});

export const Slider = defineComponent({
  name: 'SimurghSlider',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    invalid: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const local = ref(props.defaultValue);
    const value = computed(() => props.modelValue ?? local.value);
    return () =>
      h('input', {
        ...attrs,
        type: 'range',
        value: value.value,
        min: props.min,
        max: props.max,
        step: props.step,
        'aria-invalid': props.invalid || undefined,
        'data-slot': 'slider',
        onInput: (event: Event) => {
          const next = (event.target as HTMLInputElement).valueAsNumber;
          if (props.modelValue === undefined) local.value = next;
          emit('update:modelValue', next);
        },
        onChange: (event: Event) =>
          emit('change', (event.target as HTMLInputElement).valueAsNumber),
      });
  },
});

export const Meter = defineComponent({
  name: 'SimurghMeter',
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    low: Number,
    high: Number,
    optimum: Number,
    label: String,
  },
  setup(props, { attrs, slots }) {
    const safeValue = computed(() =>
      Math.min(props.max, Math.max(props.min, props.value)),
    );
    return () =>
      h(
        'meter',
        {
          ...attrs,
          value: safeValue.value,
          min: props.min,
          max: props.max,
          low: props.low,
          high: props.high,
          optimum: props.optimum,
          role: 'meter',
          'aria-label': props.label,
          'data-slot': 'meter',
        },
        slots.default?.() ?? `${safeValue.value}`,
      );
  },
});

export const Toolbar = defineComponent({
  name: 'SimurghToolbar',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
    label: { type: String, default: 'Toolbar' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'toolbar',
          'aria-label': props.label,
          'aria-orientation': props.orientation,
          dir: props.direction,
          'data-slot': 'toolbar',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[data-toolbar-item]:not(:disabled)',
              ),
            );
            const index = items.indexOf(document.activeElement as HTMLElement);
            const target = nextIndex(index, items.length, event.key, {
              orientation: props.orientation,
              direction: props.direction,
            });
            if (target !== index) {
              event.preventDefault();
              items[target]?.focus();
            }
          },
        },
        slots.default?.(),
      );
  },
});
export const ToolbarButton = defineComponent({
  name: 'SimurghToolbarButton',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-toolbar-item': '',
          'data-slot': 'toolbar-button',
        },
        slots.default?.(),
      );
  },
});

export const ScrollArea = defineComponent({
  name: 'SimurghScrollArea',
  props: {
    orientation: {
      type: String as PropType<'vertical' | 'horizontal' | 'both'>,
      default: 'vertical',
    },
    label: String,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: props.label ? 'region' : undefined,
          'aria-label': props.label,
          tabindex: attrs['tabindex'] ?? 0,
          'data-orientation': props.orientation,
          'data-slot': 'scroll-area',
        },
        slots.default?.(),
      );
  },
});

export const Textarea = defineComponent({
  name: 'SimurghTextarea',
  props: {
    modelValue: { type: String, default: '' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    return () =>
      h('textarea', {
        ...attrs,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        onInput: (event: Event) =>
          emit(
            'update:modelValue',
            (event.target as HTMLTextAreaElement).value,
          ),
        onChange: (event: Event) => emit('change', event),
      });
  },
});

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export const Badge = defineComponent({
  name: 'SimurghBadge',
  props: {
    tone: { type: String as PropType<BadgeTone>, default: 'neutral' },
    status: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          'data-tone': props.tone,
          role: props.status ? 'status' : undefined,
          'aria-live': props.status ? 'polite' : undefined,
        },
        slots.default?.(),
      );
  },
});

export const Breadcrumb = defineComponent({
  name: 'SimurghBreadcrumb',
  props: { label: { type: String, default: 'Breadcrumb' } },
  setup(props, { attrs, slots }) {
    return () =>
      h('nav', { ...attrs, 'aria-label': props.label }, slots.default?.());
  },
});

export const NavigationMenu = defineComponent({
  name: 'SimurghNavigationMenu',
  props: { label: { type: String, default: 'Main navigation' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'nav',
        {
          ...attrs,
          'aria-label': props.label,
          'data-slot': 'navigation-menu',
        },
        slots.default?.(),
      );
  },
});
export const NavigationMenuList = cardPart(
  'SimurghNavigationMenuList',
  'ul',
  'navigation-menu-list',
);
export const NavigationMenuItem = cardPart(
  'SimurghNavigationMenuItem',
  'li',
  'navigation-menu-item',
);
export const NavigationMenuLink = defineComponent({
  name: 'SimurghNavigationMenuLink',
  props: { current: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          'aria-current': props.current ? 'page' : attrs['aria-current'],
          'data-slot': 'navigation-menu-link',
        },
        slots.default?.(),
      );
  },
});

export const Menubar = defineComponent({
  name: 'SimurghMenubar',
  props: {
    label: { type: String, default: 'Application menu' },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  setup(props, { attrs, slots }) {
    const root = ref<HTMLElement | null>(null);
    onMounted(() => {
      const first = root.value?.querySelector<HTMLElement>(
        '[role=menuitem]:not([aria-disabled=true])',
      );
      if (first) first.tabIndex = 0;
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          ref: root,
          role: 'menubar',
          'aria-label': props.label,
          dir: props.direction,
          'data-slot': 'menubar',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[role=menuitem]:not([aria-disabled=true])',
              ),
            );
            const current = items.indexOf(
              document.activeElement as HTMLElement,
            );
            const target = nextIndex(current, items.length, event.key, {
              orientation: 'horizontal',
              direction: props.direction,
            });
            if (target !== current) {
              event.preventDefault();
              items.forEach((item, index) =>
                item.setAttribute('tabindex', index === target ? '0' : '-1'),
              );
              items[target]?.focus();
            }
          },
        },
        slots.default?.(),
      );
  },
});
export const MenubarItem = defineComponent({
  name: 'SimurghMenubarItem',
  props: { disabled: Boolean },
  emits: ['select'],
  setup(props, { attrs, slots, emit }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'menuitem',
          tabindex: -1,
          disabled: props.disabled,
          'aria-disabled': props.disabled || undefined,
          'data-slot': 'menubar-item',
          onClick: () => !props.disabled && emit('select'),
        },
        slots.default?.(),
      );
  },
});

function cardPart(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      return () => h(tag, { ...attrs, 'data-slot': slot }, slots.default?.());
    },
  });
}
export const Card = cardPart('SimurghCard', 'div', 'card');
export const CardHeader = cardPart('SimurghCardHeader', 'div', 'card-header');
export const CardTitle = cardPart('SimurghCardTitle', 'h3', 'card-title');
export const CardDescription = cardPart(
  'SimurghCardDescription',
  'p',
  'card-description',
);
export const CardContent = cardPart(
  'SimurghCardContent',
  'div',
  'card-content',
);
export const CardFooter = cardPart('SimurghCardFooter', 'div', 'card-footer');

export const Empty = defineComponent({
  name: 'SimurghEmpty',
  props: { status: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: props.status ? 'status' : attrs['role'],
          'aria-live': props.status ? 'polite' : attrs['aria-live'],
          'data-slot': 'empty',
        },
        slots.default?.(),
      );
  },
});
export const EmptyHeader = cardPart(
  'SimurghEmptyHeader',
  'div',
  'empty-header',
);
export const EmptyMedia = defineComponent({
  name: 'SimurghEmptyMedia',
  props: { decorative: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-hidden': props.decorative || undefined,
          'data-slot': 'empty-media',
        },
        slots.default?.(),
      );
  },
});
export const EmptyTitle = cardPart('SimurghEmptyTitle', 'h3', 'empty-title');
export const EmptyDescription = cardPart(
  'SimurghEmptyDescription',
  'p',
  'empty-description',
);
export const EmptyContent = cardPart(
  'SimurghEmptyContent',
  'div',
  'empty-content',
);
export const ItemGroup = defineComponent({
  name: 'SimurghItemGroup',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, role: attrs['role'] ?? 'list', 'data-slot': 'item-group' },
        slots.default?.(),
      );
  },
});
export const Item = defineComponent({
  name: 'SimurghItem',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, role: attrs['role'] ?? 'listitem', 'data-slot': 'item' },
        slots.default?.(),
      );
  },
});
export const ItemMedia = defineComponent({
  name: 'SimurghItemMedia',
  props: { decorative: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-hidden': props.decorative || undefined,
          'data-slot': 'item-media',
        },
        slots.default?.(),
      );
  },
});
export const ItemContent = cardPart(
  'SimurghItemContent',
  'div',
  'item-content',
);
export const ItemTitle = cardPart('SimurghItemTitle', 'h3', 'item-title');
export const ItemDescription = cardPart(
  'SimurghItemDescription',
  'p',
  'item-description',
);
export const ItemActions = cardPart(
  'SimurghItemActions',
  'div',
  'item-actions',
);
export const Kbd = cardPart('SimurghKbd', 'kbd', 'kbd');
export const Field = cardPart('SimurghField', 'fieldset', 'field');
export const FieldLegend = cardPart(
  'SimurghFieldLegend',
  'legend',
  'field-legend',
);
export const FieldDescription = cardPart(
  'SimurghFieldDescription',
  'p',
  'field-description',
);
export const FieldError = defineComponent({
  name: 'SimurghFieldError',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'p',
        { ...attrs, 'data-slot': 'field-error', role: 'alert' },
        slots.default?.(),
      );
  },
});
export const Form = defineComponent({
  name: 'SimurghForm',
  props: { focusInvalid: { type: Boolean, default: true } },
  emits: ['invalid'],
  setup(props, { attrs, slots, emit }) {
    let focusQueued = false;
    return () =>
      h(
        'form',
        {
          ...attrs,
          'data-slot': 'form',
          onInvalidCapture: (event: Event) => {
            emit('invalid', event.target);
            if (focusQueued || !props.focusInvalid || event.defaultPrevented)
              return;
            focusQueued = true;
            const first = event.target as HTMLElement;
            requestAnimationFrame(() => {
              first.focus();
              focusQueued = false;
            });
          },
        },
        slots.default?.(),
      );
  },
});
export const FormErrorSummary = defineComponent({
  name: 'SimurghFormErrorSummary',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'alert',
          'aria-live': 'assertive',
          tabindex: -1,
          'data-slot': 'form-error-summary',
        },
        slots.default?.(),
      );
  },
});
export const Table = cardPart('SimurghTable', 'table', 'table');
export const TableHeader = cardPart(
  'SimurghTableHeader',
  'thead',
  'table-header',
);
export const TableBody = cardPart('SimurghTableBody', 'tbody', 'table-body');
export const TableFooter = cardPart(
  'SimurghTableFooter',
  'tfoot',
  'table-footer',
);
export const TableRow = cardPart('SimurghTableRow', 'tr', 'table-row');
export const TableHead = defineComponent({
  name: 'SimurghTableHead',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'th',
        { scope: 'col', ...attrs, 'data-slot': 'table-head' },
        slots.default?.(),
      );
  },
});
export const TableCell = cardPart('SimurghTableCell', 'td', 'table-cell');
export const TableCaption = cardPart(
  'SimurghTableCaption',
  'caption',
  'table-caption',
);
export const Pagination = defineComponent({
  name: 'SimurghPagination',
  props: { label: { type: String, default: 'Pagination' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'nav',
        { ...attrs, 'aria-label': props.label, 'data-slot': 'pagination' },
        slots.default?.(),
      );
  },
});
export const PaginationContent = cardPart(
  'SimurghPaginationContent',
  'ul',
  'pagination-content',
);
export const PaginationItem = cardPart(
  'SimurghPaginationItem',
  'li',
  'pagination-item',
);
export const PaginationLink = defineComponent({
  name: 'SimurghPaginationLink',
  props: { current: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          'aria-current': props.current ? 'page' : undefined,
          'data-slot': 'pagination-link',
        },
        slots.default?.(),
      );
  },
});

export const Checkbox = checkControl('checkbox', 'SimurghCheckbox');
export const Switch = checkControl('switch', 'SimurghSwitch');

const radioKey: InjectionKey<{
  value: Ref<string>;
  setValue(value: string): void;
  disabled: boolean;
  direction: Direction;
}> = Symbol('radio');
export const RadioGroup = defineComponent({
  name: 'SimurghRadioGroup',
  props: {
    modelValue: { type: String, default: '' },
    defaultValue: { type: String, default: '' },
    name: String,
    required: Boolean,
    disabled: Boolean,
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const local = ref(props.defaultValue);
    const value = computed({
      get: () => props.modelValue || local.value,
      set: (next) => {
        local.value = next;
        emit('update:modelValue', next);
      },
    });
    provide(radioKey, {
      value,
      setValue: (next) => (value.value = next),
      disabled: props.disabled,
      direction: props.direction,
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'radiogroup',
          onKeydown: (event: KeyboardEvent) => {
            const items = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>(
                '[role=radio]:not([aria-disabled=true])',
              ),
            );
            const current = items.indexOf(
              document.activeElement as HTMLElement,
            );
            const target = nextIndex(current, items.length, event.key, {
              direction: props.direction,
            });
            if (target !== current) {
              event.preventDefault();
              items[target]?.focus();
              items[target]?.click();
            }
          },
        },
        [
          slots.default?.(),
          props.name
            ? h('input', {
                type: 'hidden',
                name: props.name,
                value: value.value,
              })
            : null,
          props.required
            ? h('input', {
                'aria-hidden': 'true',
                tabindex: -1,
                required: true,
                value: value.value,
                style: 'position:absolute;opacity:0;pointer-events:none',
              })
            : null,
        ],
      );
  },
});
export const RadioGroupItem = defineComponent({
  name: 'SimurghRadioGroupItem',
  props: { value: { type: String, required: true }, disabled: Boolean },
  setup(props, { slots, attrs }) {
    const c = inject(radioKey)!;
    return () => {
      const selected = c.value.value === props.value,
        unavailable = c.disabled || props.disabled;
      return h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'radio',
          'aria-checked': selected,
          'aria-disabled': unavailable || undefined,
          tabindex: selected ? 0 : -1,
          onClick: () => {
            if (!unavailable) c.setValue(props.value);
          },
        },
        slots.default?.(),
      );
    };
  },
});
export const Select = defineComponent({
  name: 'SimurghSelect',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<
        { value: string; label: string; disabled?: boolean }[]
      >,
      required: true,
    },
    name: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: { type: String, default: 'Select…' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const open = ref(false);
    const listId = createId('select-list');
    const show = async () => {
      open.value = true;
      await nextTick();
      document
        .getElementById(listId)
        ?.querySelector<HTMLElement>('[role=option]:not([aria-disabled=true])')
        ?.focus();
    };
    return () =>
      h('div', [
        h(
          'button',
          {
            type: 'button',
            role: 'combobox',
            'aria-expanded': open.value,
            'aria-controls': listId,
            disabled: props.disabled,
            onClick: () => (open.value ? (open.value = false) : void show()),
            onKeydown: (event: KeyboardEvent) => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                void show();
              }
            },
          },
          props.options.find((o) => o.value === props.modelValue)?.label ??
            props.placeholder,
        ),
        open.value
          ? h(
              'div',
              {
                id: listId,
                role: 'listbox',
                class: 'simurgh-content',
                onKeydown: (event: KeyboardEvent) =>
                  compositeKeydown(event, '[role=option]'),
              },
              props.options.map((o) =>
                h(
                  'div',
                  {
                    role: 'option',
                    tabindex: -1,
                    'aria-selected': o.value === props.modelValue,
                    'aria-disabled': o.disabled,
                    class: 'simurgh-item',
                    onClick: () => {
                      if (!o.disabled) {
                        emit('update:modelValue', o.value);
                        open.value = false;
                      }
                    },
                  },
                  o.label,
                ),
              ),
            )
          : null,
        props.name
          ? h('input', {
              type: 'hidden',
              name: props.name,
              value: props.modelValue,
              disabled: props.disabled,
            })
          : null,
      ]);
  },
});

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const Combobox = defineComponent({
  name: 'SimurghCombobox',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<ComboboxOption[]>,
      required: true,
    },
    name: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: { type: String, default: 'Search options' },
    noResults: { type: String, default: 'No results' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const listId = createId('combobox-list');
    const query = ref('');
    const open = ref(false);
    const activeIndex = ref(-1);
    const selected = computed(() =>
      props.options.find((option) => option.value === props.modelValue),
    );
    const filtered = computed(() => {
      const needle = query.value.trim().toLocaleLowerCase();
      return needle
        ? props.options.filter((option) =>
            option.label.toLocaleLowerCase().includes(needle),
          )
        : props.options;
    });
    const optionId = (index: number) => `${listId}-option-${index}`;
    const move = (step: 1 | -1) => {
      if (!filtered.value.some((option) => !option.disabled)) return;
      let index = activeIndex.value;
      do {
        index = (index + step + filtered.value.length) % filtered.value.length;
      } while (filtered.value[index]?.disabled);
      activeIndex.value = index;
    };
    const choose = (option: ComboboxOption) => {
      if (option.disabled) return;
      emit('update:modelValue', option.value);
      query.value = option.label;
      open.value = false;
      activeIndex.value = -1;
    };
    watch(
      () => props.modelValue,
      () => {
        if (!open.value) query.value = selected.value?.label ?? '';
      },
      { immediate: true },
    );
    return () =>
      h('div', { class: 'simurgh-combobox' }, [
        h('input', {
          ...attrs,
          role: 'combobox',
          'aria-label': attrs['aria-label'] ?? props.placeholder,
          'aria-autocomplete': 'list',
          'aria-expanded': open.value,
          'aria-controls': listId,
          'aria-activedescendant':
            open.value && activeIndex.value >= 0
              ? optionId(activeIndex.value)
              : undefined,
          disabled: props.disabled,
          placeholder: props.placeholder,
          value: query.value,
          onFocus: () => {
            if (!props.disabled) open.value = true;
          },
          onInput: (event: Event) => {
            query.value = (event.target as HTMLInputElement).value;
            open.value = true;
            activeIndex.value = -1;
          },
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              open.value = true;
              move(event.key === 'ArrowDown' ? 1 : -1);
            } else if (event.key === 'Home' && open.value) {
              event.preventDefault();
              activeIndex.value = -1;
              move(1);
            } else if (event.key === 'End' && open.value) {
              event.preventDefault();
              activeIndex.value = 0;
              move(-1);
            } else if (event.key === 'Enter' && activeIndex.value >= 0) {
              event.preventDefault();
              const option = filtered.value[activeIndex.value];
              if (option) choose(option);
            } else if (event.key === 'Escape') {
              event.preventDefault();
              query.value = selected.value?.label ?? '';
              open.value = false;
              activeIndex.value = -1;
            }
          },
        }),
        open.value
          ? h(
              'div',
              { id: listId, role: 'listbox', class: 'simurgh-content' },
              filtered.value.length
                ? filtered.value.map((option, index) =>
                    h(
                      'div',
                      {
                        id: optionId(index),
                        role: 'option',
                        'aria-selected': option.value === props.modelValue,
                        'aria-disabled': option.disabled || undefined,
                        class: 'simurgh-item',
                        onMousedown: (event: MouseEvent) => {
                          event.preventDefault();
                          choose(option);
                        },
                      },
                      option.label,
                    ),
                  )
                : h('div', { role: 'status' }, props.noResults),
            )
          : null,
        props.name
          ? h('input', {
              type: 'hidden',
              name: props.name,
              value: props.modelValue,
              disabled: props.disabled,
            })
          : null,
        props.required
          ? h('input', {
              'aria-hidden': 'true',
              tabindex: -1,
              required: true,
              value: props.modelValue,
              style: 'position:absolute;opacity:0;pointer-events:none',
            })
          : null,
      ]);
  },
});

export const Command = defineComponent({
  name: 'SimurghCommand',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<ComboboxOption[]>,
      required: true,
    },
    name: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: { type: String, default: 'Search commands' },
    noResults: { type: String, default: 'No commands found' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('div', { 'data-slot': 'command' }, [
        h(Combobox, {
          ...attrs,
          modelValue: props.modelValue,
          options: props.options,
          ...(props.name === undefined ? {} : { name: props.name }),
          required: props.required,
          disabled: props.disabled,
          placeholder: props.placeholder,
          noResults: props.noResults,
          'onUpdate:modelValue': (value: string) =>
            emit('update:modelValue', value),
        }),
      ]);
  },
});

export const Calendar = defineComponent({
  name: 'SimurghCalendar',
  props: {
    modelValue: String,
    defaultValue: { type: String, default: '' },
    month: String,
    defaultMonth: String,
    locale: { type: String, default: 'en' },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
    firstDayOfWeek: { type: Number, default: 0 },
    min: String,
    max: String,
    disabledDates: { type: Array as PropType<string[]>, default: () => [] },
    name: String,
    label: { type: String, default: 'Calendar' },
  },
  emits: ['update:modelValue', 'update:month'],
  setup(props, { emit }) {
    const today = calendarToday();
    const localValue = ref(props.defaultValue);
    const localMonth = ref(
      props.defaultMonth ?? (props.defaultValue || today).slice(0, 7),
    );
    const root = ref<HTMLElement | null>(null);
    const titleId = createId('calendar-title');
    const selected = computed(() => props.modelValue ?? localValue.value);
    const displayedMonth = computed(() => props.month ?? localMonth.value);
    const days = computed(() =>
      calendarMonthDays(displayedMonth.value, props.firstDayOfWeek),
    );
    const isDisabled = (date: string) =>
      (props.min !== undefined && date < props.min) ||
      (props.max !== undefined && date > props.max) ||
      props.disabledDates.includes(date);
    const setMonth = (next: string) => {
      if (props.month === undefined) localMonth.value = next;
      emit('update:month', next);
    };
    const choose = (date: string) => {
      if (isDisabled(date)) return;
      if (props.modelValue === undefined) localValue.value = date;
      if (date.slice(0, 7) !== displayedMonth.value) setMonth(date.slice(0, 7));
      emit('update:modelValue', date);
    };
    const focusDate = (date: string) => {
      if (date.slice(0, 7) !== displayedMonth.value) setMonth(date.slice(0, 7));
      requestAnimationFrame(() =>
        root.value
          ?.querySelector<HTMLElement>(`[data-date="${date}"]`)
          ?.focus(),
      );
    };
    return () => {
      const monthValue = displayedMonth.value;
      const anchor =
        selected.value.slice(0, 7) === monthValue
          ? selected.value
          : `${monthValue}-01`;
      const dateFor = (date: string) => new Date(`${date}T00:00:00Z`);
      const monthLabel = new Intl.DateTimeFormat(props.locale, {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(dateFor(`${monthValue}-01`));
      const dayLabel = new Intl.DateTimeFormat(props.locale, {
        dateStyle: 'full',
        timeZone: 'UTC',
      });
      const weekdayLabel = new Intl.DateTimeFormat(props.locale, {
        weekday: 'short',
        timeZone: 'UTC',
      });
      return h(
        'div',
        {
          ref: root,
          'data-slot': 'calendar',
          dir: props.direction,
          role: 'group',
          'aria-label': props.label,
        },
        [
          h('div', { 'data-slot': 'calendar-header' }, [
            h(
              'button',
              {
                type: 'button',
                'aria-label': 'Previous month',
                onClick: () =>
                  setMonth(
                    addCalendarMonths(`${monthValue}-01`, -1).slice(0, 7),
                  ),
              },
              '‹',
            ),
            h('h2', { id: titleId, 'aria-live': 'polite' }, monthLabel),
            h(
              'button',
              {
                type: 'button',
                'aria-label': 'Next month',
                onClick: () =>
                  setMonth(
                    addCalendarMonths(`${monthValue}-01`, 1).slice(0, 7),
                  ),
              },
              '›',
            ),
          ]),
          h('table', { role: 'grid', 'aria-labelledby': titleId }, [
            h('thead', [
              h(
                'tr',
                Array.from({ length: 7 }, (_, index) => {
                  const date = new Date(
                    Date.UTC(2023, 0, 1 + ((props.firstDayOfWeek + index) % 7)),
                  );
                  return h('th', { scope: 'col' }, weekdayLabel.format(date));
                }),
              ),
            ]),
            h(
              'tbody',
              Array.from({ length: 6 }, (_, week) =>
                h(
                  'tr',
                  days.value.slice(week * 7, week * 7 + 7).map((day) =>
                    h(
                      'td',
                      {
                        role: 'gridcell',
                        'aria-selected': selected.value === day.value,
                      },
                      h(
                        'button',
                        {
                          type: 'button',
                          'data-slot': 'calendar-day',
                          'data-date': day.value,
                          'data-outside': day.outside || undefined,
                          'data-state':
                            selected.value === day.value
                              ? 'selected'
                              : undefined,
                          'aria-current':
                            today === day.value ? 'date' : undefined,
                          'aria-label': dayLabel.format(dateFor(day.value)),
                          'aria-disabled': isDisabled(day.value) || undefined,
                          tabindex: day.value === anchor ? 0 : -1,
                          onClick: () => choose(day.value),
                          onKeydown: (event: KeyboardEvent) => {
                            if (
                              ![
                                'ArrowLeft',
                                'ArrowRight',
                                'ArrowUp',
                                'ArrowDown',
                                'Home',
                                'End',
                                'PageUp',
                                'PageDown',
                              ].includes(event.key)
                            )
                              return;
                            event.preventDefault();
                            focusDate(
                              moveCalendarDate(day.value, event.key, {
                                direction: props.direction,
                                firstDayOfWeek: props.firstDayOfWeek,
                              }),
                            );
                          },
                        },
                        String(day.day),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ]),
          props.name
            ? h('input', {
                type: 'hidden',
                name: props.name,
                value: selected.value,
              })
            : null,
        ],
      );
    };
  },
});

export const DatePicker = defineComponent({
  name: 'SimurghDatePicker',
  props: {
    modelValue: String,
    defaultValue: { type: String, default: '' },
    month: String,
    defaultMonth: String,
    locale: { type: String, default: 'en' },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
    firstDayOfWeek: { type: Number, default: 0 },
    min: String,
    max: String,
    disabledDates: { type: Array as PropType<string[]>, default: () => [] },
    name: String,
    label: { type: String, default: 'Date picker calendar' },
    placeholder: { type: String, default: 'Pick a date' },
    required: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'update:month'],
  setup(props, { emit }) {
    const localValue = ref(props.defaultValue);
    const open = ref(false);
    const root = ref<HTMLElement | null>(null);
    const selected = computed(() => props.modelValue ?? localValue.value);
    const displayValue = computed(() =>
      selected.value
        ? new Intl.DateTimeFormat(props.locale, {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(`${selected.value}T00:00:00Z`))
        : props.placeholder,
    );
    const choose = (date: string) => {
      if (props.modelValue === undefined) localValue.value = date;
      emit('update:modelValue', date);
      open.value = false;
      requestAnimationFrame(() =>
        root.value
          ?.querySelector<HTMLElement>('[data-slot="date-picker-trigger"]')
          ?.focus(),
      );
    };
    return () =>
      h('div', { ref: root, 'data-slot': 'date-picker' }, [
        h(
          Popover,
          {
            open: open.value,
            'onUpdate:open': (value: boolean) => (open.value = value),
          },
          {
            default: () => [
              h(
                PopoverTrigger,
                {
                  'data-slot': 'date-picker-trigger',
                  disabled: props.disabled,
                },
                () => displayValue.value,
              ),
              h(
                PopoverContent,
                {
                  'data-slot': 'date-picker-content',
                  'aria-label': props.label,
                },
                () =>
                  h(Calendar, {
                    modelValue: selected.value,
                    ...(props.month === undefined
                      ? {}
                      : { month: props.month }),
                    ...(props.defaultMonth === undefined
                      ? {}
                      : { defaultMonth: props.defaultMonth }),
                    locale: props.locale,
                    direction: props.direction,
                    firstDayOfWeek: props.firstDayOfWeek,
                    ...(props.min === undefined ? {} : { min: props.min }),
                    ...(props.max === undefined ? {} : { max: props.max }),
                    disabledDates: props.disabledDates,
                    label: props.label,
                    'onUpdate:modelValue': choose,
                    'onUpdate:month': (value: string) =>
                      emit('update:month', value),
                  }),
              ),
            ],
          },
        ),
        props.name
          ? h('input', {
              type: 'hidden',
              name: props.name,
              value: selected.value,
              disabled: props.disabled,
            })
          : null,
        props.required
          ? h('input', {
              tabindex: -1,
              'aria-hidden': 'true',
              required: true,
              disabled: props.disabled,
              value: selected.value,
              style: 'position:absolute;opacity:0;pointer-events:none',
              onInput: () => undefined,
            })
          : null,
      ]);
  },
});

type CarouselContext = {
  index: Ref<number>;
  count: Ref<number>;
  loop: Ref<boolean>;
  direction: Ref<Direction>;
  goTo(index: number): void;
};
const carouselKey: InjectionKey<CarouselContext> = Symbol('carousel');

export const Carousel = defineComponent({
  name: 'SimurghCarousel',
  props: {
    label: { type: String, default: 'Carousel' },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
    loop: Boolean,
    defaultIndex: { type: Number, default: 0 },
  },
  emits: ['update:index'],
  setup(props, { attrs, slots, emit }) {
    const index = ref(Math.max(0, props.defaultIndex));
    const count = ref(0);
    const loop = computed(() => props.loop);
    const direction = computed(() => props.direction);
    const goTo = (next: number) => {
      if (!count.value) return;
      const resolved = props.loop
        ? (next + count.value) % count.value
        : Math.max(0, Math.min(count.value - 1, next));
      if (resolved !== index.value) {
        index.value = resolved;
        emit('update:index', resolved);
      }
    };
    provide(carouselKey, { index, count, loop, direction, goTo });
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-slot': 'carousel',
          role: 'region',
          'aria-roledescription': 'carousel',
          'aria-label': props.label,
          dir: props.direction,
          onKeydown: (event: KeyboardEvent) => {
            if (typeof attrs.onKeydown === 'function') attrs.onKeydown(event);
            if (event.defaultPrevented) return;
            const previous =
              props.direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
            const next = props.direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
            if (event.key === previous || event.key === next) {
              event.preventDefault();
              goTo(index.value + (event.key === next ? 1 : -1));
            }
          },
        },
        slots.default?.(),
      );
  },
});

export const CarouselContent = defineComponent({
  name: 'SimurghCarouselContent',
  setup(_, { attrs, slots }) {
    const context = inject(carouselKey)!;
    const sync = () => (context.count.value = slots.default?.().length ?? 0);
    onMounted(sync);
    onUpdated(sync);
    return () => {
      const slides = slots.default?.() ?? [];
      return h(
        'div',
        { ...attrs, 'data-slot': 'carousel-content', 'aria-live': 'polite' },
        slides.map((slide, index) =>
          cloneVNode(slide, {
            'aria-label': `${index + 1} of ${slides.length}`,
            'aria-hidden': context.index.value !== index,
            hidden: context.index.value !== index,
            'data-index': index,
          }),
        ),
      );
    };
  },
});

export const CarouselItem = defineComponent({
  name: 'SimurghCarouselItem',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-slot': 'carousel-item',
          role: 'group',
          'aria-roledescription': 'slide',
        },
        slots.default?.(),
      );
  },
});

function carouselControl(name: string, step: -1 | 1, label: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      const context = inject(carouselKey)!;
      const unavailable = computed(
        () =>
          !context.loop.value &&
          (step < 0
            ? context.index.value <= 0
            : context.index.value >= context.count.value - 1),
      );
      return () =>
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            'data-slot': step < 0 ? 'carousel-previous' : 'carousel-next',
            'aria-label': label,
            disabled: unavailable.value || attrs.disabled === true,
            onClick: (event: MouseEvent) => {
              if (typeof attrs.onClick === 'function') attrs.onClick(event);
              if (!event.defaultPrevented)
                context.goTo(context.index.value + step);
            },
          },
          slots.default?.(),
        );
    },
  });
}
export const CarouselPrevious = carouselControl(
  'SimurghCarouselPrevious',
  -1,
  'Previous slide',
);
export const CarouselNext = carouselControl(
  'SimurghCarouselNext',
  1,
  'Next slide',
);

type ResizableContext = {
  orientation: Ref<Orientation>;
  direction: Ref<Direction>;
  sizes: Ref<number[]>;
  minimums: number[];
  maximums: number[];
  defaults: number[];
  root: Ref<HTMLElement | null>;
  registerPanel(defaultSize: number, minSize: number, maxSize: number): number;
  adjust(boundary: number, delta: number): void;
};
const resizableKey: InjectionKey<ResizableContext> = Symbol('resizable');
const normalizeResizableSizes = (values: number[]) => {
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  return values.map((value) =>
    total ? (Math.max(0, value) / total) * 100 : 100 / values.length,
  );
};

export const ResizablePanelGroup = defineComponent({
  name: 'SimurghResizablePanelGroup',
  props: {
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    direction: { type: String as PropType<Direction>, default: 'ltr' },
  },
  setup(props, { attrs, slots }) {
    const orientation = computed(() => props.orientation);
    const direction = computed(() => props.direction);
    const sizes = ref<number[]>([]);
    const minimums: number[] = [];
    const maximums: number[] = [];
    const defaults: number[] = [];
    const root = ref<HTMLElement | null>(null);
    const registerPanel = (
      defaultSize: number,
      minSize: number,
      maxSize: number,
    ) => {
      const index = defaults.length;
      defaults.push(defaultSize);
      minimums.push(minSize);
      maximums.push(maxSize);
      sizes.value = normalizeResizableSizes(defaults);
      return index;
    };
    const adjust = (boundary: number, delta: number) => {
      const current = sizes.value;
      if (boundary < 0 || boundary >= current.length - 1) return;
      const total = current[boundary]! + current[boundary + 1]!;
      const low = Math.max(
        minimums[boundary]!,
        total - maximums[boundary + 1]!,
      );
      const high = Math.min(
        maximums[boundary]!,
        total - minimums[boundary + 1]!,
      );
      const before = Math.max(low, Math.min(high, current[boundary]! + delta));
      const next = [...current];
      next[boundary] = before;
      next[boundary + 1] = total - before;
      sizes.value = next;
    };
    provide(resizableKey, {
      orientation,
      direction,
      sizes,
      minimums,
      maximums,
      defaults,
      root,
      registerPanel,
      adjust,
    });
    onMounted(() => {
      sizes.value = normalizeResizableSizes(defaults);
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          ref: root,
          'data-slot': 'resizable-panel-group',
          'data-orientation': props.orientation,
          dir: props.direction,
        },
        slots.default?.(),
      );
  },
});

export const ResizablePanel = defineComponent({
  name: 'SimurghResizablePanel',
  props: {
    defaultSize: { type: Number, default: 1 },
    minSize: { type: Number, default: 10 },
    maxSize: { type: Number, default: 90 },
  },
  setup(props, { attrs, slots }) {
    const context = inject(resizableKey)!;
    const index = context.registerPanel(
      props.defaultSize,
      props.minSize,
      props.maxSize,
    );
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-slot': 'resizable-panel',
          style: [
            attrs.style,
            { flexBasis: `${context.sizes.value[index] ?? 100}%` },
          ],
        },
        slots.default?.(),
      );
  },
});

export const ResizableHandle = defineComponent({
  name: 'SimurghResizableHandle',
  setup(_, { attrs, slots }) {
    const context = inject(resizableKey)!;
    const boundary = context.defaults.length - 1;
    const effectiveMinimum = () =>
      Math.max(
        context.minimums[boundary]!,
        (context.sizes.value[boundary] ?? 0) +
          (context.sizes.value[boundary + 1] ?? 0) -
          context.maximums[boundary + 1]!,
      );
    const effectiveMaximum = () =>
      Math.min(
        context.maximums[boundary]!,
        (context.sizes.value[boundary] ?? 0) +
          (context.sizes.value[boundary + 1] ?? 0) -
          context.minimums[boundary + 1]!,
      );
    const move = (key: string) => {
      const current = context.sizes.value[boundary] ?? 0;
      if (key === 'Home')
        return context.adjust(boundary, effectiveMinimum() - current);
      if (key === 'End')
        return context.adjust(boundary, effectiveMaximum() - current);
      const previous =
        context.orientation.value === 'vertical'
          ? 'ArrowUp'
          : context.direction.value === 'rtl'
            ? 'ArrowRight'
            : 'ArrowLeft';
      const next =
        context.orientation.value === 'vertical'
          ? 'ArrowDown'
          : context.direction.value === 'rtl'
            ? 'ArrowLeft'
            : 'ArrowRight';
      if (key === previous) context.adjust(boundary, -5);
      else if (key === next) context.adjust(boundary, 5);
    };
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-slot': 'resizable-handle',
          role: 'separator',
          'aria-orientation':
            context.orientation.value === 'horizontal'
              ? 'vertical'
              : 'horizontal',
          'aria-valuemin': effectiveMinimum(),
          'aria-valuemax': effectiveMaximum(),
          'aria-valuenow': Math.round(context.sizes.value[boundary] ?? 0),
          onKeydown: (event: KeyboardEvent) => {
            if (typeof attrs.onKeydown === 'function') attrs.onKeydown(event);
            if (
              !event.defaultPrevented &&
              [
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
                'Home',
                'End',
              ].includes(event.key)
            ) {
              event.preventDefault();
              move(event.key);
            }
          },
          onPointerdown: (event: PointerEvent) => {
            if (typeof attrs.onPointerdown === 'function')
              attrs.onPointerdown(event);
            if (event.defaultPrevented) return;
            let previous =
              context.orientation.value === 'horizontal'
                ? event.clientX
                : event.clientY;
            const size =
              context.orientation.value === 'horizontal'
                ? context.root.value?.clientWidth
                : context.root.value?.clientHeight;
            if (!size) return;
            const onMove = (next: PointerEvent) => {
              const coordinate =
                context.orientation.value === 'horizontal'
                  ? next.clientX
                  : next.clientY;
              let delta = ((coordinate - previous) / size) * 100;
              previous = coordinate;
              if (
                context.orientation.value === 'horizontal' &&
                context.direction.value === 'rtl'
              )
                delta *= -1;
              context.adjust(boundary, delta);
            };
            const onUp = () => {
              window.removeEventListener('pointermove', onMove);
              window.removeEventListener('pointerup', onUp);
            };
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp, { once: true });
          },
        },
        slots.default?.(),
      );
  },
});

type SidebarContext = {
  open: Ref<boolean>;
  setOpen(open: boolean): void;
  contentId: string;
};
const sidebarKey: InjectionKey<SidebarContext> = Symbol('sidebar');
function useSidebarContext() {
  const context = inject(sidebarKey);
  if (!context) throw new Error('Sidebar components require SidebarProvider');
  return context;
}
export const SidebarProvider = defineComponent({
  name: 'SimurghSidebarProvider',
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: true },
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const localOpen = ref(props.defaultOpen);
    const open = computed({
      get: () => props.open ?? localOpen.value,
      set: (value: boolean) => {
        if (props.open === undefined) localOpen.value = value;
        emit('update:open', value);
      },
    });
    const contentId = createId('sidebar');
    provide(sidebarKey, {
      open,
      setOpen: (value) => (open.value = value),
      contentId,
    });
    return () =>
      h(
        'div',
        {
          'data-slot': 'sidebar-provider',
          'data-state': open.value ? 'open' : 'closed',
        },
        slots.default?.(),
      );
  },
});
export const Sidebar = defineComponent({
  name: 'SimurghSidebar',
  inheritAttrs: false,
  props: {
    side: { type: String as PropType<'start' | 'end'>, default: 'start' },
  },
  setup(props, { attrs, slots }) {
    const context = useSidebarContext();
    return () =>
      h(
        'aside',
        {
          ...attrs,
          id: context.contentId,
          'data-slot': 'sidebar',
          'data-side': props.side,
          'data-state': context.open.value ? 'open' : 'closed',
          hidden: !context.open.value,
        },
        slots.default?.(),
      );
  },
});
export const SidebarTrigger = defineComponent({
  name: 'SimurghSidebarTrigger',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const context = useSidebarContext();
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: (attrs.type as string | undefined) ?? 'button',
          'data-slot': 'sidebar-trigger',
          'aria-controls': context.contentId,
          'aria-expanded': context.open.value,
          onClick: (event: MouseEvent) => {
            if (typeof attrs.onClick === 'function') attrs.onClick(event);
            if (!event.defaultPrevented) context.setOpen(!context.open.value);
          },
        },
        slots.default?.() ??
          (context.open.value ? 'Close navigation' : 'Open navigation'),
      );
  },
});
function sidebarPart(name: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      return () => h('div', { ...attrs, 'data-slot': slot }, slots.default?.());
    },
  });
}
export const SidebarHeader = sidebarPart(
  'SimurghSidebarHeader',
  'sidebar-header',
);
export const SidebarContent = sidebarPart(
  'SimurghSidebarContent',
  'sidebar-content',
);
export const SidebarFooter = sidebarPart(
  'SimurghSidebarFooter',
  'sidebar-footer',
);
export const SidebarGroup = sidebarPart('SimurghSidebarGroup', 'sidebar-group');
export const SidebarMenu = defineComponent({
  name: 'SimurghSidebarMenu',
  setup(_, { attrs, slots }) {
    return () =>
      h('ul', { ...attrs, 'data-slot': 'sidebar-menu' }, slots.default?.());
  },
});
export const Tree = defineComponent({
  name: 'SimurghTree',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const root = ref<HTMLElement | null>(null);
    onMounted(() => {
      root.value
        ?.querySelectorAll<HTMLButtonElement>('[role="treeitem"]')
        .forEach((item, index) => (item.tabIndex = index === 0 ? 0 : -1));
    });
    const focusItem = (
      items: HTMLButtonElement[],
      current: number,
      target: number,
    ) => {
      if (target < 0 || target === current) return;
      items[current]?.setAttribute('tabindex', '-1');
      if (items[target]) {
        items[target].tabIndex = 0;
        items[target].focus();
      }
    };
    const moveFocus = (event: KeyboardEvent) => {
      const root = event.currentTarget as HTMLElement;
      const items = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[role="treeitem"]'),
      ).filter(
        (item) => !item.disabled && !item.closest('[role="group"][hidden]'),
      );
      const current = items.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      let target = current;
      if (event.key === 'ArrowDown')
        target = Math.min(current + 1, items.length - 1);
      else if (event.key === 'ArrowUp') target = Math.max(current - 1, 0);
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = items.length - 1;
      else if (event.key === 'ArrowRight' && current >= 0) {
        const item = items[current]!;
        if (item.getAttribute('aria-expanded') === 'false') item.click();
        else {
          const child = item
            .closest('li')
            ?.querySelector<HTMLButtonElement>(
              '[role="group"] [role="treeitem"]',
            );
          if (child) focusItem(items, current, items.indexOf(child));
        }
        event.preventDefault();
        return;
      } else if (event.key === 'ArrowLeft' && current >= 0) {
        const item = items[current]!;
        if (item.getAttribute('aria-expanded') === 'true') item.click();
        else {
          const parent = item.parentElement?.parentElement
            ?.closest('li')
            ?.querySelector<HTMLButtonElement>(':scope > [role="treeitem"]');
          if (parent) focusItem(items, current, items.indexOf(parent));
        }
        event.preventDefault();
        return;
      } else return;
      if (target !== current && target >= 0) {
        event.preventDefault();
        focusItem(items, current, target);
      }
    };
    return () =>
      h(
        'ul',
        {
          ...attrs,
          ref: root,
          role: 'tree',
          'data-slot': 'tree',
          onKeydown: (event: KeyboardEvent) => {
            if (typeof attrs.onKeydown === 'function') attrs.onKeydown(event);
            if (!event.defaultPrevented) moveFocus(event);
          },
        },
        slots.default?.(),
      );
  },
});
export const TreeItem = defineComponent({
  name: 'SimurghTreeItem',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    expandable: { type: Boolean, default: undefined },
    expanded: { type: Boolean, default: undefined },
    defaultExpanded: Boolean,
    disabled: Boolean,
  },
  emits: ['update:expanded'],
  setup(props, { attrs, slots, emit }) {
    const localExpanded = ref(props.defaultExpanded);
    const expanded = computed({
      get: () => props.expanded ?? localExpanded.value,
      set: (value: boolean) => {
        if (props.expanded === undefined) localExpanded.value = value;
        emit('update:expanded', value);
      },
    });
    const groupId = createId('tree-group');
    return () => {
      const expandable = props.expandable ?? Boolean(slots.default);
      return h('li', { ...attrs, role: 'none', 'data-slot': 'tree-node' }, [
        h(
          'button',
          {
            type: 'button',
            role: 'treeitem',
            'data-slot': 'tree-item',
            'aria-expanded': expandable ? expanded.value : undefined,
            'aria-controls': expandable ? groupId : undefined,
            'aria-disabled': props.disabled || undefined,
            disabled: props.disabled,
            tabindex: -1,
            onClick: () => expandable && (expanded.value = !expanded.value),
          },
          props.label,
        ),
        expandable
          ? h(
              'ul',
              {
                id: groupId,
                role: 'group',
                'data-slot': 'tree-group',
                hidden: !expanded.value,
              },
              slots.default?.(),
            )
          : undefined,
      ]);
    };
  },
});
function acceptedUploadFiles(files: File[], accept?: string) {
  if (!accept) return files;
  const rules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  return files.filter((file) => {
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) =>
      rule.startsWith('.')
        ? name.endsWith(rule)
        : rule.endsWith('/*')
          ? type.startsWith(rule.slice(0, -1))
          : type === rule,
    );
  });
}
export const FileUpload = defineComponent({
  name: 'SimurghFileUpload',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    description: { type: String, default: 'Drop files here or browse' },
    accept: String,
    multiple: Boolean,
    disabled: Boolean,
    required: Boolean,
    name: String,
  },
  emits: ['files-change'],
  setup(props, { attrs, emit }) {
    const id = (attrs.id as string | undefined) ?? createId('file');
    const names = ref<string[]>([]);
    const update = (files: File[]) => {
      if (props.disabled) return;
      const accepted = acceptedUploadFiles(files, props.accept);
      const next = props.multiple ? accepted : accepted.slice(0, 1);
      names.value = next.map((file) => file.name);
      emit('files-change', next);
    };
    return () =>
      h(
        'label',
        {
          for: id,
          'data-slot': 'file-upload',
          'data-disabled': props.disabled || undefined,
          onDragover: (event: DragEvent) => {
            if (!props.disabled) event.preventDefault();
          },
          onDrop: (event: DragEvent) => {
            if (props.disabled) return;
            event.preventDefault();
            update(Array.from(event.dataTransfer?.files ?? []));
          },
        },
        [
          h('input', {
            ...attrs,
            id,
            type: 'file',
            'data-slot': 'file-upload-input',
            accept: props.accept,
            multiple: props.multiple,
            disabled: props.disabled,
            required: props.required,
            name: props.name,
            onChange: (event: Event) =>
              update(
                Array.from(
                  (event.currentTarget as HTMLInputElement).files ?? [],
                ),
              ),
          }),
          h('strong', { 'data-slot': 'file-upload-label' }, props.label),
          props.description
            ? h(
                'span',
                { 'data-slot': 'file-upload-description' },
                props.description,
              )
            : undefined,
          h(
            'span',
            { 'data-slot': 'file-upload-status', 'aria-live': 'polite' },
            names.value.length ? names.value.join(', ') : 'No files selected',
          ),
        ],
      );
  },
});
export const PasswordInput = defineComponent({
  name: 'SimurghPasswordInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: '' },
    disabled: Boolean,
    readonly: Boolean,
    revealLabel: { type: String, default: 'Show password' },
    concealLabel: { type: String, default: 'Hide password' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const revealed = ref(false);
    const localValue = ref(props.defaultValue);
    const id = (attrs.id as string | undefined) ?? createId('password');
    const value = computed(() => props.modelValue ?? localValue.value);
    return () =>
      h(
        'div',
        {
          'data-slot': 'password-input',
          'data-disabled': props.disabled || undefined,
        },
        [
          h('input', {
            ...attrs,
            id,
            type: revealed.value ? 'text' : 'password',
            'data-slot': 'password-input-control',
            value: value.value,
            disabled: props.disabled,
            readonly: props.readonly,
            onInput: (event: Event) => {
              if (typeof attrs.onInput === 'function') attrs.onInput(event);
              const next = (event.currentTarget as HTMLInputElement).value;
              if (props.modelValue === undefined) localValue.value = next;
              emit('update:modelValue', next);
            },
          }),
          h(
            'button',
            {
              type: 'button',
              'data-slot': 'password-input-toggle',
              'aria-controls': id,
              'aria-label': revealed.value
                ? props.concealLabel
                : props.revealLabel,
              'aria-pressed': revealed.value,
              disabled: props.disabled,
              onClick: () => (revealed.value = !revealed.value),
            },
            revealed.value ? 'Hide' : 'Show',
          ),
        ],
      );
  },
});

export type ToastMessage = { id: string; title: string; description?: string };
const toastKey: InjectionKey<{
  messages: Ref<ToastMessage[]>;
  toast(m: Omit<ToastMessage, 'id'>): void;
  dismiss(id: string): void;
}> = Symbol('toast');
export const ToastProvider = defineComponent({
  setup(_, { slots }) {
    const messages = ref<ToastMessage[]>([]);
    const dismiss = (id: string) =>
      (messages.value = messages.value.filter((m) => m.id !== id));
    provide(toastKey, {
      messages,
      dismiss,
      toast: (m) => {
        const id = createId('toast');
        messages.value.push({ ...m, id });
        setTimeout(() => dismiss(id), 5000);
      },
    });
    return () => slots.default?.();
  },
});
export function useToast() {
  const c = inject(toastKey);
  if (!c) throw new Error('useToast requires ToastProvider');
  return c;
}
export const ToastViewport = defineComponent({
  setup() {
    const c = useToast();
    return () =>
      h(
        'div',
        { class: 'simurgh-toast-region', 'aria-label': 'Notifications' },
        c.messages.value.map((m) =>
          h('div', { role: 'status', class: 'simurgh-content simurgh-toast' }, [
            h('strong', m.title),
            m.description && h('div', m.description),
            h(
              'button',
              {
                onClick: () => c.dismiss(m.id),
                'aria-label': 'Dismiss notification',
              },
              '×',
            ),
          ]),
        ),
      );
  },
});
