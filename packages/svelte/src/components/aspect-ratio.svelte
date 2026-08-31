<script lang="ts">
  let { ratio = 1, children, ...props }: { ratio?: number; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
  let safeRatio = $derived(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
</script>
<div {...props} data-ratio={safeRatio} style:aspect-ratio={String(safeRatio)}>{@render children?.()}</div>
