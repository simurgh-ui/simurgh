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
