<script lang="ts">
  let { invalid = false, value = '', ...props }: { invalid?: boolean; value?: string; [key: string]: unknown } = $props();
</script>
<textarea {...props} aria-invalid={invalid || undefined}>{value}</textarea>
