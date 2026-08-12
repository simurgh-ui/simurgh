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
