import { defineComponent, h } from 'vue';

function part(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      return () => h(tag, { ...attrs, 'data-slot': slot }, slots.default?.());
    },
  });
}

export const DescriptionList = /* @__PURE__ */ part(
  'SimurghDescriptionList',
  'dl',
  'description-list',
);
export const DescriptionListGroup = /* @__PURE__ */ part(
  'SimurghDescriptionListGroup',
  'div',
  'description-list-group',
);
export const DescriptionListTerm = /* @__PURE__ */ part(
  'SimurghDescriptionListTerm',
  'dt',
  'description-list-term',
);
export const DescriptionListDetails = /* @__PURE__ */ part(
  'SimurghDescriptionListDetails',
  'dd',
  'description-list-details',
);
