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
