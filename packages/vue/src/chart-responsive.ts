import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue';

export type ChartResponsiveSize = { width: number; height: number };

export const ChartResponsiveContainer = defineComponent({
  name: 'SimurghChartResponsiveContainer',
  props: { aspectRatio: { type: Number, default: 16 / 9 }, minWidth: { type: Number, default: 0 }, minHeight: { type: Number, default: 0 } },
  setup(props, { slots }) {
    const element = ref<HTMLElement>();
    const size = ref<ChartResponsiveSize>({ width: props.minWidth, height: props.minHeight });
    let observer: ResizeObserver | undefined;
    const update = (width: number) => { size.value = { width: Math.max(props.minWidth, width), height: Math.max(props.minHeight, width / props.aspectRatio) }; };
    onMounted(() => { if (!element.value || typeof ResizeObserver === 'undefined') return; update(element.value.getBoundingClientRect().width); observer = new ResizeObserver((entries) => update(entries[0]?.contentRect.width ?? 0)); observer.observe(element.value); });
    onBeforeUnmount(() => observer?.disconnect());
    return () => h('div', { ref: element, 'data-part': 'responsive-container', style: { width: '100%', minWidth: `${props.minWidth}px`, minHeight: `${props.minHeight}px`, aspectRatio: String(props.aspectRatio) } }, size.value.width > 0 ? slots.default?.(size.value) : []);
  },
});
