<script lang="ts">
  let { children, ...props }: { children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<label {...props}>{@render children?.()}</label>
