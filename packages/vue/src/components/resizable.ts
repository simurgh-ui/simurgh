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
