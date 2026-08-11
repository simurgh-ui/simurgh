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
