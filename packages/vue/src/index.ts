import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import {
  createId,
  nextIndex,
  trapFocus,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';
import {
  Teleport,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
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
