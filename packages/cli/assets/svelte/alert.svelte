<script lang="ts">
  let { urgent = false, children, ...props }: { urgent?: boolean; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...props} role={urgent ? 'alert' : 'status'} aria-live={urgent ? 'assertive' : 'polite'} aria-atomic="true" data-urgent={urgent || undefined}>{@render children?.()}</div>
