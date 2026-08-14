import { defineComponent, h, type PropType } from 'vue';
import type { IconDefinition } from './types.js';

export function createIconComponent(definition: IconDefinition, componentName: string) {
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
      size: { type: [Number, String], default: 24 },
      title: String,
      direction: { type: String as PropType<'ltr' | 'rtl'>, default: 'ltr' },
      mirrorInRtl: { type: Boolean, default: true },
    },
    setup(props, { attrs }) {
      return () => {
        const mirror = props.mirrorInRtl && props.direction === 'rtl' && definition.direction === 'directional';
        return h('svg', { ...attrs, width: props.size, height: props.size, viewBox: definition.viewBox,
          role: props.title ? 'img' : undefined, 'aria-hidden': props.title ? undefined : 'true',
          'aria-label': props.title, focusable: 'false' }, [
          h('g', { transform: mirror ? `translate(144 0) scale(-1 1) ${definition.transform}` : definition.transform },
            definition.paths.map((path) => h('path', path))),
        ]);
      };
    },
  });
}
