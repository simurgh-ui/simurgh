/** @jsxImportSource preact */
import { forwardRef, type SVGAttributes } from 'preact/compat';
import { explicitMirrorTransform, iconDirectionMode, iconDirectionStyles } from './direction.js';
import type { IconDefinition } from './types.js';

export interface PreactIconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string;
  title?: string;
  direction?: 'ltr' | 'rtl';
  mirrorInRtl?: boolean;
  colorMode?: 'duotone' | 'currentColor';
}

export function createIconComponent(definition: IconDefinition, displayName: string) {
  const Component = forwardRef<SVGSVGElement, PreactIconProps>(function Icon(
    { size = 24, title, direction, mirrorInRtl = true, colorMode = 'duotone', ...props }, ref,
  ) {
    const directionMode = iconDirectionMode(direction, mirrorInRtl, definition.direction === 'directional');
    return <svg ref={ref} width={size} height={size} viewBox={definition.viewBox}
      role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}
      aria-label={title} focusable="false" data-simurgh-direction={directionMode} {...props}>
      {directionMode === 'auto' ? <style>{iconDirectionStyles}</style> : null}
      <g className="simurgh-icon-directional" transform={explicitMirrorTransform(directionMode)}>
        <g transform={definition.transform}>{definition.paths.map((path, index) =>
          <path key={index} d={path.d} fill={colorMode === 'currentColor' ? 'currentColor' : index === 0
            ? `var(--simurgh-icon-primary, ${path.fill})`
            : `var(--simurgh-icon-secondary, ${path.fill})`} opacity={path.opacity} />)}</g>
      </g>
    </svg>;
  });
  Component.displayName = displayName;
  return Component;
}
