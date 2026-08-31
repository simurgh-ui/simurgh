<script lang="ts">
  let { label, min = 0, max = 100, value = 0, children }: { label?: string; min?: number; max?: number; value?: number; children?: import('svelte').Snippet } = $props();
  let safeValue = $derived(Math.min(Number(max), Math.max(Number(min), Number(value))));
</script>
<meter {min} {max} value={safeValue} role="meter" aria-valuenow={safeValue} aria-valuemin={min} aria-valuemax={max} aria-label={label} data-slot="meter">
  {#if children}{@render children()}{:else}{safeValue}{/if}
</meter>
