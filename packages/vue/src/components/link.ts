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
