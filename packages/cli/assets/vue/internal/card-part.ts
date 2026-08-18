import { defineComponent, h } from 'vue';

export function cardPart(name: string, tag: string, slot: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      return () => h(tag, { ...attrs, 'data-slot': slot }, slots.default?.());
    },
  });
}
