<script lang="ts">
  let { media, title, description, children, ...rest }: { media?: import('svelte').Snippet; title?: import('svelte').Snippet; description?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="empty"><div data-slot="empty-header">{#if media}<div data-slot="empty-media">{@render media()}</div>{/if}{#if title}<h3 data-slot="empty-title">{@render title()}</h3>{/if}{#if description}<p data-slot="empty-description">{@render description()}</p>{/if}</div><div data-slot="empty-content">{@render children?.()}</div></div>
