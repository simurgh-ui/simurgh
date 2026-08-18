export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './components/dialog.js';

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

export {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/popover.js';
export {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './components/tooltip.js';
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './components/hover-card.js';
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/dropdown-menu.js';

export {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './components/context-menu.js';

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
export {
  Disclosure,
  DisclosureContent,
  DisclosureSummary,
} from './components/disclosure.js';
export {
  DescriptionList,
  DescriptionListDetails,
  DescriptionListGroup,
  DescriptionListTerm,
} from './components/description-list.js';
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

export { Calendar } from './components/calendar.js';

export { DatePicker } from './components/date-picker.js';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/carousel.js';

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/resizable.js';

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
export * from './components/chart.js';

import {
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

const accordionKey: InjectionKey<{
  open: Ref<string[]>;
  toggle(value: string): void;
}> = Symbol('accordion');
const itemKey: InjectionKey<string> = Symbol('item');

export const Accordion = /* @__PURE__ */ defineComponent({
  props: {
    multiple: Boolean,
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
  },
  setup(props, { slots }) {
    const open = ref([...props.defaultValue]);
    provide(accordionKey, {
      open,
      toggle: (value) =>
        (open.value = open.value.includes(value)
          ? open.value.filter((entry) => entry !== value)
          : props.multiple
            ? [...open.value, value]
            : [value]),
    });
    return () => slots.default?.();
  },
});

export const AccordionItem = /* @__PURE__ */ defineComponent({
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    provide(itemKey, props.value);
    return () => h('div', attrs, slots.default?.());
  },
});

export const AccordionTrigger = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(accordionKey)!;
    const value = inject(itemKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'aria-expanded': context.open.value.includes(value),
          onClick: () => context.toggle(value),
        },
        slots.default?.(),
      );
  },
});

export const AccordionContent = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(accordionKey)!;
    const value = inject(itemKey)!;
    return () =>
      context.open.value.includes(value)
        ? h('div', { ...attrs, role: 'region' }, slots.default?.())
        : null;
  },
});

import { trapFocus } from '@simurgh-ui/core';
import {
  Teleport,
  defineComponent,
  h,
  inject,
  nextTick,
  ref,
  watch,
} from 'vue';
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  dialogKey,
} from './dialog.js';

export const AlertDialog = Dialog;
export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghAlertDialogContent',
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    const element = ref<HTMLElement | null>(null);
    let previous: HTMLElement | null = null;
    watch(context.open, async (open) => {
      if (open) {
        previous = document.activeElement as HTMLElement;
        await nextTick();
        element.value
          ?.querySelector<HTMLElement>('[data-slot=alert-dialog-cancel]')
          ?.focus();
      } else if (previous?.isConnected) previous.focus();
    });
    return () =>
      context.open.value
        ? h(Teleport, { to: 'body' }, [
            h('div', {
              class: 'simurgh-overlay',
              onMousedown: (event: MouseEvent) => {
                if (event.target === event.currentTarget)
                  context.setOpen(false);
              },
            }),
            h(
              'div',
              {
                ...attrs,
                ref: element,
                role: 'alertdialog',
                'aria-modal': 'true',
                'aria-labelledby': attrs['aria-label']
                  ? undefined
                  : `${context.id}-title`,
                'aria-describedby':
                  attrs['aria-describedby'] ?? `${context.id}-description`,
                tabindex: -1,
                'data-slot': 'alert-dialog-content',
                class: ['simurgh-content simurgh-dialog', attrs.class],
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === 'Escape') context.setOpen(false);
                  else if (element.value) trapFocus(event, element.value);
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
      const context = inject(dialogKey)!;
      return () =>
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            'data-slot': slot,
            onClick: () => {
              emit('select');
              context.setOpen(false);
            },
          },
          slots.default?.(),
        );
    },
  });
}

export const AlertDialogAction = /* @__PURE__ */ alertDialogButton(
  'SimurghAlertDialogAction',
  'alert-dialog-action',
);
export const AlertDialogCancel = /* @__PURE__ */ alertDialogButton(
  'SimurghAlertDialogCancel',
  'alert-dialog-cancel',
);

import { defineComponent, h } from 'vue';

