import { forwardRef, type SVGAttributes } from 'react';
import type { IconDefinition } from './types.js';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string;
  title?: string;
  direction?: 'ltr' | 'rtl';
  mirrorInRtl?: boolean;
  colorMode?: 'duotone' | 'currentColor';
}

export function createIconComponent(
  definition: IconDefinition,
  displayName: string,
) {
  const Component = /* @__PURE__ */ forwardRef<SVGSVGElement, IconProps>(
    function Icon(
      {
        size = 24,
        title,
        direction = 'ltr',
        mirrorInRtl = true,
        colorMode = 'duotone',
        ...props
      },
      ref,
    ) {
      const mirror =
        mirrorInRtl &&
        direction === 'rtl' &&
        definition.direction === 'directional';
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={definition.viewBox}
          role={title ? 'img' : undefined}
          aria-hidden={title ? undefined : true}
          aria-label={title}
          focusable="false"
          {...props}
        >
          <g
            transform={
              mirror
                ? `translate(144 0) scale(-1 1) ${definition.transform}`
                : definition.transform
            }
          >
            {definition.paths.map((path, index) => (
              <path
                key={index}
                d={path.d}
                fill={
                  colorMode === 'currentColor'
                    ? 'currentColor'
                    : index === 0
                      ? `var(--simurgh-icon-primary, ${path.fill})`
                      : `var(--simurgh-icon-secondary, ${path.fill})`
                }
                opacity={path.opacity}
              />
            ))}
          </g>
        </svg>
      );
    },
  );
  Component.displayName = displayName;
  return Component;
}
