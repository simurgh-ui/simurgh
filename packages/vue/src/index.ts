import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from './floating.js';
import {
  addCalendarMonths,
  calendarMonthDays,
  calendarToday,
  createId,
  moveCalendarDate,
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
import { compositeKeydown } from './internal/composite-keydown.js';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './components/dialog.js';

type OpenContext = {
  open: Ref<boolean>;
  setOpen(value: boolean): void;
  id: string;
};
const floatingKey: InjectionKey<
  OpenContext & {
    trigger: Ref<HTMLElement | null>;
    content: Ref<HTMLElement | null>;
    kind: 'popover' | 'tooltip' | 'hovercard' | 'menu';
  }
> = Symbol('floating');
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
} from './components/sheet.js';
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from './components/drawer.js';
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/alert-dialog.js';

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
export const Popover = /* @__PURE__ */ floatingRoot(
  'SimurghPopover',
  'popover',
);
export const Tooltip = /* @__PURE__ */ floatingRoot(
  'SimurghTooltip',
  'tooltip',
);
export const HoverCard = /* @__PURE__ */ floatingRoot(
  'SimurghHoverCard',
  'hovercard',
);
export const DropdownMenu = /* @__PURE__ */ floatingRoot(
  'SimurghDropdownMenu',
  'menu',
);
export const FloatingTrigger = /* @__PURE__ */ defineComponent({
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
export const FloatingContent = /* @__PURE__ */ defineComponent({
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
export const PopoverContent = FloatingContent,
  TooltipContent = FloatingContent;
export const HoverCardTrigger = /* @__PURE__ */ defineComponent({
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
export const HoverCardContent = /* @__PURE__ */ defineComponent({
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

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/accordion.js';
export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './components/collapsible.js';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/tabs.js';

export { Checkbox } from './components/checkbox.js';
export { Label } from './components/label.js';
export { Progress } from './components/progress.js';
export { Separator } from './components/separator.js';
export { Switch } from './components/switch.js';

export { Toggle } from './components/toggle.js';
export { ToggleGroup, ToggleGroupItem } from './components/toggle-group.js';

export { Alert } from './components/alert.js';
export { AspectRatio } from './components/aspect-ratio.js';
export { Avatar } from './components/avatar.js';
export { Skeleton } from './components/skeleton.js';
export { Spinner } from './components/spinner.js';
export { VisuallyHidden } from './components/visually-hidden.js';

export { Button } from './components/button.js';

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from './components/button-group.js';

export { Input } from './components/input.js';
export { Link } from './components/link.js';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from './components/input-group.js';
export { InputOtp } from './components/input-otp.js';

export { Meter } from './components/meter.js';
export { NativeSelect } from './components/native-select.js';
export { Slider } from './components/slider.js';

export { Toolbar, ToolbarButton } from './components/toolbar.js';

export { ScrollArea } from './components/scroll-area.js';
export { Textarea } from './components/textarea.js';

export { Badge, type BadgeTone } from './components/badge.js';

export { Breadcrumb } from './components/breadcrumb.js';

export {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './components/navigation-menu.js';

export { Menubar, MenubarItem } from './components/menubar.js';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/card.js';
export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './components/empty.js';
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from './components/item.js';
export { Kbd } from './components/kbd.js';
export {
  Field,
  FieldDescription,
  FieldError,
  FieldLegend,
} from './components/field.js';
export { Form, FormErrorSummary } from './components/form.js';
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/table.js';
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from './components/pagination.js';

export { RadioGroup, RadioGroupItem } from './components/radio-group.js';
export { Select, type SelectOption } from './components/select.js';
export { Combobox, type ComboboxOption } from './components/combobox.js';

export { Command } from './components/command.js';

export const Calendar = /* @__PURE__ */ defineComponent({
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

export const DatePicker = /* @__PURE__ */ defineComponent({
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

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/carousel.js';

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

export const ResizablePanelGroup = /* @__PURE__ */ defineComponent({
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

export const ResizablePanel = /* @__PURE__ */ defineComponent({
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

export const ResizableHandle = /* @__PURE__ */ defineComponent({
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

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from './components/sidebar.js';
export { Tree, TreeItem } from './components/tree.js';
export { FileUpload } from './components/file-upload.js';
export { PasswordInput } from './components/password-input.js';
export { NumberInput } from './components/number-input.js';

export { Rating } from './components/rating.js';
export { TagsInput } from './components/tags-input.js';

export {
  ToastProvider,
  ToastViewport,
  useToast,
  type ToastMessage,
} from './components/toast.js';
