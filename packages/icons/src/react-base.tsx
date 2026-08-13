import { forwardRef, type SVGAttributes } from 'react';
import { getIcon, type IconName } from './icons.generated.js';
import type { IconDefinition } from './types.js';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string;
  title?: string;
  direction?: 'ltr' | 'rtl';
  mirrorInRtl?: boolean;
}

export interface SimurghIconProps extends Omit<IconProps, 'name'> {
  name: IconName;
}

export function createIconComponent(definition: IconDefinition, displayName: string) {
  const Component = /* @__PURE__ */ forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = 24, title, direction = 'ltr', mirrorInRtl = true, ...props },
    ref,
  ) {
    const mirror = mirrorInRtl && direction === 'rtl' && definition.direction === 'directional';
    return (
      <svg ref={ref} width={size} height={size} viewBox={definition.viewBox} role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true} aria-label={title} focusable="false" {...props}>
        <g transform={mirror ? `translate(144 0) scale(-1 1) ${definition.transform}` : definition.transform}>
          {definition.paths.map((path, index) => <path key={index} d={path.d} fill={path.fill} opacity={path.opacity} />)}
        </g>
      </svg>
    );
  });
  Component.displayName = displayName;
  return Component;
}

export const SimurghIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SimurghIconProps>(
  function SimurghIcon({ name, ...props }, ref) {
    const Component = createIconComponent(getIcon(name), 'SimurghIcon');
    return <Component ref={ref} {...props} />;
  },
);
