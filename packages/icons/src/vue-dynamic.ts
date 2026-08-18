import { defineComponent, h, type PropType } from 'vue';
import {
  explicitMirrorTransform,
  iconDirectionMode,
  iconDirectionStyles,
} from './direction.js';
import { getIcon, type IconName } from './icons.generated.js';

export const SimurghIcon = /* @__PURE__ */ defineComponent({
  name: 'SimurghIcon',
  inheritAttrs: false,
  props: {
    name: { type: String as PropType<IconName>, required: true },
    size: { type: [Number, String], default: 24 },
    title: String,
    direction: String as PropType<'ltr' | 'rtl'>,
    mirrorInRtl: { type: Boolean, default: true },
    colorMode: {
      type: String as PropType<'duotone' | 'currentColor'>,
      default: 'duotone',
    },
  },
  setup(props, { attrs }) {
    return () => {
      const icon = getIcon(props.name);
      const directionMode = iconDirectionMode(
        props.direction,
        props.mirrorInRtl,
        icon.direction === 'directional',
      );
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
          'data-simurgh-direction': directionMode,
        },
        [
          directionMode === 'auto'
            ? h('style', null, iconDirectionStyles)
            : null,
          h(
            'g',
            {
              class: 'simurgh-icon-directional',
              transform: explicitMirrorTransform(directionMode),
            },
            h(
              'g',
              { transform: icon.transform },
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
          ),
        ],
      );
    };
  },
});