export const Alert = /* @__PURE__ */ defineComponent({
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

import { computed, defineComponent, h } from 'vue';

export const AspectRatio = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h, ref, watch } from 'vue';

export const Avatar = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h, type PropType } from 'vue';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export const Badge = /* @__PURE__ */ defineComponent({
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

export { Checkbox } from './checkbox.js';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card.js';
export { Alert } from './alert.js';
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion.js';
export { Input } from './input.js';
export { Label } from './label.js';
export { NativeSelect } from './native-select.js';
export { Progress } from './progress.js';
export { Separator } from './separator.js';
export { Skeleton } from './skeleton.js';
export { Spinner } from './spinner.js';
export { Switch } from './switch.js';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs.js';
export { Textarea } from './textarea.js';
export { Badge } from './badge.js';
export { NumberInput } from './number-input.js';
export { RadioGroup, RadioGroupItem } from './radio-group.js';
export { Button } from './button.js';
export { Rating } from './rating.js';
export { TagsInput } from './tags-input.js';

import { defineComponent, h } from 'vue';

export const Breadcrumb = /* @__PURE__ */ defineComponent({
  name: 'SimurghBreadcrumb',
  props: { label: { type: String, default: 'Breadcrumb' } },
  setup(props, { attrs, slots }) {
    return () =>
      h('nav', { ...attrs, 'aria-label': props.label }, slots.default?.());
  },
});

import type { Orientation } from '@simurgh-ui/core';
import { defineComponent, h, type PropType } from 'vue';

export const ButtonGroup = /* @__PURE__ */ defineComponent({
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

export const ButtonGroupText = /* @__PURE__ */ defineComponent({
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

export const ButtonGroupSeparator = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const Button = /* @__PURE__ */ defineComponent({
  name: 'SimurghButton',
  inheritAttrs: false,
  props: {
    loading: Boolean,
    disabled: Boolean,
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    fullWidth: Boolean,
    iconOnly: Boolean,
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
          'data-slot': 'button',
          'data-state': props.loading ? 'loading' : 'idle',
          'data-variant': props.variant,
          'data-size': props.size,
          'data-full-width': props.fullWidth || undefined,
          'data-icon-only': props.iconOnly || undefined,
          onClick:
            props.disabled || props.loading ? undefined : attrs['onClick'],
        },
        slots.default?.(),
      );
  },
});

import type { Direction } from '@simurgh-ui/core';
import { defineComponent, h, ref, type PropType } from 'vue';

const dateValue = (date: Date) => date.toJSON().slice(0, 10);
const addDays = (value: string, amount: number) => {
  const date = new Date(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return dateValue(date);
};
const addMonths = (value: string, amount: number) => {
  const date = new Date(value);
  const day = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + amount, 1);
  const month = date.getUTCMonth();
  date.setUTCDate(day);
  if (date.getUTCMonth() !== month) date.setUTCDate(0);
  return dateValue(date);
};
const monthDays = (month: string, firstDay: number) => {
  const first = new Date(`${month}-01`);
  const offset = (first.getUTCDay() - firstDay + 7) % 7;
  const start = addDays(dateValue(first), -offset);
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
};
const moveDate = (
  value: string,
  key: string,
  direction: Direction,
  firstDay: number,
) => {
  if (key === 'ArrowUp') return addDays(value, -7);
  if (key === 'ArrowDown') return addDays(value, 7);
  if (key === 'ArrowLeft') return addDays(value, direction === 'rtl' ? 1 : -1);
  if (key === 'ArrowRight') return addDays(value, direction === 'rtl' ? -1 : 1);
  if (key === 'PageUp') return addMonths(value, -1);
  if (key === 'PageDown') return addMonths(value, 1);
  const offset = (new Date(value).getUTCDay() - firstDay + 7) % 7;
  return addDays(value, key === 'Home' ? -offset : 6 - offset);
};
const todayValue = () => {
  const today = new Date();
  return dateValue(
    new Date(today.getTime() - today.getTimezoneOffset() * 60_000),
  );
};

export const Calendar = /* @__PURE__ */ defineComponent({
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
    const today = todayValue();
    const localValue = ref(props.defaultValue);
    const localMonth = ref(
      props.defaultMonth ?? (props.defaultValue || today).slice(0, 7),
    );
    const root = ref<HTMLElement | null>(null);
    const displayedMonth = () => props.month ?? localMonth.value;
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
      if (date.slice(0, 7) !== displayedMonth()) setMonth(date.slice(0, 7));
      emit('update:modelValue', date);
    };
    const focusDate = (date: string) => {
      if (date.slice(0, 7) !== displayedMonth()) setMonth(date.slice(0, 7));
      requestAnimationFrame(() =>
        root.value
          ?.querySelector<HTMLElement>(`[data-date="${date}"]`)
          ?.focus(),
      );
    };
    return () => {
      const monthValue = displayedMonth();
      const selectedValue = props.modelValue ?? localValue.value;
      const days = monthDays(monthValue, props.firstDayOfWeek);
      const anchor =
        selectedValue.slice(0, 7) === monthValue
          ? selectedValue
          : `${monthValue}-01`;
      const monthLabel = new Date(`${monthValue}-01`).toLocaleDateString(
        props.locale,
        {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        },
      );
      const fullDate = (value: string) =>
        new Date(value).toLocaleDateString(props.locale, {
          dateStyle: 'full',
          timeZone: 'UTC',
        });
      const weekday = (date: Date) =>
        date.toLocaleDateString(props.locale, {
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
                  setMonth(addMonths(`${monthValue}-01`, -1).slice(0, 7)),
              },
              '\u2039',
            ),
            h('h2', { 'aria-live': 'polite' }, monthLabel),
            h(
              'button',
              {
                type: 'button',
                'aria-label': 'Next month',
                onClick: () =>
                  setMonth(addMonths(`${monthValue}-01`, 1).slice(0, 7)),
              },
              '\u203a',
            ),
          ]),
          h('table', { role: 'grid', 'aria-label': monthLabel }, [
            h('thead', [
              h(
                'tr',
                Array.from({ length: 7 }, (_, index) => {
                  const date = new Date(
                    Date.UTC(2023, 0, 1 + ((props.firstDayOfWeek + index) % 7)),
                  );
                  return h('th', { scope: 'col' }, weekday(date));
                }),
              ),
            ]),
            h(
              'tbody',
              Array.from({ length: 6 }, (_, week) =>
                h(
                  'tr',
                  days.slice(week * 7, week * 7 + 7).map((day) =>
                    h(
                      'td',
                      {
                        role: 'gridcell',
                        'aria-selected': selectedValue === day,
                      },
                      h(
                        'button',
                        {
                          type: 'button',
                          'data-slot': 'calendar-day',
                          'data-date': day,
                          'data-outside':
                            day.slice(0, 7) !== monthValue || undefined,
                          'data-state':
                            selectedValue === day ? 'selected' : undefined,
                          'aria-current': today === day ? 'date' : undefined,
                          'aria-label': fullDate(day),
                          'aria-disabled': isDisabled(day),
                          tabindex: day === anchor ? 0 : -1,
                          onClick: () => choose(day),
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
                              moveDate(
                                day,
                                event.key,
                                props.direction,
                                props.firstDayOfWeek,
                              ),
                            );
                          },
                        },
                        Number(day.slice(8)),
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
                value: selectedValue,
              })
            : null,
        ],
      );
    };
  },
});

import { cardPart } from '../internal/card-part.js';

export const Card = /* @__PURE__ */ cardPart('SimurghCard', 'div', 'card');
export const CardHeader = /* @__PURE__ */ cardPart(
  'SimurghCardHeader',
  'div',
  'card-header',
);
export const CardTitle = /* @__PURE__ */ cardPart(
  'SimurghCardTitle',
  'h3',
  'card-title',
);
export const CardDescription = /* @__PURE__ */ cardPart(
  'SimurghCardDescription',
  'p',
  'card-description',
);
export const CardContent = /* @__PURE__ */ cardPart(
  'SimurghCardContent',
  'div',
  'card-content',
);
export const CardFooter = /* @__PURE__ */ cardPart(
  'SimurghCardFooter',
  'div',
  'card-footer',
);

import { type Direction } from '@simurgh-ui/core';
import {
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

type CarouselContext = {
  index: Ref<number>;
  count: Ref<number>;
  loop: Ref<boolean>;
  direction: Ref<Direction>;
  goTo(index: number): void;
};

const carouselKey: InjectionKey<CarouselContext> =
  /* @__PURE__ */ Symbol('carousel');

export const Carousel = /* @__PURE__ */ defineComponent({
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

export const CarouselContent = /* @__PURE__ */ defineComponent({
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

export const CarouselItem = /* @__PURE__ */ defineComponent({
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

export const CarouselPrevious = /* @__PURE__ */ carouselControl(
  'SimurghCarouselPrevious',
  -1,
  'Previous slide',
);
export const CarouselNext = /* @__PURE__ */ carouselControl(
  'SimurghCarouselNext',
  1,
  'Next slide',
);

import {
  areaPath,
  bandScale,
  chartDomain,
  chartLayout,
  chartSummary,
  chartValue,
  linePath,
  linearScale,
  logScale,
  numericValue,
  pieArcs,
  radarPoints,
  stackChartValues,
  stackedAreaPath,
  type ChartAccessibility,
  type ChartAccessor,
  type ChartSeries,
  type ChartSeriesType,
} from '@simurgh-ui/core/charts';
import { defineComponent, h, nextTick, onBeforeUnmount, ref, watch, type PropType } from 'vue';
import type { CanvasMark } from '@simurgh-ui/core/chart-canvas';
import type { ChartStream } from '@simurgh-ui/core/chart-stream';

type Datum = Record<PropertyKey, unknown>;
const accessor = [String, Function] as PropType<ChartAccessor<Datum>>;
const numericAccessor = [String, Function] as PropType<ChartAccessor<Datum, number>>;
const colors = Array.from({ length: 10 }, (_, index) => `hsl(var(--simurgh-chart-${index + 1}))`);
const commonProps = {
  data: { type: Array as PropType<readonly Datum[]>, default: () => [] },
  stream: Object as PropType<ChartStream<string>>,
  x: accessor,
  y: numericAccessor,
  series: Array as PropType<readonly ChartSeries<Datum>[]>,
  accessibility: { type: Object as PropType<ChartAccessibility>, required: true as const },
  width: { type: Number, default: 640 },
  height: { type: Number, default: 360 },
  xScale: { type: String as PropType<'linear' | 'time' | 'band' | 'log'>, default: 'linear' },
  yScale: { type: String as PropType<'linear' | 'time' | 'log'>, default: 'linear' },
  renderMode: { type: String as PropType<'auto' | 'svg' | 'canvas'>, default: 'auto' },
  canvasThreshold: { type: Number, default: 2000 },
  hiddenSeries: Array as PropType<readonly string[]>,
  defaultHiddenSeries: { type: Array as PropType<readonly string[]>, default: () => [] },
  innerRadius: Number,
  emptyContent: { type: String, default: 'No chart data' },
};

function useRows(props: { data: readonly Datum[]; stream: ChartStream<string> | undefined; width: number }) {
  const version = ref(0);
  let unsubscribe: (() => void) | undefined;
  watch(() => props.stream, (stream) => {
    unsubscribe?.();
    unsubscribe = stream?.subscribe(() => version.value++);
  }, { immediate: true });
  onBeforeUnmount(() => unsubscribe?.());
  return () => {
    void version.value;
    if (!props.stream) return props.data;
    if (props.data.length) throw new TypeError('Chart accepts either data or stream, not both.');
    const snapshot = props.stream.snapshot();
    const limit = Math.max(2, Math.floor(props.width * 2));
    const step = Math.max(1, Math.ceil(snapshot.length / limit));
    const indexes = Array.from({ length: Math.ceil(snapshot.length / step) }, (_, index) => index * step);
    if (snapshot.length && indexes.at(-1) !== snapshot.length - 1) indexes.push(snapshot.length - 1);
    return indexes.map((index) => Object.fromEntries(props.stream!.dimensions.map((key) => [key, snapshot.columns[key]![index]])) as Datum);
  };
}

function cartesian(kind: ChartSeriesType | 'combo') {
  return defineComponent({
    name: `Simurgh${kind[0]!.toUpperCase()}${kind.slice(1)}Chart`,
    inheritAttrs: false,
    props: commonProps,
    emits: ['update:hiddenSeries'],
    setup(props, { attrs, emit }) {
      const focused = ref(0);
      const tablePage = ref(0);
      const uncontrolledHiddenSeries = ref<readonly string[]>([...props.defaultHiddenSeries]);
      const canvas = ref<HTMLCanvasElement>();
      let drawn = '';
      const rowsForChart = useRows(props);
      return () => {
        const rows = rowsForChart();
        const layout = chartLayout(props.width, props.height);
        const xAccessor = props.x ?? ((_: Datum, index: number) => index);
        const definitions: readonly ChartSeries<Datum>[] = props.series?.length
          ? props.series
          : props.y ? [{ id: 'value', y: props.y, x: xAccessor, type: kind === 'combo' ? 'line' : kind }] : [];
        const hiddenSeries = props.hiddenSeries ?? uncontrolledHiddenSeries.value;
        const active = definitions.filter((item) => !hiddenSeries.includes(item.id));
        const unstacked = active.flatMap((definition) => rows.map((datum, index) => {
          const xValue = chartValue(datum, definition.x ?? xAccessor, index);
          const yValue = numericValue(chartValue(datum, definition.y, index));
          const numericX = numericValue(xValue);
          return xValue == null || yValue == null || (props.xScale !== 'band' && numericX == null) || (props.yScale === 'log' && yValue <= 0)
            ? null : { index, xValue, numericX: numericX ?? index, yValue, definition, radius: numericValue(definition.radius ? chartValue(datum, definition.radius, index) : 4) ?? 4 };
        }).filter((item): item is NonNullable<typeof item> => item != null));
        const raw = stackChartValues(unstacked.map((item) => ({ ...item, stack: item.definition.stack, x: item.xValue, value: item.yValue })));
        if (!raw.length) return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-state': 'empty' }, [
          h('div', { 'data-part': 'empty' }, props.emptyContent),
          h('div', { 'data-part': 'legend' }, definitions.map((item, index) => h('button', { type: 'button', 'aria-pressed': !hiddenSeries.includes(item.id), onClick: () => { const next = hiddenSeries.includes(item.id) ? hiddenSeries.filter((id) => id !== item.id) : [...hiddenSeries, item.id]; if (props.hiddenSeries === undefined) uncontrolledHiddenSeries.value = next; emit('update:hiddenSeries', next); } }, [h('span', { style: { background: item.color ?? colors[index % colors.length] } }), item.label ?? item.id]))),
        ]);
        const xDomain = chartDomain(raw.map((item) => item.numericX)) ?? [0, 1];
        const yDomain = chartDomain(raw.flatMap((item) => [item.start, item.end]), { includeZero: active.some((item) => item.type === 'bar' || kind === 'bar') }) ?? [0, 1];
        const bands = props.xScale === 'band' ? bandScale(raw.map((item) => item.xValue), [layout.left, layout.left + layout.plotWidth]) : null;
        const numericXMap = (props.xScale === 'log' ? logScale : linearScale)(xDomain, [layout.left, layout.left + layout.plotWidth]);
        const yMap = (props.yScale === 'log' ? logScale : linearScale)(yDomain, [layout.top + layout.plotHeight, layout.top]);
        const prepared = active.map((definition) => ({ ...definition, type: definition.type ?? (kind === 'combo' ? 'line' : kind), points: raw.filter((item) => item.definition === definition).map((item) => ({ ...item, x: bands ? bands.map(item.xValue) + bands.bandwidth / 2 : numericXMap(item.numericX), y: yMap(item.end), y0: yMap(item.start) })) }));
        const flat = prepared.flatMap((item) => item.points.map((point) => ({ ...point, series: item })));
        const useCanvas = props.renderMode === 'canvas' || (props.renderMode === 'auto' && flat.length > props.canvasThreshold);
        const decorative = 'decorative' in props.accessibility && props.accessibility.decorative;
        const table = !decorative && props.accessibility.table;
        const pageSize = typeof table === 'object' ? table.pageSize ?? 50 : 50;
        const tablePages = Math.max(1, Math.ceil(rows.length / pageSize));
        const current = flat[Math.min(focused.value, flat.length - 1)]!;
        const baseline = yMap(0);
        const seriesNodes = prepared.map((item, seriesIndex) => {
          const color = item.color ?? colors[seriesIndex % colors.length];
          const points = item.points.map((point) => [point.x, point.y] as const);
          if (item.type === 'line') return h('path', { 'data-part': 'series', 'data-series': item.id, d: linePath(points), fill: 'none', stroke: color });
          if (item.type === 'area') return h('path', { 'data-part': 'series', 'data-series': item.id, d: item.stack ? stackedAreaPath(item.points.map((point) => ({ x: point.x, y0: point.y0, y1: point.y }))) : areaPath(points, baseline), fill: color, stroke: color });
          if (item.type === 'bar') return h('g', { 'data-part': 'series', 'data-series': item.id }, item.points.map((point) => { const origin = item.stack ? point.y0 : baseline; return h('rect', { x: point.x - (bands?.bandwidth ?? 8) / 2, y: Math.min(point.y, origin), width: bands?.bandwidth ?? 8, height: Math.abs(point.y - origin), fill: color }); }));
          return h('g', { 'data-part': 'series', 'data-series': item.id }, item.points.map((point) => h('circle', { cx: point.x, cy: point.y, r: item.type === 'bubble' ? point.radius : 3, fill: color })));
        });
        if (useCanvas) {
          const signature = `${rows.length}:${prepared.length}:${props.width}:${props.height}`;
          if (signature !== drawn) {
            drawn = signature;
            void nextTick(async () => {
              if (!canvas.value) return;
              const { drawChartCanvas } = await import('@simurgh-ui/core/chart-canvas');
              const context = canvas.value.getContext('2d');
              if (!context) return;
              const marks: CanvasMark[] = prepared.flatMap<CanvasMark>((item, seriesIndex) => {
                const color = item.color ?? colors[seriesIndex % colors.length]!;
                if (item.type === 'line') return [{ type: 'line', points: item.points.map((point) => [point.x, point.y]), color }];
                if (item.type === 'area') return [{ type: 'area', points: item.points.map((point) => [point.x, point.y]), baseline: item.points[0]?.y0 ?? baseline, color, opacity: 0.3 }];
                if (item.type === 'bar') return item.points.map((point) => { const origin = item.stack ? point.y0 : baseline; return { type: 'rect' as const, x: point.x - (bands?.bandwidth ?? 8) / 2, y: Math.min(point.y, origin), width: bands?.bandwidth ?? 8, height: Math.abs(point.y - origin), color }; });
                return item.points.map((point) => ({ type: 'point' as const, x: point.x, y: point.y, radius: item.type === 'bubble' ? point.radius : 3, color }));
              });
              drawChartCanvas(context, marks, props.width, props.height, globalThis.devicePixelRatio || 1);
            });
          }
        }
        return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-renderer': useCanvas ? 'canvas-fallback' : 'svg', 'aria-hidden': decorative || undefined }, [
          !decorative && h('figcaption', props.accessibility.title),
          !decorative && h('p', { 'data-part': 'description' }, `${props.accessibility.description} ${chartSummary(flat.map((item) => item.yValue))}`),
          h('div', { 'data-part': 'viewport', style: { aspectRatio: `${props.width} / ${props.height}` } }, [
            useCanvas && h('canvas', { ref: canvas, width: props.width, height: props.height, 'aria-hidden': 'true' }),
            h('svg', { viewBox: `0 0 ${props.width} ${props.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, [...(useCanvas ? [] : seriesNodes), h('g', { 'data-part': 'crosshair' }, [h('line', { x1: current.x, x2: current.x, y1: layout.top, y2: layout.top + layout.plotHeight }), h('circle', { cx: current.x, cy: current.y, r: 4 })])]),
            h('button', { type: 'button', 'data-part': 'keyboard-target', 'aria-label': 'Explore chart data', onKeydown: (event: KeyboardEvent) => { if (event.key === 'Home') focused.value = 0; else if (event.key === 'End') focused.value = flat.length - 1; else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) focused.value = Math.max(0, focused.value - 1); else if (['ArrowRight', 'ArrowDown'].includes(event.key)) focused.value = Math.min(flat.length - 1, focused.value + 1); else return; event.preventDefault(); } }),
            h('div', { role: 'tooltip', 'data-part': 'tooltip' }, `${current.series.label ?? current.series.id}: ${current.yValue}`),
          ]),
          h('div', { 'data-part': 'legend' }, definitions.map((item, index) => h('button', { type: 'button', 'aria-pressed': !hiddenSeries.includes(item.id), onClick: () => { const next = hiddenSeries.includes(item.id) ? hiddenSeries.filter((id) => id !== item.id) : [...hiddenSeries, item.id]; if (props.hiddenSeries === undefined) uncontrolledHiddenSeries.value = next; emit('update:hiddenSeries', next); } }, [h('span', { style: { background: item.color ?? colors[index % colors.length] } }), item.label ?? item.id]))),
          table && h('div', { 'data-part': 'data-table' }, [
            h('table', [h('thead', h('tr', [h('th', { scope: 'col' }, 'Category'), ...definitions.map((item) => h('th', { scope: 'col' }, item.label ?? item.id))])), h('tbody', rows.slice(tablePage.value * pageSize, tablePage.value * pageSize + pageSize).map((datum, row) => h('tr', [h('td', String(chartValue(datum, xAccessor, tablePage.value * pageSize + row) ?? '')), ...definitions.map((item) => h('td', String(chartValue(datum, item.y, tablePage.value * pageSize + row) ?? '')))])))]),
            tablePages > 1 && h('nav', { 'aria-label': 'Chart data pages' }, [h('button', { type: 'button', disabled: tablePage.value === 0, onClick: () => tablePage.value-- }, 'Previous'), h('span', `${tablePage.value + 1} / ${tablePages}`), h('button', { type: 'button', disabled: tablePage.value + 1 >= tablePages, onClick: () => tablePage.value++ }, 'Next')]),
          ]),
        ]);
      };
    },
  });
}

function polar(donut: boolean) {
  return defineComponent({
    name: donut ? 'SimurghDonutChart' : 'SimurghPieChart', inheritAttrs: false, props: commonProps,
    setup(props, { attrs }) { const rowsForChart = useRows(props); return () => {
      const rows = rowsForChart();
      const value = props.y ?? props.series?.[0]?.y;
      const radius = Math.min(props.width, props.height) / 2 - 16;
      const arcs = value ? pieArcs(rows, value, radius, donut ? props.innerRadius ?? radius * 0.55 : props.innerRadius ?? 0) : [];
      const decorative = 'decorative' in props.accessibility && props.accessibility.decorative;
      return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-state': arcs.length ? undefined : 'empty', 'aria-hidden': decorative || undefined }, arcs.length ? [!decorative && h('figcaption', props.accessibility.title), h('svg', { viewBox: `${-props.width / 2} ${-props.height / 2} ${props.width} ${props.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, arcs.map((arc, index) => h('path', { 'data-part': 'series', d: arc.path, fill: colors[index % colors.length] }))), !decorative && h('p', { 'data-part': 'description' }, `${props.accessibility.description} ${chartSummary(arcs.map((arc) => arc.value), 'Slices')}`)] : props.emptyContent);
    }; },
  });
}

export const LineChart = cartesian('line');
export const AreaChart = cartesian('area');
export const BarChart = cartesian('bar');
export const ScatterChart = cartesian('scatter');
export const BubbleChart = cartesian('bubble');
export const HeatmapChart = cartesian('heatmap');
export const ComboChart = cartesian('combo');
export const PieChart = polar(false);
export const DonutChart = polar(true);
export const RadarChart = defineComponent({ name: 'SimurghRadarChart', inheritAttrs: false, props: commonProps, setup(props, { attrs }) { const rowsForChart = useRows(props); return () => { const rows = rowsForChart(); const value = props.y ?? props.series?.[0]?.y; const values = value ? rows.map((datum, index) => numericValue(chartValue(datum, value, index))).filter((item): item is number => item != null) : []; const decorative = 'decorative' in props.accessibility && props.accessibility.decorative; return h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart', 'data-state': values.length ? undefined : 'empty', 'aria-hidden': decorative || undefined }, values.length ? [h('svg', { viewBox: `${-props.width / 2} ${-props.height / 2} ${props.width} ${props.height}`, 'data-part': 'plot', 'aria-hidden': 'true' }, h('polygon', { 'data-part': 'series', points: radarPoints(values, Math.min(props.width, props.height) / 2 - 24), fill: colors[0], stroke: colors[0] })), !decorative && h('figcaption', props.accessibility.title), !decorative && h('p', { 'data-part': 'description' }, `${props.accessibility.description} ${chartSummary(values)}`)] : props.emptyContent); }; } });

export const ChartRoot = defineComponent({ name: 'SimurghChartRoot', inheritAttrs: false, setup(_, { attrs, slots }) { return () => h('figure', { ...attrs, class: ['simurgh-chart', attrs.class], 'data-slot': 'chart' }, slots.default?.()); } });
export const ChartPlot = defineComponent({ name: 'SimurghChartPlot', setup(_, { attrs, slots }) { return () => h('svg', { ...attrs, 'data-part': 'plot' }, slots.default?.()); } });
export const ChartGrid = part('g', 'grid');
export const ChartXAxis = part('g', 'x-axis');
export const ChartYAxis = part('g', 'y-axis');
export const ChartLegend = part('div', 'legend');
export const ChartTooltip = part('div', 'tooltip', { role: 'tooltip' });
export const ChartCrosshair = part('g', 'crosshair');
export const ChartBrush = part('rect', 'brush');
function part(tag: string, name: string, defaults: Record<string, unknown> = {}) { return defineComponent({ name: `SimurghChart${name}`, setup(_, { attrs, slots }) { return () => h(tag, { ...defaults, ...attrs, 'data-part': name }, slots.default?.()); } }); }

import { checkControl } from '../internal/check-control.js';

export const Checkbox = /* @__PURE__ */ checkControl(
  'checkbox',
  'SimurghCheckbox',
);

import { createId } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type Ref,
} from 'vue';

const collapsibleKey: InjectionKey<{
  open: Ref<boolean>;
  toggle(): void;
  id: string;
}> = Symbol('collapsible');

export const Collapsible = /* @__PURE__ */ defineComponent({
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

export const CollapsibleTrigger = /* @__PURE__ */ defineComponent({
  props: { disabled: Boolean },
  setup(props, { attrs, slots }) {
    const context = inject(collapsibleKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          disabled: props.disabled,
          'aria-expanded': context.open.value,
          'aria-controls': `${context.id}-content`,
          onClick: props.disabled ? undefined : context.toggle,
        },
        slots.default?.(),
      );
  },
});

export const CollapsibleContent = /* @__PURE__ */ defineComponent({
  setup(_, { attrs, slots }) {
    const context = inject(collapsibleKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          id: `${context.id}-content`,
          hidden: !context.open.value,
          'data-state': context.open.value ? 'open' : 'closed',
        },
        slots.default?.(),
      );
  },
});

import {
  computed,
  defineComponent,
  h,
  ref,
  useId,
  watch,
  type PropType,
} from 'vue';

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const Combobox = /* @__PURE__ */ defineComponent({
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
    const listId = `combobox-list-${useId().replace(/:/g, '')}`;
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

import { defineComponent, h, type PropType } from 'vue';
import { Combobox, type ComboboxOption } from './combobox.js';

export const Command = /* @__PURE__ */ defineComponent({
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

import { type Direction } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref, type PropType } from 'vue';
import { Calendar } from './calendar.js';
import { Popover, PopoverContent, PopoverTrigger } from './popover.js';

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

import { defineComponent, h } from 'vue';

function part(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      return () => h(tag, { ...attrs, 'data-slot': slot }, slots.default?.());
    },
  });
}

export const DescriptionList = /* @__PURE__ */ part(
  'SimurghDescriptionList',
  'dl',
  'description-list',
);
export const DescriptionListGroup = /* @__PURE__ */ part(
  'SimurghDescriptionListGroup',
  'div',
  'description-list-group',
);
export const DescriptionListTerm = /* @__PURE__ */ part(
  'SimurghDescriptionListTerm',
  'dt',
  'description-list-term',
);
export const DescriptionListDetails = /* @__PURE__ */ part(
  'SimurghDescriptionListDetails',
  'dd',
  'description-list-details',
);

import { createId, trapFocus } from '@simurgh-ui/core';
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

type DialogContext = {
  open: Ref<boolean>;
  setOpen(value: boolean): void;
  id: string;
};

export const dialogKey: InjectionKey<DialogContext> =
  /* @__PURE__ */ Symbol('dialog');

export const Dialog = /* @__PURE__ */ defineComponent({
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const local = ref(props.defaultOpen);
    const current = computed({
      get: () => props.open ?? local.value,
      set: (value) => {
        local.value = value;
        emit('update:open', value);
      },
    });
    provide(dialogKey, {
      open: current,
      setOpen: (value) => (current.value = value),
      id: createId('simurghdialog'),
    });
    return () => slots.default?.();
  },
});

export const DialogTrigger = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-slot': 'dialog-trigger',
          'aria-haspopup': 'dialog',
          'aria-expanded': context.open.value,
          onClick: () => context.setOpen(true),
        },
        slots.default?.(),
      );
  },
});

export const DialogContent = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    const element = ref<HTMLElement | null>(null);
    let previous: HTMLElement | null = null;
    watch(context.open, async (open) => {
      if (open) {
        previous = document.activeElement as HTMLElement;
        await nextTick();
        element.value?.focus();
      } else if (previous?.isConnected) previous.focus();
    });
    return () =>
      context.open.value
        ? h(Teleport, { to: 'body' }, [
            h('div', {
              'data-slot': 'dialog-overlay',
              class: 'simurgh-overlay',
              onMousedown: (event: MouseEvent) => {
                if (event.target === event.currentTarget)
                  context.setOpen(false);
              },
            }),
            h(
              'div',
              {
                ...attrs,
                ref: element,
                role: 'dialog',
                'data-slot': 'dialog-content',
                'aria-modal': 'true',
                'aria-labelledby': attrs['aria-label']
                  ? undefined
                  : `${context.id}-title`,
                'aria-describedby':
                  attrs['aria-describedby'] ?? `${context.id}-description`,
                tabindex: -1,
                class: ['simurgh-content simurgh-dialog', attrs.class],
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === 'Escape') context.setOpen(false);
                  else if (element.value) trapFocus(event, element.value);
                },
              },
              slots.default?.(),
            ),
          ])
        : null;
  },
});

export const DialogTitle = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'h2',
        {
          ...attrs,
          id: attrs.id ?? `${context.id}-title`,
          'data-slot': 'dialog-title',
        },
        slots.default?.(),
      );
  },
});

