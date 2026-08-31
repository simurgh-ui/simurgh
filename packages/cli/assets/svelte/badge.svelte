<script lang="ts">let { children }: { children?: import('svelte').Snippet } = $props();</script>
<span data-slot="badge">{@render children?.()}</span>
