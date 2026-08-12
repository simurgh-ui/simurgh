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