export const DialogDescription = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'p',
        {
          ...attrs,
          id: attrs.id ?? `${context.id}-description`,
          'data-slot': 'dialog-description',
        },
        slots.default?.(),
      );
  },
});

export const DialogClose = /* @__PURE__ */ defineComponent({
  setup(_, { slots, attrs }) {
    const context = inject(dialogKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-slot': 'dialog-close',
          onClick: () => context.setOpen(false),
        },
        slots.default?.(),
      );
  },
});

import { defineComponent, h, ref, watch } from 'vue';

export const Disclosure = /* @__PURE__ */ defineComponent({
  name: 'SimurghDisclosure',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const local = ref(props.modelValue ?? props.defaultOpen);
    watch(
      () => props.modelValue,
      (value) => {
        if (value !== undefined) local.value = value;
      },
    );
    return () =>
      h(
        'details',
        {
          ...attrs,
          open: local.value,
          'data-slot': 'disclosure',
          'data-state': local.value ? 'open' : 'closed',
          onToggle: (event: Event) => {
            const next = (event.currentTarget as HTMLDetailsElement).open;
            if (props.modelValue === undefined) local.value = next;
            emit('update:modelValue', next);
          },
        },
        slots.default?.(),
      );
  },
});

export const DisclosureSummary = /* @__PURE__ */ defineComponent({
  name: 'SimurghDisclosureSummary',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'summary',
        { ...attrs, 'data-slot': 'disclosure-summary' },
        slots.default?.(),
      );
  },
});

