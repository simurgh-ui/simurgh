<script lang="ts">
  let { open = $bindable(false), summary, children, ...rest }: { open?: boolean; summary?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<details {...rest} bind:open data-slot="disclosure" data-state={open ? 'open' : 'closed'}>
  <summary data-slot="disclosure-summary">{@render summary?.()}</summary>
  <div data-slot="disclosure-content">{@render children?.()}</div>
</details>
