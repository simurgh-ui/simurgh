<script lang="ts">
  let { invalid = false, ...props }: { invalid?: boolean; [key: string]: unknown } = $props();
</script>
<input {...props} data-slot="input" aria-invalid={invalid || undefined} />
