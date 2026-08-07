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
    kind: 'popover' | 'tooltip' | 'menu';
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

function floatingRoot(name: string, kind: 'popover' | 'tooltip' | 'menu') {
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
            c.kind === 'tooltip' ? undefined : () => c.setOpen(!c.open.value),
          onMouseenter:
            c.kind === 'tooltip' ? () => c.setOpen(true) : undefined,
          onMouseleave:
            c.kind === 'tooltip' ? () => c.setOpen(false) : undefined,
          onFocus: c.kind === 'tooltip' ? () => c.setOpen(true) : undefined,
          onBlur: c.kind === 'tooltip' ? () => c.setOpen(false) : undefined,
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
