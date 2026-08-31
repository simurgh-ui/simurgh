<script lang="ts">
  let { header, title, description, children, footer, ...rest }: { header?: import('svelte').Snippet; title?: import('svelte').Snippet; description?: import('svelte').Snippet; children?: import('svelte').Snippet; footer?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="card">
  {#if header || title || description}<div data-slot="card-header">{@render header?.()}{#if title}<h3 data-slot="card-title">{@render title()}</h3>{/if}{#if description}<p data-slot="card-description">{@render description()}</p>{/if}</div>{/if}
  <div data-slot="card-content">{@render children?.()}</div>
  {#if footer}<div data-slot="card-footer">{@render footer()}</div>{/if}
</div>
