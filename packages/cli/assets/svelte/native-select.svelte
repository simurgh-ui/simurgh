<script lang="ts">
  let { invalid = false, children, ...props }: { invalid?: boolean; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<select {...props} aria-invalid={invalid || undefined} data-slot="native-select">{@render children?.()}</select>
