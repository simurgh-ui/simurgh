import { defineComponent, h, type PropType } from 'vue';
import { getIcon, type IconName } from './icons.generated.js';

export const SimurghIcon = /* @__PURE__ */ defineComponent({
  name: 'SimurghIcon',
  inheritAttrs: false,
  props: {
    name: { type: String as PropType<IconName>, required: true },
    size: { type: [Number, String], default: 24 },
    title: String,
    direction: { type: String as PropType<'ltr' | 'rtl'>, default: 'ltr' },
    mirrorInRtl: { type: Boolean, default: true },
    colorMode: {
      type: String as PropType<'duotone' | 'currentColor'>,
      default: 'duotone',
    },
  },
  setup(props, { attrs }) {
    return () => {
      const icon = getIcon(props.name);
      const mirror =
        props.mirrorInRtl &&
        props.direction === 'rtl' &&
        icon.direction === 'directional';
      return h(
        'svg',
        {
          ...attrs,
          width: props.size,
          height: props.size,
          viewBox: icon.viewBox,
          role: props.title ? 'img' : undefined,
          'aria-hidden': props.title ? undefined : 'true',
          'aria-label': props.title,
          focusable: 'false',
        },
        [
          h(
            'g',
            {
              transform: mirror
                ? `translate(144 0) scale(-1 1) ${icon.transform}`
                : icon.transform,
            },
            icon.paths.map((path, index) =>
              h('path', {
                ...path,
                fill:
                  props.colorMode === 'currentColor'
                    ? 'currentColor'
                    : index === 0
                      ? `var(--simurgh-icon-primary, ${path.fill})`
                      : `var(--simurgh-icon-secondary, ${path.fill})`,
              }),
            ),
          ),
        ],
      );
    };
  },
});
