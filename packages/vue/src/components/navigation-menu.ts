import { defineComponent, h } from 'vue';
import { cardPart } from '../internal/card-part.js';

export const NavigationMenu = /* @__PURE__ */ defineComponent({
  name: 'SimurghNavigationMenu',
  props: { label: { type: String, default: 'Main navigation' } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'nav',
        {
          ...attrs,
          'aria-label': props.label,
          'data-slot': 'navigation-menu',
        },
        slots.default?.(),
      );
  },
});
export const NavigationMenuList = /* @__PURE__ */ cardPart(
  'SimurghNavigationMenuList',
  'ul',
  'navigation-menu-list',
);
export const NavigationMenuItem = /* @__PURE__ */ cardPart(
  'SimurghNavigationMenuItem',
  'li',
  'navigation-menu-item',
);
export const NavigationMenuLink = /* @__PURE__ */ defineComponent({
  name: 'SimurghNavigationMenuLink',
  props: { current: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          'aria-current': props.current ? 'page' : attrs['aria-current'],
          'data-slot': 'navigation-menu-link',
        },
        slots.default?.(),
      );
  },
});
