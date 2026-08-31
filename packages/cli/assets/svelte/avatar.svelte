<script lang="ts">
  let { src, alt, fallback, ...props }: { src?: string; alt: string; fallback?: import('svelte').Snippet; [key: string]: unknown } = $props();
  let loaded = $state(false);
  $effect(() => { src; loaded = false; });
</script>
<span {...props} data-state={loaded ? 'loaded' : 'fallback'}>
  {#if src}<img {src} {alt} hidden={!loaded} onload={() => loaded = true} onerror={() => loaded = false} />{/if}
  {#if !loaded}<span data-part="fallback">{@render fallback?.()}</span>{/if}
</span>
