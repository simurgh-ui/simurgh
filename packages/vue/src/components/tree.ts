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
