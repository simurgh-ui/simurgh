import {
  Transition,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Directive,
  type PropType,
} from 'vue';
import { bindMotion, runMotion, type MotionDefinition } from './index.js';

export const vMotion: Directive<Element, MotionDefinition> = {
  mounted(element, binding) {
    (element as Element & { __simurghMotion?: () => void }).__simurghMotion =
      bindMotion(element, binding.value);
  },
  updated(element, binding) {
    const target = element as Element & { __simurghMotion?: () => void };
    target.__simurghMotion?.();
    target.__simurghMotion = bindMotion(element, binding.value);
  },
  unmounted(element) {
    (element as Element & { __simurghMotion?: () => void }).__simurghMotion?.();
  },
};

export function useMotion(definition: MotionDefinition) {
  const element = ref<Element>();
  let cleanup: (() => void) | undefined;
  onMounted(() => {
    if (element.value) cleanup = bindMotion(element.value, definition);
  });
  onBeforeUnmount(() => cleanup?.());
  watch(
    () => definition,
    () => {
      cleanup?.();
      if (element.value) cleanup = bindMotion(element.value, definition);
    },
  );
  return element;
}

export const Motion = defineComponent({
  name: 'SimurghMotion',
  inheritAttrs: false,
  props: {
    as: { type: String, default: 'div' },
    motion: { type: Object as PropType<MotionDefinition>, required: true },
  },
  setup(props, { attrs, slots }) {
    const element = useMotion(props.motion);
    return () => h(props.as, { ...attrs, ref: element }, slots.default?.());
  },
});

export const Presence = defineComponent({
  name: 'SimurghPresence',
  props: {
    exit: { type: Object as PropType<MotionDefinition>, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Transition,
        {
          css: false,
          onLeave(element: Element, done: () => void) {
            runMotion(element, props.exit, 'exit').finished.then(done);
          },
          onEnter(element: Element, done: () => void) {
            runMotion(element, props.exit, 'animate').finished.then(done);
          },
        },
        slots,
      );
  },
});

export * from './index.js';
