<script lang="ts">
  let { checked = $bindable(false), indeterminate = false, disabled = false, name, value = 'on', children, ...rest }: { checked?: boolean; indeterminate?: boolean; disabled?: boolean; name?: string; value?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<label data-slot="checkbox" data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'} data-disabled={disabled || undefined}>
  <input {...rest} type="checkbox" bind:checked {disabled} {name} {value} aria-checked={indeterminate ? 'mixed' : checked} />
  <span aria-hidden="true" data-part="indicator">{@render children?.()}</span>
</label>
