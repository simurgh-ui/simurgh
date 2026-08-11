import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const Field = /* @__PURE__ */ cardPart(
  'SimurghField',
  'fieldset',
  'field',
);
export const FieldLegend = /* @__PURE__ */ cardPart(
  'SimurghFieldLegend',
  'legend',
  'field-legend',
);
export const FieldDescription = /* @__PURE__ */ cardPart(
  'SimurghFieldDescription',
  'p',
  'field-description',
);
export const FieldError = /* @__PURE__ */ defineComponent({
  name: 'SimurghFieldError',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'p',
        { ...attrs, 'data-slot': 'field-error', role: 'alert' },
        slots.default?.(),
      );
  },
});
