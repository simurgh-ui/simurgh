<script lang="ts">let { children, ...rest }: { children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<kbd {...rest} data-slot="kbd">{@render children?.()}</kbd>
