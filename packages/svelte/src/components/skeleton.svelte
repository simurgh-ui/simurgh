<script lang="ts">let { children }: { children?: import('svelte').Snippet } = $props();</script>
<div aria-hidden="true" data-slot="skeleton">{@render children?.()}</div>
