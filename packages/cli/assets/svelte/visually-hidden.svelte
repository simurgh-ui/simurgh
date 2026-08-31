<script lang="ts">let { children }: { children?: import('svelte').Snippet } = $props();</script>
<span data-slot="visually-hidden">{@render children?.()}</span>
