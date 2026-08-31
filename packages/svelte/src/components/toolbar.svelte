<script lang="ts">let { label = 'Toolbar', orientation = 'horizontal', children, ...rest }: { label?: string; orientation?: 'horizontal' | 'vertical'; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} role="toolbar" aria-label={label} aria-orientation={orientation} data-slot="toolbar" data-orientation={orientation}>{@render children?.()}</div>
