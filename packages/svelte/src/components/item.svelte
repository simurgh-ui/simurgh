<script lang="ts">
  let { media, title, description, actions, children, ...rest }: { media?: import('svelte').Snippet; title?: import('svelte').Snippet; description?: import('svelte').Snippet; actions?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="item">{#if media}<div data-slot="item-media">{@render media()}</div>{/if}<div data-slot="item-content">{#if title}<div data-slot="item-title">{@render title()}</div>{/if}{#if description}<p data-slot="item-description">{@render description()}</p>{/if}{@render children?.()}</div>{#if actions}<div data-slot="item-actions">{@render actions()}</div>{/if}</div>