export const DisclosureContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghDisclosureContent',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, 'data-slot': 'disclosure-content' },
        slots.default?.(),
      );
  },
});

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

import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Empty = /* @__PURE__ */ defineComponent({
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
export const EmptyHeader = /* @__PURE__ */ cardPart(
  'SimurghEmptyHeader',
  'div',
  'empty-header',
);
export const EmptyMedia = /* @__PURE__ */ defineComponent({
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
export const EmptyTitle = /* @__PURE__ */ cardPart(
  'SimurghEmptyTitle',
  'h3',
  'empty-title',
);
export const EmptyDescription = /* @__PURE__ */ cardPart(
  'SimurghEmptyDescription',
  'p',
  'empty-description',
);
export const EmptyContent = /* @__PURE__ */ cardPart(
  'SimurghEmptyContent',
  'div',
  'empty-content',
);

import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Field = /* @__PURE__ */ cardPart(
  'SimurghField',
  'fieldset',
  'field',
);
export const FieldLegend = /* @__PURE__ */ cardPart(
  'SimurghFieldLegend',
  'legend',
  'field-legend',
);
export const FieldDescription = /* @__PURE__ */ cardPart(
  'SimurghFieldDescription',
  'p',
  'field-description',
);
export const FieldError = /* @__PURE__ */ defineComponent({
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

import { createId } from '@simurgh-ui/core';
import { defineComponent, h, ref } from 'vue';

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

export const FileUpload = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const Form = /* @__PURE__ */ defineComponent({
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

export const FormErrorSummary = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';
import {
  FloatingContent,
  FloatingTrigger,
  floatingRoot,
} from '../internal/floating-parts.js';

export const HoverCard = /* @__PURE__ */ floatingRoot(
  'SimurghHoverCard',
  'hovercard',
);
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

import { defineComponent, h, type PropType } from 'vue';

export const InputGroup = /* @__PURE__ */ defineComponent({
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

export const InputGroupAddon = /* @__PURE__ */ defineComponent({
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

export const InputGroupText = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const InputOtp = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const Input = /* @__PURE__ */ defineComponent({
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
        'data-slot': 'input',
        'aria-invalid': props.invalid || undefined,
        onInput: (event: Event) =>
          emit('update:modelValue', (event.target as HTMLInputElement).value),
        onChange: (event: Event) => emit('change', event),
      });
  },
});

import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const ItemGroup = /* @__PURE__ */ defineComponent({
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
export const Item = /* @__PURE__ */ defineComponent({
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
export const ItemMedia = /* @__PURE__ */ defineComponent({
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
export const ItemContent = /* @__PURE__ */ cardPart(
  'SimurghItemContent',
  'div',
  'item-content',
);
export const ItemTitle = /* @__PURE__ */ cardPart(
  'SimurghItemTitle',
  'h3',
  'item-title',
);
export const ItemDescription = /* @__PURE__ */ cardPart(
  'SimurghItemDescription',
  'p',
  'item-description',
);
export const ItemActions = /* @__PURE__ */ cardPart(
  'SimurghItemActions',
  'div',
  'item-actions',
);

import { cardPart } from '../internal/card-part.js';

export const Kbd = /* @__PURE__ */ cardPart('SimurghKbd', 'kbd', 'kbd');

import { defineComponent, h } from 'vue';

export const Label = /* @__PURE__ */ defineComponent({
  name: 'SimurghLabel',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('label', attrs, slots.default?.());
  },
});

import { defineComponent, h } from 'vue';

export const Link = /* @__PURE__ */ defineComponent({
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

import { nextIndex, type Direction } from '@simurgh-ui/core';
import { defineComponent, h, onMounted, ref, type PropType } from 'vue';

export const Menubar = /* @__PURE__ */ defineComponent({
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

export const MenubarItem = /* @__PURE__ */ defineComponent({
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

import { computed, defineComponent, h } from 'vue';

export const Meter = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const NativeSelect = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const NavigationMenu = /* @__PURE__ */ defineComponent({
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
export const NavigationMenuList = /* @__PURE__ */ cardPart(
  'SimurghNavigationMenuList',
  'ul',
  'navigation-menu-list',
);
export const NavigationMenuItem = /* @__PURE__ */ cardPart(
  'SimurghNavigationMenuItem',
  'li',
  'navigation-menu-item',
);
export const NavigationMenuLink = /* @__PURE__ */ defineComponent({
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

import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref } from 'vue';

export const NumberInput = /* @__PURE__ */ defineComponent({
  name: 'SimurghNumberInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
    step: { type: Number, default: 1 },
    disabled: Boolean,
    readonly: Boolean,
    incrementLabel: { type: String, default: 'Increase value' },
    decrementLabel: { type: String, default: 'Decrease value' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const localValue = ref(props.defaultValue);
    const id = (attrs.id as string | undefined) ?? createId('number');
    const current = computed(() => props.modelValue ?? localValue.value);
    const safeStep = computed(() =>
      Number.isFinite(props.step) && props.step > 0 ? props.step : 1,
    );
    const commit = (next: number) => {
      const normalized = Math.min(
        props.max ?? Infinity,
        Math.max(props.min ?? -Infinity, next),
      );
      if (props.modelValue === undefined) localValue.value = normalized;
      emit('update:modelValue', normalized);
    };
    return () =>
      h(
        'div',
        {
          'data-slot': 'number-input',
          'data-disabled': props.disabled || undefined,
          'data-readonly': props.readonly || undefined,
        },
        [
          h(
            'button',
            {
              type: 'button',
              'data-slot': 'number-input-decrement',
              'aria-label': props.decrementLabel,
              'aria-controls': id,
              disabled:
                props.disabled ||
                props.readonly ||
                current.value <= (props.min ?? -Infinity),
              onClick: () => commit(current.value - safeStep.value),
            },
            '−',
          ),
          h('input', {
            ...attrs,
            id,
            type: 'number',
            'data-slot': 'number-input-control',
            value: current.value,
            min: props.min,
            max: props.max,
            step: safeStep.value,
            disabled: props.disabled,
            readonly: props.readonly,
            onInput: (event: Event) => {
              if (typeof attrs.onInput === 'function') attrs.onInput(event);
              const next = (event.currentTarget as HTMLInputElement)
                .valueAsNumber;
              if (!Number.isNaN(next)) commit(next);
            },
          }),
          h(
            'button',
            {
              type: 'button',
              'data-slot': 'number-input-increment',
              'aria-label': props.incrementLabel,
              'aria-controls': id,
              disabled:
                props.disabled ||
                props.readonly ||
                current.value >= (props.max ?? Infinity),
              onClick: () => commit(current.value + safeStep.value),
            },
            '+',
          ),
        ],
      );
  },
});

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog.js';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog.js';
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from './drawer.js';
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './sheet.js';
export {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './context-menu.js';
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu.js';
export { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card.js';
export { Popover, PopoverContent, PopoverTrigger } from './popover.js';
export { Tooltip, TooltipContent, TooltipTrigger } from './tooltip.js';

import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Pagination = /* @__PURE__ */ defineComponent({
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
export const PaginationContent = /* @__PURE__ */ cardPart(
  'SimurghPaginationContent',
  'ul',
  'pagination-content',
);
export const PaginationItem = /* @__PURE__ */ cardPart(
  'SimurghPaginationItem',
  'li',
  'pagination-item',
);
export const PaginationLink = /* @__PURE__ */ defineComponent({
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

import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref } from 'vue';

export const PasswordInput = /* @__PURE__ */ defineComponent({
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

import {
  FloatingContent,
  FloatingTrigger,
  floatingRoot,
} from '../internal/floating-parts.js';

export const Popover = /* @__PURE__ */ floatingRoot(
  'SimurghPopover',
  'popover',
);
export const PopoverTrigger = FloatingTrigger;
export const PopoverContent = FloatingContent;

import { computed, defineComponent, h, type PropType } from 'vue';

export const Progress = /* @__PURE__ */ defineComponent({
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

import { nextIndex, type Direction } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

const radioKey: InjectionKey<{
  value: Ref<string>;
  setValue(value: string): void;
  disabled: boolean;
  direction: Direction;
}> = /* @__PURE__ */ Symbol('radio');

export const RadioGroup = /* @__PURE__ */ defineComponent({
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
          'aria-label': attrs['aria-label'] ?? 'Rating',
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

export const RadioGroupItem = /* @__PURE__ */ defineComponent({
  name: 'SimurghRadioGroupItem',
  props: { value: { type: String, required: true }, disabled: Boolean },
  setup(props, { slots, attrs }) {
    const context = inject(radioKey)!;
    return () => {
      const selected = context.value.value === props.value;
      const unavailable = context.disabled || props.disabled;
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
            if (!unavailable) context.setValue(props.value);
          },
        },
        slots.default?.(),
      );
    };
  },
});

import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, ref, type PropType } from 'vue';

export const Rating = /* @__PURE__ */ defineComponent({
  name: 'SimurghRating',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    name: { type: String, default: undefined },
    disabled: Boolean,
    required: Boolean,
    getLabel: {
      type: Function as PropType<(value: number, max: number) => string>,
      default: (value: number, max: number) => `${value} of ${max}`,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const localValue = ref(props.defaultValue);
    const generatedName = createId('rating');
    const count = computed(() =>
      Number.isFinite(props.max)
        ? Math.min(100, Math.max(1, Math.floor(props.max)))
        : 5,
    );
    const current = computed(() =>
      Math.min(
        count.value,
        Math.max(0, Math.round(props.modelValue ?? localValue.value)),
      ),
    );
    const commit = (value: number) => {
      if (props.modelValue === undefined) localValue.value = value;
      emit('update:modelValue', value);
    };
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'radiogroup',
          'data-slot': 'rating',
          'data-disabled': props.disabled || undefined,
        },
        Array.from({ length: count.value }, (_, index) => {
          const item = index + 1;
          return h('label', { 'data-slot': 'rating-item' }, [
            h('input', {
              type: 'radio',
              'data-slot': 'rating-control',
              name: props.name ?? generatedName,
              value: item,
              checked: current.value === item,
              disabled: props.disabled,
              required: props.required,
              'aria-label': props.getLabel(item, count.value),
              onChange: () => commit(item),
            }),
            h(
              'span',
              {
                'data-slot': 'rating-icon',
                'data-selected': item <= current.value || undefined,
                'aria-hidden': 'true',
              },
              '\u2605',
            ),
          ]);
        }),
      );
  },
});

import { type Direction, type Orientation } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

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

const resizableKey: InjectionKey<ResizableContext> =
  /* @__PURE__ */ Symbol('resizable');

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

import { defineComponent, h, type PropType } from 'vue';

export const ScrollArea = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h, nextTick, ref, useId, type PropType } from 'vue';
import { compositeKeydown } from '../internal/composite-keydown.js';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const Select = /* @__PURE__ */ defineComponent({
  name: 'SimurghSelect',
  props: {
    modelValue: { type: String, default: '' },
    options: {
      type: Array as PropType<SelectOption[]>,
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
    const listId = `select-list-${useId().replace(/:/g, '')}`;
    const show = async () => {
      open.value = true;
      await nextTick();
      document
        .getElementById(listId)
        ?.querySelector<HTMLElement>('[role=option]:not([aria-disabled=true])')
        ?.focus();
    };
    return () =>
      h('div', { 'data-slot': 'select' }, [
        h(
          'button',
          {
            type: 'button',
            role: 'combobox',
            'data-slot': 'select-trigger',
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
          props.options.find((option) => option.value === props.modelValue)
            ?.label ?? props.placeholder,
        ),
        open.value
          ? h(
              'div',
              {
                id: listId,
                role: 'listbox',
                'data-slot': 'select-content',
                class: 'simurgh-content',
                onKeydown: (event: KeyboardEvent) =>
                  compositeKeydown(event, '[role=option]'),
              },
              props.options.map((option) =>
                h(
                  'div',
                  {
                    role: 'option',
                    'data-slot': 'select-option',
                    tabindex: -1,
                    'aria-selected': option.value === props.modelValue,
                    'aria-disabled': option.disabled,
                    class: 'simurgh-item',
                    onClick: () => {
                      if (!option.disabled) {
                        emit('update:modelValue', option.value);
                        open.value = false;
                      }
                    },
                  },
                  option.label,
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

import type { Orientation } from '@simurgh-ui/core';
import { defineComponent, h, type PropType } from 'vue';

export const Separator = /* @__PURE__ */ defineComponent({
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

import { createId } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';
import { cardPart } from '../internal/card-part.js';

type SidebarContext = {
  open: Ref<boolean>;
  setOpen(open: boolean): void;
  contentId: string;
};

const sidebarKey: InjectionKey<SidebarContext> =
  /* @__PURE__ */ Symbol('sidebar');

function useSidebarContext() {
  const context = inject(sidebarKey);
  if (!context) throw new Error('Sidebar components require SidebarProvider');
  return context;
}

export const SidebarProvider = /* @__PURE__ */ defineComponent({
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

export const Sidebar = /* @__PURE__ */ defineComponent({
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

export const SidebarTrigger = /* @__PURE__ */ defineComponent({
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

export const SidebarHeader = /* @__PURE__ */ cardPart(
  'SimurghSidebarHeader',
  'div',
  'sidebar-header',
);
export const SidebarContent = /* @__PURE__ */ cardPart(
  'SimurghSidebarContent',
  'div',
  'sidebar-content',
);
export const SidebarFooter = /* @__PURE__ */ cardPart(
  'SimurghSidebarFooter',
  'div',
  'sidebar-footer',
);
export const SidebarGroup = /* @__PURE__ */ cardPart(
  'SimurghSidebarGroup',
  'div',
  'sidebar-group',
);
export const SidebarMenu = /* @__PURE__ */ cardPart(
  'SimurghSidebarMenu',
  'ul',
  'sidebar-menu',
);

import { defineComponent, h } from 'vue';

export const Skeleton = /* @__PURE__ */ defineComponent({
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

import { computed, defineComponent, h, ref } from 'vue';

export const Slider = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const Spinner = /* @__PURE__ */ defineComponent({
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

import { checkControl } from '../internal/check-control.js';

export const Switch = /* @__PURE__ */ checkControl('switch', 'SimurghSwitch');

import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Table = /* @__PURE__ */ cardPart('SimurghTable', 'table', 'table');
export const TableHeader = /* @__PURE__ */ cardPart(
  'SimurghTableHeader',
  'thead',
  'table-header',
);
export const TableBody = /* @__PURE__ */ cardPart(
  'SimurghTableBody',
  'tbody',
  'table-body',
);
export const TableFooter = /* @__PURE__ */ cardPart(
  'SimurghTableFooter',
  'tfoot',
  'table-footer',
);
export const TableRow = /* @__PURE__ */ cardPart(
  'SimurghTableRow',
  'tr',
  'table-row',
);
export const TableHead = /* @__PURE__ */ defineComponent({
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
export const TableCell = /* @__PURE__ */ cardPart(
  'SimurghTableCell',
  'td',
  'table-cell',
);
export const TableCaption = /* @__PURE__ */ cardPart(
  'SimurghTableCaption',
  'caption',
  'table-caption',
);

import {
  createId,
  nextIndex,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

type TabsContext = {
  value: Ref<string>;
  setValue(value: string): void;
  id: string;
  orientation: Orientation;
  direction: Direction;
};
const tabsKey: InjectionKey<TabsContext> = Symbol('tabs');

export const Tabs = /* @__PURE__ */ defineComponent({
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
      set: (next) => {
        local.value = next;
        emit('update:modelValue', next);
      },
    });
    provide(tabsKey, {
      value,
      setValue: (next) => (value.value = next),
      id: createId('tabs'),
      orientation: props.orientation,
      direction: props.direction,
    });
    return () => slots.default?.();
  },
});

export const TabsList = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabsList',
  setup(_, { slots, attrs }) {
    const context = inject(tabsKey)!;
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'tablist',
          'aria-orientation': context.orientation,
          onKeydown: (event: KeyboardEvent) => {
            const nodes = Array.from(
              (
                event.currentTarget as HTMLElement
              ).querySelectorAll<HTMLElement>('[role=tab]'),
            );
            const index = nodes.indexOf(document.activeElement as HTMLElement);
            const next = nextIndex(index, nodes.length, event.key, context);
            if (next !== index) {
              event.preventDefault();
              nodes[next]?.focus();
              nodes[next]?.click();
            }
          },
        },
        slots.default?.(),
      );
  },
});

export const TabsTrigger = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabsTrigger',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    const context = inject(tabsKey)!;
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'tab',
          'aria-selected': context.value.value === props.value,
          tabindex: context.value.value === props.value ? 0 : -1,
          onClick: () => context.setValue(props.value),
        },
        slots.default?.(),
      );
  },
});

export const TabsContent = /* @__PURE__ */ defineComponent({
  name: 'SimurghTabsContent',
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    const context = inject(tabsKey)!;
    return () =>
      context.value.value === props.value
        ? h(
            'div',
            { ...attrs, role: 'tabpanel', tabindex: 0 },
            slots.default?.(),
          )
        : null;
  },
});

import { computed, defineComponent, h, ref, type PropType } from 'vue';

export const TagsInput = /* @__PURE__ */ defineComponent({
  name: 'SimurghTagsInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: () => [] },
    name: { type: String, default: undefined },
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    maxTags: { type: Number, default: 20 },
    placeholder: { type: String, default: 'Add a tag' },
    inputLabel: { type: String, default: 'Add a tag' },
    getRemoveLabel: {
      type: Function as PropType<(tag: string) => string>,
      default: (tag: string) => `Remove ${tag}`,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const localValue = ref([...props.defaultValue]);
    const draft = ref('');
    const input = ref<HTMLInputElement | null>(null);
    const tags = computed(() =>
      (props.modelValue ?? localValue.value).slice(0, 100),
    );
    const limit = computed(() =>
      Number.isFinite(props.maxTags)
        ? Math.min(100, Math.max(1, Math.floor(props.maxTags)))
        : 20,
    );
    const commit = (next: string[]) => {
      if (props.modelValue === undefined) localValue.value = next;
      emit('update:modelValue', next);
    };
    const add = () => {
      const tag = draft.value.trim();
      if (
        props.disabled ||
        props.readonly ||
        !tag ||
        tags.value.includes(tag) ||
        tags.value.length >= limit.value
      )
        return;
      commit([...tags.value, tag]);
      draft.value = '';
    };
    const remove = (index: number) => {
      if (props.disabled || props.readonly) return;
      commit(tags.value.filter((_, itemIndex) => itemIndex !== index));
      input.value?.focus();
    };
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'group',
          'aria-label': attrs['aria-label'] ?? 'Tags',
          'data-slot': 'tags-input',
          'data-disabled': props.disabled || undefined,
          'data-readonly': props.readonly || undefined,
          onClick: (event: MouseEvent) => {
            if (typeof attrs.onClick === 'function') attrs.onClick(event);
            input.value?.focus();
          },
        },
        [
          ...tags.value.map((tag, index) =>
            h('span', { 'data-slot': 'tags-input-tag' }, [
              h('span', { 'data-slot': 'tags-input-tag-text' }, tag),
              !props.readonly &&
                h(
                  'button',
                  {
                    type: 'button',
                    'data-slot': 'tags-input-remove',
                    'aria-label': props.getRemoveLabel(tag),
                    disabled: props.disabled,
                    onClick: (event: Event) => {
                      event.stopPropagation();
                      remove(index);
                    },
                  },
                  '\u00d7',
                ),
              props.name &&
                h('input', { type: 'hidden', name: props.name, value: tag }),
            ]),
          ),
          h('input', {
            ref: input,
            type: 'text',
            'data-slot': 'tags-input-control',
            value: draft.value,
            'aria-label': props.inputLabel,
            placeholder: tags.value.length ? undefined : props.placeholder,
            disabled: props.disabled || tags.value.length >= limit.value,
            readonly: props.readonly,
            required: props.required && tags.value.length === 0,
            onInput: (event: Event) =>
              (draft.value = (event.currentTarget as HTMLInputElement).value),
            onKeydown: (event: KeyboardEvent) => {
              if (event.key === 'Enter' || event.key === ',') {
                event.preventDefault();
                add();
              } else if (
                event.key === 'Backspace' &&
                !draft.value &&
                tags.value.length
              ) {
                event.preventDefault();
                remove(tags.value.length - 1);
              }
            },
          }),
        ],
      );
  },
});

import { defineComponent, h } from 'vue';

export const Textarea = /* @__PURE__ */ defineComponent({
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

import { createId } from '@simurgh-ui/core';
import {
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type Ref,
} from 'vue';

export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
};

type ToastContext = {
  messages: Ref<ToastMessage[]>;
  toast(message: Omit<ToastMessage, 'id'>): void;
  dismiss(id: string): void;
};

const toastKey: InjectionKey<ToastContext> = /* @__PURE__ */ Symbol('toast');

export const ToastProvider = /* @__PURE__ */ defineComponent({
  name: 'SimurghToastProvider',
  setup(_, { slots }) {
    const messages = ref<ToastMessage[]>([]);
    const dismiss = (id: string) => {
      messages.value = messages.value.filter((message) => message.id !== id);
    };
    provide(toastKey, {
      messages,
      dismiss,
      toast: (message) => {
        const id = createId('toast');
        messages.value.push({ ...message, id });
        setTimeout(() => dismiss(id), 5000);
      },
    });
    return () => slots.default?.();
  },
});

export function useToast() {
  const context = inject(toastKey);
  if (!context) throw new Error('useToast requires ToastProvider');
  return context;
}

export const ToastViewport = /* @__PURE__ */ defineComponent({
  name: 'SimurghToastViewport',
  setup() {
    const context = useToast();
    return () =>
      h(
        'div',
        { class: 'simurgh-toast-region', 'aria-label': 'Notifications' },
        context.messages.value.map((message) =>
          h('div', { role: 'status', class: 'simurgh-content simurgh-toast' }, [
            h('strong', message.title),
            message.description && h('div', message.description),
            h(
              'button',
              {
                onClick: () => context.dismiss(message.id),
                'aria-label': 'Dismiss notification',
              },
              '×',
            ),
          ]),
        ),
      );
  },
});

import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';

const toggleGroupKey: InjectionKey<{
  values: Ref<string[]>;
  toggle(value: string): void;
}> = Symbol('toggle-group');

export const ToggleGroup = /* @__PURE__ */ defineComponent({
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

export const ToggleGroupItem = /* @__PURE__ */ defineComponent({
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

import { computed, defineComponent, h, ref } from 'vue';

export const Toggle = /* @__PURE__ */ defineComponent({
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

import { nextIndex, type Direction, type Orientation } from '@simurgh-ui/core';
import { defineComponent, h, type PropType } from 'vue';

export const Toolbar = /* @__PURE__ */ defineComponent({
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

export const ToolbarButton = /* @__PURE__ */ defineComponent({
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

import {
  FloatingContent,
  FloatingTrigger,
  floatingRoot,
} from '../internal/floating-parts.js';

export const Tooltip = /* @__PURE__ */ floatingRoot(
  'SimurghTooltip',
  'tooltip',
);
export const TooltipTrigger = FloatingTrigger;
export const TooltipContent = FloatingContent;

import { createId } from '@simurgh-ui/core';
import { computed, defineComponent, h, onMounted, ref } from 'vue';

export const Tree = /* @__PURE__ */ defineComponent({
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

export const TreeItem = /* @__PURE__ */ defineComponent({
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

import { defineComponent, h } from 'vue';

export const VisuallyHidden = /* @__PURE__ */ defineComponent({
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
