<script module lang="ts">
  import type { IconDefinition } from './dist/types.js';
  export type SvelteIconProps = {
    definition: IconDefinition;
    size?: number | string;
    title?: string;
    direction?: 'ltr' | 'rtl';
    mirrorInRtl?: boolean;
    colorMode?: 'duotone' | 'currentColor';
    class?: string;
  };
</script>

<script lang="ts">
  import { explicitMirrorTransform, iconDirectionMode, iconDirectionStyles } from './dist/direction.js';
  let { definition, size = 24, title, direction, mirrorInRtl = true, colorMode = 'duotone', class: className }: SvelteIconProps = $props();
  let directionMode = $derived(iconDirectionMode(direction, mirrorInRtl, definition.direction === 'directional'));
</script>

<svg width={size} height={size} viewBox={definition.viewBox} role={title ? 'img' : undefined}
  aria-hidden={title ? undefined : 'true'} aria-label={title} focusable="false"
  data-simurgh-direction={directionMode} class={className}>
  {#if directionMode === 'auto'}<style>{iconDirectionStyles}</style>{/if}
  <g class="simurgh-icon-directional" transform={explicitMirrorTransform(directionMode)}>
    <g transform={definition.transform}>
      {#each definition.paths as path, index}
        <path d={path.d} fill={colorMode === 'currentColor' ? 'currentColor' : index === 0
          ? `var(--simurgh-icon-primary, ${path.fill})`
          : `var(--simurgh-icon-secondary, ${path.fill})`} opacity={path.opacity} />
      {/each}
    </g>
  </g>
</svg>
