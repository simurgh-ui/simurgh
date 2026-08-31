<script lang="ts">
  let { open = $bindable(false), disabled = false, trigger, children, ...rest }: { open?: boolean; disabled?: boolean; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="collapsible" data-state={open ? 'open' : 'closed'}>
  <button type="button" data-slot="collapsible-trigger" aria-expanded={open} {disabled} onclick={() => open = !open}>{@render trigger?.()}</button>
  <div data-slot="collapsible-content" hidden={!open}>{@render children?.()}</div>
</div>
