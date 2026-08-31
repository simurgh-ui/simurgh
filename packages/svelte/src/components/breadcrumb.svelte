<script lang="ts">let { label = 'Breadcrumb', children, ...rest }: { label?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<nav {...rest} aria-label={label} data-slot="breadcrumb"><ol>{@render children?.()}</ol></nav>
