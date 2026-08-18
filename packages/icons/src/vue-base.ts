import { defineComponent, h, type PropType } from 'vue';
import {
  explicitMirrorTransform,
  iconDirectionMode,
  iconDirectionStyles,
} from './direction.js';
import type { IconDefinition } from './types.js';

export function createIconComponent(
  definition: IconDefinition,
  componentName: string,
) {
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
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
        const directionMode = iconDirectionMode(
          props.direction,
          props.mirrorInRtl,
          definition.direction === 'directional',
        );
        return h(
          'svg',
          {
            ...attrs,
            width: props.size,
            height: props.size,
            viewBox: definition.viewBox,
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
                { transform: definition.transform },
                definition.paths.map((path, index) =>
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
}
